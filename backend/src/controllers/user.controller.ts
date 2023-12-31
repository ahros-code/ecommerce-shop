import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../constants/constants";
import {UserModel} from "../models/index";

async function getProfile(req, res) {
  try{
    const {token} = req.headers as any;
    let {email, password} = jwt.verify(token, JWT_SECRET) as any;
    let user = await UserModel.findOne({where: {email, password}})
    if(!user){
      return res.status(404).send({
        success: false,
        status: 404,
        data: [],
        message: "User is not found"
      })
    }
    return res.send({
      success: true,
      status: 200,
      data: user,
      message: ""
    })
  } catch (err){
    return res.status(500).send({
      success: false,
      status: 500,
      data: [],
      message: err.message
    })
  }
}

export default {getProfile}