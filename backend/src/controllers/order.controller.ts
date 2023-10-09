import {CartModel, ImageModel, OrderModel, ProductModel, UserModel} from "../models";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../constants/constants";
import {Request, Response} from "express";
import {STRING} from "sequelize";

async function getUserOrders(req, res) {
  try {
    const token = req.headers.token;
    const userCreds = jwt.verify(token, JWT_SECRET) as any;
    const user = await UserModel.findOne({ where: { email: userCreds.email, password: userCreds.password } }) as any;
    if (!user || !token || !userCreds) {
      return res.status(400).send({
        success: false,
        data: [],
        status: 400,
        message: "Token is invalid"
      });
    }

    const orders = await OrderModel.findAll({
      where: { UserModelId: user.id },
      include: [
        {
          model: ProductModel,
          include: [ImageModel] // Include ImageModel in ProductModel
        }
      ]
    }) as any;

    // Group orders by orderNumber
    const groupedOrders = {};
    for (const order of orders) {
      const product = order.ProductModel; // Access the ProductModel object
      const price = product.discountPrice; // Access the price property from the ProductModel object
      let date = new Date() as any;
      date = String(date)
      date = date.split(" ")
      if (!groupedOrders[order.orderNumber]) {
        groupedOrders[order.orderNumber] = {
          orders: [],
          totalPrice: 0,
          date: `${date[2]}-${date[1]}, ${date[4]}` // Add the current date to the grouped order
        };
      }
      groupedOrders[order.orderNumber].orders.push(order);
      groupedOrders[order.orderNumber].totalPrice += price; // Use the price variable
    }

    // Convert grouped orders into an array
    const sortedOrders = Object.keys(groupedOrders).map(orderNumber => ({
      orderNumber,
      ...groupedOrders[orderNumber]
    }));

    return res.status(200).send({
      success: true,
      status: 200,
      data: sortedOrders,
      message: ""
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      status: 500,
      data: [],
      message: err.message
    });
  }
}

async function addOrder(req: Request, res: Response) {
  try {
    const { token } = req.headers as any;
    const userCreds = jwt.verify(token, JWT_SECRET) as any;
    const user = await UserModel.findOne({
      where: { email: userCreds.email, password: userCreds.password },
    }) as any;
    const cartItems = await CartModel.findAll({
      where: { UserModelId: user.id },
    }) as any;
    for (const cartItem of cartItems) {
      cartItem.sold + 1;
      cartItem.pcs - 1;
      await cartItem.save();
      const orderNumber = generateRandomNumber(7);
      await OrderModel.create({
        UserModelId: cartItem.UserModelId,
        ProductModelId: cartItem.ProductModelId,
        orderNumber: orderNumber,
      });
    }
    await CartModel.destroy({ where: { UserModelId: user.id } });
    return res.status(201).send({
      success: true,
      status: 201,
      data: [],
      message: "Order created successfully!",
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

function generateRandomNumber(length: number): string {
  let result = "";
  const characters = "0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default {getUserOrders, addOrder}