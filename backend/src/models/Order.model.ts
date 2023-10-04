import {DataTypes, Model} from "sequelize";
import {newSequelize} from "../config/db/db_connect";

export class OrderModel extends Model{}

OrderModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
},{sequelize: newSequelize, timestamps: false, tableName: "orders"})