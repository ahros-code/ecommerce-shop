import {DataTypes, Model} from "sequelize";
import {newSequelize} from "../config/db/db_connect";

export class BrandModel extends Model{}

BrandModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING
  }
},{sequelize: newSequelize, timestamps: false, tableName: "brands"})