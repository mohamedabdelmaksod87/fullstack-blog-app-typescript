import { Router } from "express";
import postController from "../controllers/postController";
import checkJwt from "../middlewares/verifyJWT";

const postRouter = Router();

postRouter.get("/", postController.listPosts);

postRouter.get("/:id", postController.findPostById);

postRouter.post("/", checkJwt, postController.createPost);

postRouter.delete("/:id", checkJwt, postController.deletePost);

export default postRouter;
