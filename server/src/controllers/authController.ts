import userDao from "../dao/userDao";
import { NextFunction } from "express";
import { User } from "../types/types";
import { signJwt } from "../services/tokenService";
import { hashPassword } from "../services/passwordService";
import {
  CreateUser,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../types/api";

export async function register(
  req: RegisterRequest,
  res: RegisterResponse,
  next: NextFunction
): Promise<RegisterResponse | void> {
  try {
    if (!req.body.email || !req.body.password || !req.body.username) {
      return res.status(400).json({ err: "All fields are required" });
    }

    let user: User | null;
    //Check if user exists
    user =
      (await userDao.getUserByEmail(req.body.email)) ||
      (await userDao.getUserByUsername(req.body.username));
    if (user) {
      return res.status(409).json({ err: "User already used" });
    }

    const hashedPass = await hashPassword(req.body.password);

    const newUser: CreateUser = { ...req.body, password: hashedPass };
    const { id } = await userDao.createUser(newUser);
    const jwt = signJwt({ id });
    res.status(201).json({ jwt });
  } catch (error) {
    next(error);
  }
}

export async function login(
  req: LoginRequest,
  res: LoginResponse,
  next: NextFunction
): Promise<LoginResponse | void> {
  try {
    if (!req.body.login || !req.body.password) {
      return res.status(400).json({ err: "All fields are required" });
    }

    const user =
      (await userDao.getUserByEmail(req.body.login)) ||
      (await userDao.getUserByUsername(req.body.login));
    const hashedPass = await hashPassword(req.body.password);

    if (!user || user.password !== hashedPass) {
      return res.status(403).json({ err: "Invalid credentials" });
    }

    const jwt = signJwt({ id: user.id });
    res.status(200).json({
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
      },
      jwt,
    });
  } catch (error) {
    next(error);
  }
}
