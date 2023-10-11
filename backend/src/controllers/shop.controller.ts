import {Request, Response} from "express";
import {ImageModel, ProductModel, ShopModel, UserModel} from "../models";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../constants/constants";

async function addNewShop (req:Request, res:Response){
  try{
    const {token} = req.headers as any;
    if(!token){
      return res.status(401).send({
        success: false,
        status: 401,
        data: [],
        message: "Token is not provided"
      })
    }
    const {name, description} = req.body;
    const img = req.file;
    const sellerCreds = jwt.verify(token, JWT_SECRET) as any;
    const seller = await UserModel.findOne({where: {email: sellerCreds.email, password: sellerCreds.password}}) as any;
    const sellerExists = await UserModel.findOne({where: {email: sellerCreds.email, password: sellerCreds.password}});
    if(!sellerExists){
      return res.status(404).send({
        success: false,
        status: 404,
        data: [],
        message: "User does not exist"
      })
    }
    const shopExists = await ShopModel.findOne({where: {UserModelId: seller.id}});
    if(shopExists){
      return res.status(409).send({
        success: false,
        status: 201,
        data: [],
        message: "Shop is already exists"
      })
    }
    const newShop = await ShopModel.create({
      name, description, UserModelId: seller.id, ImageModel: {
        link: `/img/${img.filename}`
      }
    },{returning: true, include: ImageModel}) as any;
    return res.status(201).send({
      success: true,
      status: 201,
      data: [
        {
          shop: newShop
        }
      ],
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

async function addNewShopProduct (req, res) {
  try{
    const {token} = req.headers;
    const {name, category_id, brand_id} = req.body;
    const img = req.file;
    if(!token){
      return res.status(401).send({
        success: false,
        status: 401,
        data: [],
        message: "Token is not provided"
      })
    }
    const sellerCreds = jwt.verify(token, JWT_SECRET) as any;
    const seller = await UserModel.findOne({where: {email: sellerCreds.email, password: sellerCreds.password}}) as any;
    if(!seller){
      return res.status(404).send({
        success: true,
        status: 404,
        data: [],
        message: "Seller is not found"
      })
    }
    const shop = await ShopModel.findOne({where: {SellerModelId: seller.id}}) as any;
    const newProduct = await ProductModel.create({
      name, ShopModelId: shop.id, CategoryModelId: category_id, BrandModelId: brand_id, ImageModel: {link: `/img/${img.filename}`}
    },{returning: true, include: ImageModel}) as any;
    return res.status(201).send({
      success: true,
      status: 201,
      data: newProduct,
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

async function getShop(req:Request, res:Response) {
  try{
    const {token} = req.headers as any;
    const userCreds = jwt.verify(token, JWT_SECRET) as any;
    const user = await UserModel.findOne({where: {email: userCreds.email, password: userCreds.password}}) as any;
    if(!user){
      return res.status(404).send({
        success: false,
        data: [],
        status: 404,
        message: "User is not found"
      })
    }
    const shop = await ShopModel.findOne({where: {UserModelId: user.id}, include: [{model: UserModel},{model: ImageModel}]})
    if(!shop){
      return res.status(404).send({
        success: false,
        data: [],
        status: 404,
        message: "Shop is not found"
      })
    }
    return res.send({
      success: true,
      status: 200,
      data: shop,
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

export default {addNewShop, addNewShopProduct, getShop}