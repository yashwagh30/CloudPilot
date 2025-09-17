import type { Express } from "express";
import { createServer, type Server } from "http";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { storage } from "./storage";

// JWT secret - use environment variable or secure default for development
const JWT_SECRET = process.env.JWT_SECRET || 'dev-jwt-secret-key-replace-in-production';

// Warn in production if using default
if (!process.env.JWT_SECRET && process.env.NODE_ENV === 'production') {
  throw new Error("JWT_SECRET environment variable is required in production");
}

// TypeScript assertion after validation
const jwtSecret: string = JWT_SECRET;

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
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }
      
      // Create new user (password will be hashed automatically)
      const user = await storage.createUser({ email, password, name });
      
      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email, name: user.name },
        jwtSecret,
        { expiresIn: "7d" }
      );
      
      res.json({ 
        token, 
        user: { id: user.id, email: user.email, name: user.name } 
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
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      // Verify password using bcrypt
      const isPasswordValid = await storage.verifyPassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email, name: user.name },
        jwtSecret,
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
      const decoded = jwt.verify(token, jwtSecret) as any;
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
