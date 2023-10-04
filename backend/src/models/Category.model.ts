import {DataTypes, Model} from "sequelize";
import {newSequelize} from "../config/db/db_connect";

export class CategoryModel extends Model{}

CategoryModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
},{sequelize: newSequelize, tableName: "categories", timestamps: false})