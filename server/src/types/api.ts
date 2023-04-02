import { Jwt, Login, Post, User, WithError } from "./types";
import { Request, Response } from "express";

//Post API
export type ListPostsRequest = {};
export type ListPostsResponse = { posts: Post[] };

export type PostRequest = Pick<Post, "title" | "url">;
export type CreatePostRequest = Request<{}, {}, PostRequest>;
//used with create & delete post responses
export type LocalUserId = Pick<Post, "userId">;
export type ResWithLocalUserId = Response<{}, LocalUserId>;

export type IDParam = { id: string };
export type GetPostResponse = { post: Post };

//User API
export type CreateUser = Pick<
  User,
  "email" | "firstName" | "lastName" | "password" | "username"
>;
export type RegisterRequest = Request<{}, {}, CreateUser>;
export type RegisterResponse = Response<WithError<Jwt>>;

export type LoginRequest = Request<{}, {}, Login>;
export type LoginResponse = Response<
  WithError<
    {
      user: Pick<User, "email" | "firstName" | "lastName" | "username">;
    } & Jwt
  >
>;
