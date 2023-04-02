// import { RequestHandler } from "express";

export interface User {
  id: number;
  firstName?: string | null;
  lastName?: string | null;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

export interface Post {
  id: number;
  title: string;
  url: string;
  userId: number;
  createdAt: Date;
}

export interface Like {
  userId: string;
  postId: string;
}

export interface Comment {
  id: string;
  userId: string;
  postId: string;
  comment: string;
  postedAt: number;
}

export interface JwtObject {
  id: number;
}

export type WithError<T> = Partial<T & { err: string }>;

export type Jwt = {
  jwt: string;
};

export type Login = {
  login: string;
  password: string;
};

export type CreatePost = Pick<Post, "title" | "url" | "userId">;
