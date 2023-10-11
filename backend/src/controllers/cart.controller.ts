import {Request, Response} from "express";
import {CartModel, ImageModel, ShopModel} from "../models/index";
import {ProductModel, UserModel} from "../models";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../constants/constants";

async function getUserCart(req: Request, res: Response) {
  try {
    const {token} = req.headers as any;
    const userCreds = jwt.verify(token, JWT_SECRET) as any;
    const user = await UserModel.findOne({
      where: {email: userCreds.email, password: userCreds.password},
    }) as any;
    if (!(user) || !token || !userCreds) {
      return res.status(400).send({
        success: false,
        data: [],
        status: 400,
        message: "Token is invalid",
      });
    }
    const cart = await CartModel.findAll({
      where: {UserModelId: user.id},
      include: [
        {
          model: ProductModel,
          include: [ImageModel, ShopModel],
        },
      ],
    }) as any;

    let totalPrice = 0;
    for (const item of cart) {
      const productPrice = item.ProductModel.discountPrice;
      totalPrice += productPrice
    }
    return res.status(200).send({
      success: true,
      status: 200,
      data: cart,
      totalPrice: totalPrice,
      message: "",
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      status: 500,
      data: [],
      message: err.message,
    });
  }
}

async function deleteItemFromCart(req: Request, res: Response) {
  try {
    const {id} = req.params;
    const cartItem = await CartModel.findOne({where: {id}});
    await cartItem.destroy();
    return res.status(200).send({
      success: true,
      status: 200,
      data: [],
      message: "deleted"
    })
  } catch (err) {
    return res.status(500).send({
      success: false,
      status: 500,
      data: [],
      message: err.message,
    });
  }
}

async function addToCart(req: Request, res: Response) {
  try {
    const {token} = req.headers as any;
    const {productId} = req.body as any;
    const userCreds = jwt.verify(token, JWT_SECRET) as any;
    const user = await UserModel.findOne({where: {email: userCreds.email, password: userCreds.password}}) as any;
    if (!user || !token || !userCreds) {
      return res.status(400).send({
        success: false,
        data: [],
        status: 400,
        message: "Token is invalid"
      })
    }
    const product = await CartModel.create({
      UserModelId: user.id,
      ProductModelId: productId
    }, {returning: true});
    return res.status(201).send({
      success: true,
      data: product,
      status: 201,
      message: "Created"
    })
  } catch (err) {
    return res.status(500).send({
      success: false,
      status: 500,
      data: [],
      message: err.message
    })
  }
}

export default {getUserCart, addToCart, deleteItemFromCart}