import {Sequelize} from "sequelize";
import {DB} from "../../constants/constants";

export const newSequelize = new Sequelize(DB, {
  logging: false
});

!async function (){
  try {
    await newSequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}()