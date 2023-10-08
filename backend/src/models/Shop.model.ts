import {DataTypes, Model} from "sequelize";
import {newSequelize} from "../config/db/db_connect";

export class ShopModel extends Model{}

ShopModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING
  }
}, {
  sequelize: newSequelize, timestamps: false, tableName:"shops"
})