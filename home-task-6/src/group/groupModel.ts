import {
  DataTypes,
  Optional,
  Model,
  CreationOptional,
  HasManyAddAssociationMixin,
} from "sequelize";
import { sequelize } from "../sequilizedb";
import { User } from "../user/userModel";

type GroupCreationAttributes = Optional<GroupType, "id">;

export class Group extends Model<GroupType, GroupCreationAttributes> {
  declare id: number;
  declare name: string;
  declare permissions: Array<permission>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare addUsers: HasManyAddAssociationMixin<User, number>;
}

Group.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    permissions: DataTypes.ARRAY(DataTypes.STRING),
  },
  {
    tableName: "Groups",
    sequelize, // passing the `sequelize` instance is required
  }
);

Group.belongsToMany(User, {
  through: "UserGroup",
  as: "users",
  foreignKey: "group_id",
});

User.belongsToMany(Group, {
  through: "UserGroup",
  as: "groups",
  foreignKey: "user_id",
});
