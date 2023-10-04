import {BrandModel, CategoryModel, ImageModel, ProductModel, ShopModel} from "../models/index";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../constants/constants";
import {Request, Response} from "express";

async function getAllCategoriesAndProducts(req:Request, res:Response) {
  try{
    const {pageNumber, pageSize} = req.query as any;
    const offset = pageNumber ? (pageNumber - 1) * (pageSize ? pageSize : 10) : 0
    const limit = pageSize ? pageSize : 10;
    const categories = await CategoryModel.findAll({
      include: [
        {
          model: ProductModel,
          include: [ImageModel] // Include ImageModel within ProductModel
        },
        ImageModel // Include ImageModel at the top level as well
      ],
      offset,
      limit
    });
    return res.status(200).send({
      success: true,
      status: 200,
      data: categories,
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

async function addCategory(req:Request, res:Response) {
  try{
    const {token} = req.headers as any;
    const userCreds = jwt.verify(token, JWT_SECRET) as any;
    if(userCreds.isAdmin == false){
      return res.status(401).send({
        success: false,
        status: 401,
        data: [],
        message: "You don't have rights to add new category"
      })
    }
    const {name} = req.body;
    const file = req.file;
    const newCategory = await CategoryModel.create({
      name, ImageModel:{
        link: `/img/${file.filename}`
      }
    },{returning: true, include: ImageModel});
    return res.status(201).send({
      success: true,
      status: 201,
      data: [{newCategory}],
      message: "Category was created successfully!"
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

async function getProductsByCategory(req:Request, res:Response){
  try{
    const {categoryId} = req.params as any;
    // const {pageNumber, pageSize} = req.query as any;
    // const offset = pageNumber ? (pageNumber - 1) * (pageSize ? pageSize : 10) : 1
    // const limit = pageSize ? pageSize : 10;
    const categories = await CategoryModel.findAll({where: {id: categoryId}, include: ProductModel});
    return res.status(200).send({
      success: true,
      status: 200,
      data: [{categories}],
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

export default {getAllCategoriesAndProducts, addCategory, getProductsByCategory}