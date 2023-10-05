import {CartModel, OrderModel, ProductModel, UserModel} from "../models";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../constants/constants";
import {Request, Response} from "express";

async function getUserOrders(req, res){
  try{
    const token = req.headers;
    const userCreds = jwt.sign(token, JWT_SECRET) as any;
    const user = await UserModel.findOne({where: {email: userCreds.email, password: userCreds.password}}) as any;
    if(!user || !token || !userCreds){
      return res.status(400).send({
        success: false,
        data: [],
        status: 400,
        message: "Token is invalid"
      })
    }
    const orders = await OrderModel.findAll({where: {UserModelId: user.id}, include: ProductModel})
    return res.status(200).send({
      success: true,
      status: 200,
      data: [{orders}],
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

async function addOrder(req:Request, res:Response){
  try{
    const {token} = req.headers as any;
    const userCreds = jwt.verify(token, JWT_SECRET) as any;
    const user = await UserModel.findOne({where: {email: userCreds.email, password: userCreds.password}}) as any;
    const cartItems = await CartModel.findAll({ where: { UserModelId: user.id } }) as any;
    for (const cartItem of cartItems) {
      cartItem.sold + 1;
      await cartItem.save();
      await OrderModel.create({
        UserModelId: cartItem.UserModelId,
        ProductModelId: cartItem.ProductModelId
      });
    }
    await CartModel.destroy({ where: { UserModelId: user.id } });
    return res.status(201).send({
      success: true,
      status: 201,
      data: [],
      message: "Order created successfully!"
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

export default {getUserOrders, addOrder}