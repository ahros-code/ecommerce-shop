import {DataTypes, Model} from "sequelize";
import {newSequelize} from "../config/db/db_connect";

export class SellerModel extends Model{}

SellerModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING,
    
  },
  lastName: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    
  },
  password: {
    type: DataTypes.STRING,
    
  },
  avatar: {
    type: DataTypes.TEXT
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  activateLink: {
    type: DataTypes.STRING
  },
  isActivated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {sequelize: newSequelize, tableName: "sellers", timestamps: false})