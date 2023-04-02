import { User } from "../types/types";
import { CreateUser } from "../types/api";

export interface IUser {
  createUser(user: CreateUser): Promise<User>;
  getUserById(id: number): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserByUsername(username: string): Promise<User | null>;
}
