// Simple local storage for demo purposes
// All user data is stored in-memory since no database integration was requested

import bcrypt from "bcrypt";

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
}

export interface CreateUser {
  email: string;
  name: string;  
  password: string;
}

const SALT_ROUNDS = 12;

export class LocalStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(userData: CreateUser): Promise<User> {
    const id = Date.now().toString();
    const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);
    const user: User = { 
      ...userData, 
      id, 
      password: hashedPassword 
    };
    this.users.set(id, user);
    return user;
  }

  async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }
}

export const storage = new LocalStorage();
