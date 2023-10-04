import {DataTypes, Model} from "sequelize";
import {newSequelize} from "../config/db/db_connect";

export class SuppliersModel extends Model{}

SuppliersModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shopName: {
    type: DataTypes.STRING,
  }
}, {sequelize: newSequelize, timestamps: false, tableName: "suppliers"})