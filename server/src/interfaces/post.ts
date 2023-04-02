import { Post } from "../types/types";
import { CreatePost } from "../types/types";

export interface IPost {
  listPosts(): Promise<Post[]>;
  getPostByUrl(url: string): Promise<Post | null>;
  getPostById(id: number): Promise<Post | null>;
  createPost(post: CreatePost): Promise<void>;
  deletePost(id: number): Promise<void>;
}
