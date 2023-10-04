import {DataTypes, Model} from "sequelize";
import {newSequelize} from "../config/db/db_connect";

export class CartModel extends Model{}

CartModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
}, {sequelize: newSequelize, timestamps: false, tableName: "carts"})