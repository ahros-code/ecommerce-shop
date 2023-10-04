import {DataTypes, Model} from "sequelize";
import {newSequelize} from "../config/db/db_connect";

export class ImageModel extends Model{}

ImageModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  link: {
    type: DataTypes.TEXT
  }
},{sequelize: newSequelize, timestamps: false, tableName: "images"})