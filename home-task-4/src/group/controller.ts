import { Request, Response, NextFunction } from "express";
import { Group } from "./groupModel";

export const create = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {  
  Group.create({
    name: req.body.name,
    permissions: req.body.permissions,
  }).then((group: Group) => {
    res.status(201).json({ message: "group created", group: group });
  });
};

export const update = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  Group.findByPk(req.params.groupId)
    .then((group: Group | null) => {
      if (!group) throw new Error("group doesn't exist");

      group.name = req.body.name;
      group.permissions = req.body.permissions;
      group.save();
      res.status(200).json({ message: "group updated", group: group });
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
  Group.findByPk(req.params.groupId)
    .then((group: Group | null) => {
      if (!group) throw new Error("group doesn't exist");
      res.status(200).json({ message: "group fetched", group: group });
    })
    .catch((error: Error) => {
      res.status(404).json({ message: error.message });
    });
};

export const getAll = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  Group.findAll()
    .then((groups: Group[]) => {
      res.status(200).json({ groups: groups });
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
  Group.findByPk(req.params.groupId)
    .then((group: Group | null) => {
      if (!group) throw new Error("group doesn't exist");
      group.destroy();
      res.status(200).json({ message: "group deleted" });
    })
    .catch((error: Error) => {
      res.status(404).json({ message: error.message });
    });
};


export const addUsersToGroup = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  Group.findByPk(req.params.groupId)
    .then((group: Group | null) => {
      if (!group) throw new Error("group doesn't exist");
      group.addUsers(req.body.users)
      res.status(200).json({ message: "users added to group" });
    })
    .catch((error: Error) => {
      res.status(404).json({ message: error.message });
    });
};
