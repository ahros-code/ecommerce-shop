import {DataTypes, Model} from "sequelize";
import {newSequelize} from "../config/db/db_connect";

export class ReviewModel extends Model{}

ReviewModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  text: {
    type: DataTypes.STRING
  }
}, {sequelize: newSequelize, tableName: "reviews", timestamps: false})