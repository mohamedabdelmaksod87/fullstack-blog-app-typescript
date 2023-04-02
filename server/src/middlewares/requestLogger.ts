import { RequestHandler } from "express";

const requestLogger: RequestHandler = (req, _, next) => {
  console.log(req.method, req.path);
  next();
};

export default requestLogger;
