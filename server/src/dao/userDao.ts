import { IUser } from "../interfaces/user";
import { User } from "../types/types";
import { CreateUser } from "../types/api";
import client from "../db/prisma";
import { PrismaClient } from "@prisma/client";

class UserDao implements IUser {
  private prisma: PrismaClient = client;

  async createUser(user: CreateUser): Promise<User> {
    return await this.prisma.user.create({ data: user });
  }

  async getUserById(id: number): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { username } });
  }
}

export default new UserDao();
