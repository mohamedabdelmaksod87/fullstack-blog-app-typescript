import { Comment } from "../types/types";

export interface IComment {
  listComments(postId: string): Promise<Comment[]>;
  createComment(comment: Comment): Promise<void>;
  deleteComment(id: string): Promise<void>;
}
