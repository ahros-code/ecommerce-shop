import {DataTypes, Model} from "sequelize";
import {newSequelize} from "../config/db/db_connect";

export class ConfirmCodeModel extends Model{}

ConfirmCodeModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    allowNull: false
  },
  code: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},{sequelize: newSequelize, tableName: "confirmCodes", timestamps: false})