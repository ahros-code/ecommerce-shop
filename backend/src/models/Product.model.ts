import {DataTypes, Model} from "sequelize";
import {newSequelize} from "../config/db/db_connect";

export class ProductModel extends Model{}

ProductModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING
  },
  price: {
    type: DataTypes.INTEGER,
  },
  discount: {
    type: DataTypes.BOOLEAN,
  },
  discountPrice: {
    type: DataTypes.INTEGER
  },
  description :{
    type: DataTypes.TEXT
  },
  sold: {
    type: DataTypes.INTEGER
  },
  warranty: {
    type: DataTypes.INTEGER
  },
  rating: {
    type: DataTypes.ENUM('1', '2', '3', '4', '5')
  },
  size: {
    type: DataTypes.INTEGER
  },
  model: {
    type: DataTypes.STRING,
  },
  design: {
    type: DataTypes.STRING
  },
  inStock: {
    type: DataTypes.BOOLEAN,
  },
  pcs: {
    type: DataTypes.INTEGER
  }
}, {sequelize: newSequelize, tableName: "products", timestamps: false, })