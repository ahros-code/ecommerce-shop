import express, {Application} from "express";
import {BrandModel, ProductModel} from "./models/index";
import {upload} from "./config/multer/multer.config";
import authRouter from "./routers/auth.router";
import sellerAuthRouter from "./routers/sellerAuth.router";
import categoryRouter from "./routers/category.router";
import productRouter from "./routers/product.router";
import shopRouter from "./routers/shop.router";
import userRouter from "./routers/user.router";
import cartRouter from "./routers/cart.router";
import {resolve} from "path";
import imgRouter from "./routers/img.router";
import orderController from "./controllers/order.controller";
import orderRouter from "./routers/order.router";
import discountsRouter from "./routers/discounts.router";
import cors from "cors"

// TODO: add "allowNull" field to ProductModel
// TODO: add pagination on all get requests
// TODO: make responses good ✅
// TODO: foreign keylarga allowNull qo'sh
// TODO: hamma ProductModel.findAll() ga hamma associationlarini ber
// TODO: add discount slider table ✅
// TODO: add supliers table ✅
// TODO: add uploads static foler ✅
// TODO: add "img" router and controller ✅
// TODO: add orders table ✅
// TODO: add cart table ✅
// TODO: add price range filter
// TODO: add put delete to products
// TODO: add put delete to user and seller
// TODO: add put, delete to all models
// TODO: hamma model importlarini pathini "../models/index" ga ozgartir ✅
// TODO: admin rights ✅
// TODO: add check token ✅
// TODO: product sotib olinganda "pcs" ga +1 ta qoshib ketsin
// TODO: swagger qo'sh ( optional )


async function bootstrap(){
  try{
    const app:Application = express();
    app.use(express.json());
    app.use(cors())
    app.listen(5000, () => {
      console.log("🚀 Server is running...")
    })
    app.get("/testdba", upload.single("img"), async (req, res) => {
      const products = await ProductModel.findAll({include: BrandModel})
      return res.send(products)
    })
    app.use("/api/auth", authRouter);
    app.use("/api/seller/auth", sellerAuthRouter)
    app.use("/api/category", categoryRouter)
    app.use("/api/products", productRouter);
    app.use("/api/shop", shopRouter);
    app.use("/api/profile", userRouter);
    app.use("/api/cart", cartRouter);
    app.use("/api/order", orderRouter)
    app.use("/img", imgRouter);
    app.use("/api/order", orderRouter);
    app.use("/api/discount", discountsRouter)
  } catch (err){
    console.log(err.message)
  }
}

bootstrap()