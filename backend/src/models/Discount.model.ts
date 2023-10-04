import {DataTypes, Model} from "sequelize";
import {newSequelize} from "../config/db/db_connect";

export class DiscountModel extends Model{}

DiscountModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  link: {
    type: DataTypes.STRING
  }
},{sequelize: newSequelize, timestamps: false, tableName: "discounts"})