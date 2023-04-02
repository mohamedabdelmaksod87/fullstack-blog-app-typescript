import { Like } from "../types/types";

export interface ILike {
  createLike(like: Like): Promise<void>;
}
