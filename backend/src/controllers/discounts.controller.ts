import {DiscountModel, ImageModel, UserModel} from "../models";
import {Request, Response} from "express";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../constants/constants";

async function getDiscounts(req:Request, res:Response) {
  try{
    const discounts = await DiscountModel.findAll({include: ImageModel});
    return res.status(200).send({
      success: true,
      data: discounts,
      status: 200,
      message: ""
    });
  } catch (err){
    return res.status(500).send({
      success: false,
      status: 500,
      data: [],
      message: err.message
    })
  }
}

async function addDiscounts(req:Request, res:Response){
  try{
    const {link} = req.body;
    const file = req.file;
    const {token} = req.headers as any;
    if(!token){
      return res.status(400).send({
        success: false,
        data: [],
        status: 400,
        message: "Please provide ur token"
      })
    }
    const userCreds = jwt.verify(token, JWT_SECRET) as any;
    const user = await UserModel.findOne({where: {email: userCreds.email, password: userCreds.password}}) as any;
    if(!user){
      return res.status(404).send({
        success: false,
        status: 404,
        data: [],
        message: "User is not found :("
      })
    }
    if(user.isAdmin == false){
      return res.status(409).send({
        success: false,
        data: [],
        status: 409,
        message: "You dont have right to add new discount :("
      })
    }
    const newDiscount = await DiscountModel.create({link, ImageModel: {link: `/img/${file.filename}`}},{include: ImageModel})
    return res.status(201).send({
      success: true,
      status: 201,
      data: newDiscount,
      message: 'Discount created successfully!'
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

export default {
  getDiscounts,
  addDiscounts
}