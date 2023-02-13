import { NextFunction, Request, Response } from "express";
import { ValidatedRequest } from "express-joi-validation";
import { UserBodySchema } from "./validator";
import { User } from "./userModel";
import { Op } from "sequelize";
import { throwError } from "../common/utils";
import logger from "../logger";

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
