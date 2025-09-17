import express, { Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import path from "path";
import { createServer } from "http";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  let responseBody: any;
  const originalJson = res.json;
  res.json = function (body, ...args) {
    responseBody = body;
    return originalJson.apply(res, [body, ...args]);
  };
  res.on("finish", () => {
    if (req.path.startsWith("/api")) {
      console.log(`${req.method} ${req.path} ${res.statusCode} in ${Date.now() - start}ms :: ${JSON.stringify(responseBody)}`);
    }
  });
  next();
});

// Routes
registerRoutes(app);

// Error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  console.error(err);
  res.status(status).json({ message });
});

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const clientPath = path.resolve(__dirname, "../client/dist");
  app.use(express.static(clientPath));
  app.get("*", (_req, res) => res.sendFile(path.resolve(clientPath, "index.html")));
}

// Start server
const PORT = parseInt(process.env.PORT || "4003", 10);
createServer(app).listen(PORT, "127.0.0.1", () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
});
