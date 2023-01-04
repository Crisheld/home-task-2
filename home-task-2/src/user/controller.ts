import { Request, Response, NextFunction } from "express";
import { ValidatedRequest } from "express-joi-validation";
import { UserBodySchema } from "./validator";
import { v4 as uuidv4 } from "uuid";
import { users } from "./memoryStore";

export const create = (
  req: ValidatedRequest<UserBodySchema>,
  res: Response,
  next: NextFunction
): void => {
  console.log(req.body);
  const user: UserType = {
    id: uuidv4(),
    login: req.body.login,
    password: req.body.password,
    age: req.body.age,
    isDeleted: false,
  };
  users.push(user);
  console.log("====================");
  console.log(users);
  res.status(201).json({ message: "user created", user: user });
};

export const update = (
  req: ValidatedRequest<UserBodySchema>,
  res: Response,
  next: NextFunction
): void => {
  const userIndex = users.findIndex((user) => user.id === req.params.userId);
  if (userIndex >= 0) {
    users[userIndex].login = req.body.login;
    users[userIndex].password = req.body.password;
    users[userIndex].age = req.body.age;
    console.log("====================");
    console.log(users);
    res.status(200).json({ message: "user updated", user: users[userIndex] });
  } else {
    res.status(404).json({ message: "user doesn't exist" });
  }
};

export const getById = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log(req.params.userId);
  const user = users.find((user) => user.id === req.params.userId);
  if (user) {
    res.status(200).json({ message: "user fetched", user: user });
  } else {
    res.status(404).json({ message: "user doesn't exist" });
  }
};

export const deleteById = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log(req.params.userId);
  const userIndex = users.findIndex((user) => user.id === req.params.userId);
  users[userIndex].isDeleted = true;
  if (userIndex >= 0) {
    res.status(200).json({ message: "user deleted" });
  } else {
    res.status(404).json({ message: "user doesn't exist" });
  }
};

export const getAutoSuggestUsers = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const loginSubstring = req.params.loginSubstring;
    let limit = parseInt(req.params.limit);

    const filteredUsers = users.filter((user) => {
      if (user.login.includes(loginSubstring) && limit > 0) {
        limit--;
        return true;
      }
      return false;
    });
    res.status(200).json({ users: filteredUsers });
  } catch (error) {
    res.status(400).json({ message: "something went wrong" });
  }
};
