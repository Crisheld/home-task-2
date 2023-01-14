import { Request, Response, NextFunction } from "express";
import { ValidatedRequest } from "express-joi-validation";
import { UserBodySchema } from "./validator";
import { User } from "./userModel";
import { Op } from "sequelize";

export const create = (
  req: ValidatedRequest<UserBodySchema>,
  res: Response,
  next: NextFunction
): void => {
  User.create({
    login: req.body.login,
    password: req.body.password,
    age: req.body.age,
    isDeleted: false,
  }).then((user: User) => {
    res.status(201).json({ message: "user created", user: user });
  });
};

export const update = (
  req: ValidatedRequest<UserBodySchema>,
  res: Response,
  next: NextFunction
): void => {
  User.findByPk(req.params.userId)
    .then((user: User | null) => {
      if (!user) throw new Error("user doesn't exist");

      user.login = req.body.login;
      user.password = req.body.password;
      user.age = req.body.age;
      user.save();
      res.status(200).json({ message: "user updated", user: user });
    })
    .catch((error: Error) => {
      res.status(404).json({ message: error.message });
    });
};

export const getById = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  User.findByPk(req.params.userId)
    .then((user: User | null) => {
      if (!user) throw new Error("user doesn't exist");
      res.status(200).json({ message: "user fetched", user: user });
    })
    .catch((error: Error) => {
      res.status(404).json({ message: error.message });
    });
};

export const deleteById = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  User.findByPk(req.params.userId)
    .then((user: User | null) => {
      if (!user) throw new Error("user doesn't exist");

      user.isDeleted = true;
      user.save();
      res.status(200).json({ message: "user deleted" });
    })
    .catch((error: Error) => {
      res.status(404).json({ message: error.message });
    });
};

export const getAutoSuggestUsers = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const loginSubstring = req.params.loginSubstring;
    let limit = parseInt(req.params.limit);

    User.findAll({
      where: {
        login: {
          [Op.like]: `%${loginSubstring}%`,
        },
      },
      limit: limit,
    })
      .then((filteredUsers: User[]) => {
        res.status(200).json({ users: filteredUsers });
      })
      .catch((error: Error) => {
        res.status(400).json({ message: error.message });
      });
  } catch (error) {
    res.status(400).json({ message: "something went wrong" });
  }
};
