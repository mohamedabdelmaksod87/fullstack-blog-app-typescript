import { ErrorRequestHandler } from "express";

const errHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(`Uncaught exception:`, err);
  res.status(500).json({ err: err.message });
};

export default errHandler;
