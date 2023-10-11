import {BrandModel, CategoryModel, ImageModel, ProductModel, ReviewModel, ShopModel} from "../models/index";
import {Request, Response} from "express";
import {Op} from "sequelize";
import {newSequelize} from "../config/db/db_connect";

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
    const {pageNumber, pageSize} = req.query as any;
    const offset = pageNumber ? (pageNumber - 1) * (pageSize ? pageSize : 10) : 1
    const limit = pageSize ? pageSize : 10;
    const {shopId} = req.params;
    const products = await ProductModel.findAll({
      where: {ShopModelId: shopId},
      offset,
      limit,
      include: [{model: ShopModel}, {model: CategoryModel}, {model: BrandModel}]
    })
    res.send(products)
  } catch (err) {
    return res.status(500).send({
      success: false,
      status: 500,
      data: [],
      message: err.message
    })
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


export default {findProducts, getAllShopProducts, getAllProducts, getOneProduct, getRecommendedProducts}