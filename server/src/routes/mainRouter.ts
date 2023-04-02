import { Router } from "express";
import postRouter from "./postRouter";
import authRouter from "./userRouter";

const mainRouter = Router();

mainRouter.get("/health", (_req, res) => {
  res.json({ status: "OK" });
});

mainRouter.use("/post", postRouter);
mainRouter.use("/auth", authRouter);
mainRouter.use("*", (_, res) => {
  res.status(404).send("Requested Path Not Found");
});

export default mainRouter;
