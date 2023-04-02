import { IPost } from "../interfaces/post";
import { Post } from "../types/types";
import { CreatePost } from "../types/types";
import { PrismaClient } from "@prisma/client";
import client from "../db/prisma";

class PostDao implements IPost {
  private prisma: PrismaClient = client;

  async listPosts(): Promise<Post[]> {
    return await this.prisma.post.findMany();
  }

  async getPostById(id: number): Promise<Post | null> {
    return await this.prisma.post.findUnique({ where: { id } });
  }

  async getPostByUrl(url: string): Promise<Post | null> {
    return await this.prisma.post.findUnique({ where: { url } });
  }

  async createPost(post: CreatePost): Promise<void> {
    await this.prisma.post.create({ data: post });
  }

  async deletePost(id: number): Promise<void> {
    await this.prisma.post.delete({ where: { id } });
  }
}

export default new PostDao();
