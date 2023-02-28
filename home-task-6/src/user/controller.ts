import { NextFunction, Request, Response } from "express";
import { ValidatedRequest } from "express-joi-validation";
import { UserBodySchema } from "./validator";
import { User } from "./userModel";
import { Op } from "sequelize";
import { throwError } from "../common/utils";
import logger from "../logger";
import jwt from "jsonwebtoken";

export const create = async (
  req: ValidatedRequest<UserBodySchema>,
  res: Response
): Promise<void> => {
  const user = await User.create({
    login: req.body.login,
    password: req.body.password,
    age: req.body.age,
    isDeleted: false,
  });
  res.status(201).json({ message: "user created", user: user });
};

export const update = async (
  req: ValidatedRequest<UserBodySchema>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const user = await User.findByPk(req.params.userId);
  if (!user) {
    logger.error(`
      module user method update error[user doesn't exist] 
      params ${JSON.stringify(req.params)}
      body ${JSON.stringify(req.body)}
    `);
    return throwError("user doesn't exist", next);
  } else {
    user.login = req.body.login;
    user.password = req.body.password;
    user.age = req.body.age;
    await user.save();
    res.status(200).json({ message: "user updated", user: user });
  }
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const user = await User.findByPk(req.params.userId);
  if (!user) {
    logger.error(`
      module user method getById error[user doesn't exist] 
      params ${JSON.stringify(req.params)}
      body ${JSON.stringify(req.body)}
    `);
    return throwError("user doesn't exist", next);
  }
  res.status(200).json({ message: "user fetched", user: user });
};

export const deleteById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const user = await User.findByPk(req.params.userId);
  if (!user) {
    logger.error(`
      module user method deleteById error[user doesn't exist] 
      params ${JSON.stringify(req.params)}
      body ${JSON.stringify(req.body)}
    `);
    return throwError("user doesn't exist", next);
  } else {
    user.isDeleted = true;
    user.save();
    res.status(200).json({ message: "user deleted" });
  }
};

export const getAutoSuggestUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const loginSubstring = req.params.loginSubstring;
    let limit = parseInt(req.params.limit);

    const filteredUsers = await User.findAll({
      where: {
        login: {
          [Op.like]: `%${loginSubstring}%`,
        },
      },
      limit: limit,
    });
    res.status(200).json({ users: filteredUsers });
  } catch (error) {
    logger.error(`
      module user method getAutoSuggestUsers error[${String(error)}] 
      params ${JSON.stringify(req.params)}
      body ${JSON.stringify(req.body)}
    `);
    return throwError("something went wrong", next);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log(req.body);

  const user = await User.findOne({ where: { login: req.body.login } });
  if (user && user.password === req.body.password) {
    const token = jwt.sign(
      {
        login: user.login,
        id: user.id,
      },
      "some_secret_str"
    );

    res.status(200).json({ message: "user logged in", token });
    return;
  }
  res.status(200).json({ message: "bad wea pass" });
  return;
};

export const verifytoken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = req.header("authorization");
  if (!token) return res.status(401).json({ error: "Missing token" });
  try {
    jwt.verify(token, "some_secret_str");
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid Token" });
  }

};
