import type { Express } from "express";
import { createServer } from "http";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { storage } from "./storage";

const JWT_SECRET = process.env.JWT_SECRET || "dev-jwt-secret-key";

// Validation schemas
const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function registerRoutes(app: Express) {
  // -------------------------
  // Register
  // -------------------------
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { name, email, password } = registerSchema.parse(req.body);

      if (await storage.getUserByEmail(email)) {
        return res.status(400).json({ error: "User already exists" });
      }

      const user = await storage.createUser({ name, email, password });
      const token = jwt.sign(
        { userId: user.id, email: user.email, name: user.name },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (err: any) {
      console.error("Register error:", err);
      return res.status(400).json({ error: err?.message || "Invalid registration data" });
    }
  });

  // -------------------------
  // Login
  // -------------------------
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = loginSchema.parse(req.body);
      const user = await storage.getUserByEmail(email);

      if (!user || !(await storage.verifyPassword(password, user.password))) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email, name: user.name },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (err: any) {
      console.error("Login error:", err);
      return res.status(400).json({ error: err?.message || "Invalid login data" });
    }
  });

  // -------------------------
  // Verify token
  // -------------------------
  app.get("/api/auth/verify", (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
      if (!token) return res.status(401).json({ error: "No token provided" });

      const decoded = jwt.verify(token, JWT_SECRET) as any;
      return res.json({ user: { id: decoded.userId, name: decoded.name, email: decoded.email } });
    } catch (err: any) {
      console.error("Verify token error:", err);
      return res.status(401).json({ error: "Invalid token" });
    }
  });

  return createServer(app);
}
