import { Request, Response } from "express";
import { Group } from "./groupModel";
import { throwError } from "../common/utils";

export const create = async (req: Request, res: Response): Promise<void> => {
  const group = await Group.create({
    name: req.body.name,
    permissions: req.body.permissions,
  });
  res.status(201).json({ message: "group created", group: group });
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const group = await Group.findByPk(req.params.groupId);
  if (!group) {
    throwError("user doesn't exist");
  } else {
    group.name = req.body.name;
    group.permissions = req.body.permissions;
    group.save();
    res.status(200).json({ message: "group updated", group: group });
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  const group = await Group.findByPk(req.params.groupId);
  if (!group) {
    throwError("user doesn't exist");
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
  res: Response
): Promise<void> => {
  const group = await Group.findByPk(req.params.groupId);
  if (!group) {
    throwError("user doesn't exist");
  } else {
    await group.destroy();
    res.status(200).json({ message: "group deleted" });
  }
};

export const addUsersToGroup = async (
  req: Request,
  res: Response
): Promise<void> => {
  const group = await Group.findByPk(req.params.groupId);
  if (!group) {
    throwError("user doesn't exist");
  } else {
    await group.addUsers(req.body.users);
    res.status(200).json({ message: "users added to group" });
  }
};
