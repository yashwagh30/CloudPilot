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
  private users: Map<string, User> = new Map();

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(u => u.email === email);
  }

  async createUser(data: CreateUser): Promise<User> {
    const id = Date.now().toString();
    const password = await bcrypt.hash(data.password, SALT_ROUNDS);
    const user: User = { ...data, id, password };
    this.users.set(id, user);
    return user;
  }

  async verifyPassword(plain: string, hashed: string) {
    return bcrypt.compare(plain, hashed);
  }
}

export const storage = new LocalStorage();
