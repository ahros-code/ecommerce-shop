import {BrandModel, CategoryModel, ImageModel, ProductModel, ShopModel} from "../models/index";
import {Request, Response} from "express";

async function findProducts(req: Request, res: Response) {
  try {
    const {pageNumber, pageSize, q} = req.query as any;
    const offset = pageNumber ? (pageNumber - 1) * (pageSize ? pageSize : 10) : 0;
    const limit = pageSize ? pageSize : 10;

    const products = await ProductModel.findAll({
      offset,
      limit,
      include: [{model: CategoryModel}, {model: BrandModel}],
    }) as any;

    let foundProducts = products.filter((p: any) =>
        p.name.toLowerCase().includes(q.toLowerCase())
    );

    return res.status(200).send({
      success: true,
      status: 200,
      data: {products: foundProducts},
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
    const {productId} = req.params;
    const product = await ProductModel.findOne({
      where: {id: productId},
      include: [{model: BrandModel}, {model: CategoryModel}, {model: ShopModel}, {model: ImageModel}]
    })
    if (!product) {
      return res.status(404).send({
        success: false,
        status: 404,
        data: [],
        message: "Product is not found"
      })
    }
    return res.send({
      success: true,
      status: 200,
      data: product,
      message: ""
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

export default {findProducts, getAllShopProducts, getAllProducts, getOneProduct}