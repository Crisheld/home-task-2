import { DataTypes, Optional, Model, CreationOptional } from "sequelize";
import { sequelize } from "../sequilizedb";

type UserCreationAttributes = Optional<UserType, "id">;

export class User extends Model<UserType, UserCreationAttributes> {
  declare id: number;
  declare login: string;
  declare password: string;
  declare age: number;
  declare isDeleted: boolean;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}


User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    age: DataTypes.INTEGER,
    isDeleted: DataTypes.BOOLEAN,
  },
  {
    tableName: "Users",
    sequelize, // passing the `sequelize` instance is required
  }
);
