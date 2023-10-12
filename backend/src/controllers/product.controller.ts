import {BrandModel, CategoryModel, ImageModel, ProductModel, ReviewModel, ShopModel, UserModel} from "../models/index";
import {Request, Response} from "express";
import {Op} from "sequelize";
import {newSequelize} from "../config/db/db_connect";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../constants/constants";

async function findProducts(req: Request, res: Response) {
  try {
    const { pageNumber, pageSize, q } = req.query as any;
    const offset = pageNumber ? (pageNumber - 1) * (pageSize ? pageSize : 10) : 0;
    const limit = pageSize ? pageSize : 10;

    let products;
    let totalCount;

    if (q) {
      [products, totalCount] = await Promise.all([
        ProductModel.findAll({
          offset,
          limit,
          include: [
            { model: CategoryModel },
            { model: BrandModel },
            { model: ImageModel },
            { model: ShopModel },
          ],
          where: {
            name: {
              [Op.iLike]: `%${q}%`, // Case-insensitive search
            },
          },
        }),
        ProductModel.count({
          where: {
            name: {
              [Op.iLike]: `%${q}%`,
            },
          },
        }),
      ]);
    } else {
      [products, totalCount] = await Promise.all([
        ProductModel.findAll({
          offset,
          limit,
          include: [
            { model: CategoryModel },
            { model: BrandModel },
            { model: ImageModel },
            { model: ShopModel },
          ],
        }),
        ProductModel.count(),
      ]);
    }

    const totalPages = Math.ceil(totalCount / limit);

    return res.status(200).send({
      success: true,
      status: 200,
      data: products,
      totalCount: totalCount,
      totalPages: totalPages,
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

async function getAllShopProducts(req: Request, res: Response) {
  try {
    const { pageNumber, pageSize, search } = req.query as any;
    const offset = pageNumber ? (pageNumber - 1) * (pageSize ? pageSize : 10) : 0;
    const limit = pageSize ? pageSize : 10;
    const { shopId } = req.params;
    const whereClause = { ShopModelId: shopId };

    // Add search condition if search parameter is provided
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } }
      ];
    }

    const products = await ProductModel.findAll({
      where: whereClause,
      offset,
      limit,
      include: [
        { model: ShopModel },
        { model: CategoryModel },
        { model: BrandModel },
        { model: ImageModel },
      ],
    });

    res.send(products);
  } catch (err) {
    return res.status(500).send({
      success: false,
      status: 500,
      data: [],
      message: err.message,
    });
  }
}

async function getAllProducts(req, res) {
  try {
    const {pageNumber, pageSize} = req.query;
    const offset = pageNumber ? (pageNumber - 1) * (pageSize ? pageSize : 10) : 0;
    const limit = pageSize ? pageSize : 10;
    const products = await ProductModel.findAll({
      offset,
      limit,
      include: [
        {model: ShopModel},
        {model: CategoryModel},
        {model: BrandModel},
        {model: ImageModel},
      ],
    });
    return res.status(200).send({
      success: true,
      status: 200,
      data: [{products}],
      message: null,
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

async function getOneProduct(req, res) {
  try {
    const { productId } = req.params;
    const product = await ProductModel.findOne({
      where: { id: productId },
      include: [
        { model: BrandModel },
        { model: CategoryModel },
        {
          model: ShopModel,
          include: [{ model: ImageModel }],
        },
        { model: ImageModel },
        { model: ReviewModel },
      ],
    });
    if (!product) {
      return res.status(404).send({
        success: false,
        status: 404,
        data: [],
        message: "Product is not found",
      });
    }
    return res.send({
      success: true,
      status: 200,
      data: product,
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

async function getRecommendedProducts(req, res) {
  try {
    const { pageNumber, pageSize } = req.query;
    const offset = pageNumber ? (Number(pageNumber) - 1) * (pageSize ? Number(pageSize) : 10) : 0;
    const limit = pageSize ? Number(pageSize) : 10;

    const topSoldProducts = await ProductModel.findAll({
      order: [['sold', 'DESC']],
      offset, limit, include: ImageModel
    });

    return res.send({
      success: true,
      status: 200,
      data: topSoldProducts,
      message: ""
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

async function deleteShopProduct(req:Request, res:Response) {
  try{
    const {token} = req.headers as any;
    const {productId} = req.params;
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
    const product = await ProductModel.findOne({where: {id: productId}}) as any;
    await product.destroy();
    return res.status(200).send({
      success: true,
      data: [],
      status: 200,
      message: "Product was deleted successfully!"
    })
  } catch (err){
    return res.status(500).send({
      success: false,
      status: 500,
      data: [],
      message: err.message,
    });
  }
}


export default {findProducts, getAllShopProducts, getAllProducts, getOneProduct, getRecommendedProducts, deleteShopProduct}