import {DataTypes, Model} from "sequelize";
import {newSequelize} from "../config/db/db_connect";

export class OrderModel extends Model{}

OrderModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  orderNumber: {
    type: DataTypes.INTEGER
  }
},{sequelize: newSequelize, timestamps: false, tableName: "orders"})