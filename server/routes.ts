import type { Express } from "express";
import { createServer, type Server } from "http";
import jwt from "jsonwebtoken";
import { z } from "zod";

// Simple in-memory user storage for demo purposes
const users = new Map<string, { id: string; email: string; password: string; name: string }>();

// JWT secret - in production, this should be in environment variables
const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key";

// Validation schemas
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Register endpoint
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { email, password, name } = registerSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = Array.from(users.values()).find(u => u.email === email);
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }
      
      // Create new user
      const userId = Date.now().toString();
      const user = { id: userId, email, password, name };
      users.set(userId, user);
      
      // Generate JWT token
      const token = jwt.sign(
        { userId, email, name },
        JWT_SECRET,
        { expiresIn: "7d" }
      );
      
      res.json({ 
        token, 
        user: { id: userId, email, name } 
      });
    } catch (error) {
      res.status(400).json({ error: "Invalid registration data" });
    }
  });
  
  // Login endpoint
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = loginSchema.parse(req.body);
      
      // Find user
      const user = Array.from(users.values()).find(u => u.email === email);
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email, name: user.name },
        JWT_SECRET,
        { expiresIn: "7d" }
      );
      
      res.json({ 
        token, 
        user: { id: user.id, email: user.email, name: user.name } 
      });
    } catch (error) {
      res.status(400).json({ error: "Invalid login data" });
    }
  });
  
  // Verify token endpoint
  app.get("/api/auth/verify", (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      res.json({ 
        user: { 
          id: decoded.userId, 
          email: decoded.email, 
          name: decoded.name 
        } 
      });
    } catch (error) {
      res.status(401).json({ error: "Invalid token" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
