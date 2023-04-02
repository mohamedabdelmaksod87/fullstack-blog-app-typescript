import jwt from "jsonwebtoken";
import { JwtObject } from "../types/types";

export function signJwt(payLoad: JwtObject): string {
  return jwt.sign(payLoad, process.env.JWT_SECRET!, { expiresIn: "30s" });
}

export function verifyJwt(token: string): JwtObject {
  return jwt.verify(token, process.env.JWT_SECRET!) as JwtObject;
}
