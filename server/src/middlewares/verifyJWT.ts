import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../services/tokenService";
import userDao from "../dao/userDao";

const checkJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }
  const token = authHeader.split(" ")[1];
  try {
    const { id } = verifyJwt(token);
    const user = await userDao.getUserById(id);
    if (!user) throw new Error("User not found");
    res.locals.userId = user.id;
    next();
  } catch (error) {
    let err = error as Error;
    res.status(401).json({ err: err.message });
  }
};

export default checkJwt;
