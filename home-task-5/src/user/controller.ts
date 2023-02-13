import { Request, Response } from "express";
import { ValidatedRequest } from "express-joi-validation";
import { UserBodySchema } from "./validator";
import { User } from "./userModel";
import { Op } from "sequelize";
import { throwError } from "../common/utils";

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
  res: Response
): Promise<void> => {
  const user = await User.findByPk(req.params.userId);
  if (!user) {
    throwError("user doesn't exist");
  } else {
    user.login = req.body.login;
    user.password = req.body.password;
    user.age = req.body.age;
    await user.save();
    res.status(200).json({ message: "user updated", user: user });
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  const user = await User.findByPk(req.params.userId);
  if (!user) {
    throwError("user doesn't exist");
  }
  res.status(200).json({ message: "user fetched", user: user });
};

export const deleteById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const user = await User.findByPk(req.params.userId);
  if (!user) {
    throwError("user doesn't exist");
  } else {
    user.isDeleted = true;
    user.save();
    res.status(200).json({ message: "user deleted" });
  }
};

export const getAutoSuggestUsers = async (
  req: Request,
  res: Response
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
    throwError("something went wrong");
  }
};
