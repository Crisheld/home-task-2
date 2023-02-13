import { NextFunction, Request, Response } from "express";
import { Group } from "./groupModel";
import { throwError } from "../common/utils";
import logger from "../logger";

export const create = async (req: Request, res: Response): Promise<void> => {
  const group = await Group.create({
    name: req.body.name,
    permissions: req.body.permissions,
  });
  res.status(201).json({ message: "group created", group: group });
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const group = await Group.findByPk(req.params.groupId);
  if (!group) {
    logger.error(`
      module group method update error[group doesn't exist] 
      params ${JSON.stringify(req.params)}
      body ${JSON.stringify(req.body)}
    `);
    return throwError("group doesn't exist", next);
  } else {
    group.name = req.body.name;
    group.permissions = req.body.permissions;
    group.save();
    res.status(200).json({ message: "group updated", group: group });
  }
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const group = await Group.findByPk(req.params.groupId);
  if (!group) {
    logger.error(`
      module group method getById error[group doesn't exist] 
      params ${JSON.stringify(req.params)}
      body ${JSON.stringify(req.body)}
    `);
    return throwError("group doesn't exist", next);
  } else {
    res.status(200).json({ message: "group fetched", group: group });
  }
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
  const groups = await Group.findAll();
  res.status(200).json({ groups: groups });
};

export const deleteById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const group = await Group.findByPk(req.params.groupId);
  if (!group) {
    logger.error(`
      module group method deleteById error[group doesn't exist] 
      params ${JSON.stringify(req.params)}
      body ${JSON.stringify(req.body)}
    `);
    return throwError("group doesn't exist", next);
  } else {
    await group.destroy();
    res.status(200).json({ message: "group deleted" });
  }
};

export const addUsersToGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const group = await Group.findByPk(req.params.groupId);
  if (!group) {
    logger.error(`
      module group method addUsersToGroup error[group doesn't exist] 
      params ${JSON.stringify(req.params)}
      body ${JSON.stringify(req.body)}
    `);
    return throwError("group doesn't exist", next);
  } else {
    await group.addUsers(req.body.users);
    res.status(200).json({ message: "users added to group" });
  }
};
