import { Request, Response, NextFunction } from "express";
import { IPost } from "../interfaces/post";
import postDao from "../dao/postDao";
import { CreatePost } from "../types/types";
import {
  CreatePostRequest,
  ResWithLocalUserId,
  ListPostsResponse,
  ListPostsRequest,
  IDParam,
  GetPostResponse,
} from "../types/api";

class PostController {
  private static db: IPost;

  constructor(db: IPost) {
    PostController.db = db;
  }

  async listPosts(
    _req: Request<ListPostsRequest>,
    res: Response<ListPostsResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const posts = await PostController.db.listPosts();
      res.json({ posts });
    } catch (error) {
      next(error);
    }
  }

  async findPostById(
    req: Request<IDParam>,
    res: Response<GetPostResponse>,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      if (!req.params.id || isNaN(parseInt(req.params.id))) {
        return res.sendStatus(400);
      }
      const post = await PostController.db.getPostById(
        Math.trunc(parseInt(req.params.id))
      );
      if (!post) return res.sendStatus(404);
      res.json({ post });
    } catch (error) {
      next(error);
    }
  }

  async createPost(
    req: CreatePostRequest,
    res: ResWithLocalUserId,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      if (!req.body.title || !req.body.url) {
        return res.sendStatus(400);
      }

      const post = await PostController.db.getPostByUrl(req.body.url);
      if (post) return res.sendStatus(400);

      const newPost: CreatePost = { ...req.body, userId: res.locals.userId };
      await PostController.db.createPost(newPost);
      res.sendStatus(201);
    } catch (error) {
      next(error);
    }
  }

  async deletePost(
    req: Request<IDParam>,
    res: ResWithLocalUserId,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      if (!req.params.id || isNaN(parseInt(req.params.id))) {
        return res.sendStatus(400);
      }
      const post = await PostController.db.getPostById(
        Math.trunc(parseInt(req.params.id))
      );
      if (!post || post.userId !== res.locals.userId) {
        return res.sendStatus(404);
      }
      await PostController.db.deletePost(Math.trunc(parseInt(req.params.id)));
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}

export default new PostController(postDao);
