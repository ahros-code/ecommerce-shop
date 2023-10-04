import {Request, Response} from "express";
import {ImageModel, ProductModel, SellerModel, ShopModel} from "../models";
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
    const seller = await SellerModel.findOne({where: {email: sellerCreds.email, password: sellerCreds.password}}) as any;
    const sellerExists = await SellerModel.findOne({where: {email: sellerCreds.email, password: sellerCreds.password}});
    if(!sellerExists){
      return res.status(404).send({
        success: false,
        status: 404,
        data: [],
        message: "User does not exist"
      })
    }
    const shopExists = await ShopModel.findOne({where: {SellerModelId: seller.id}});
    if(shopExists){
      return res.status(409).send({
        success: false,
        status: 201,
        data: [],
        message: "Shop is already exists"
      })
    }
    const newShop = await ShopModel.create({
      name, description, SellerModelId: seller.id, ImageModel: {
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
    const seller = await SellerModel.findOne({where: {email: sellerCreds.email, password: sellerCreds.password}}) as any;
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
      data: [{newProduct}],
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

export default {addNewShop, addNewShopProduct}