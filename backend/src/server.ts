// @ts-ignore
import express from "express"
import authRouter from "./routers/auth.router";
import categoryRouter from "./routers/category.router";
import productRouter from "./routers/product.router";
import shopRouter from "./routers/shop.router";
import userRouter from "./routers/user.router";
import cartRouter from "./routers/cart.router";
import imgRouter from "./routers/img.router";
import orderRouter from "./routers/order.router";
import discountsRouter from "./routers/discounts.router";
import cors from "cors"
import suppliersRouter from "./routers/suppliers.router";

async function bootstrap(){
  try{
    const app = express();
    app.use(express.json());
    app.use(cors())
    app.listen(5000, () => {
      console.log("🚀 Server is running...")
    })
    app.use("/api/auth", authRouter);
    app.use("/api/category", categoryRouter);
    app.use("/api/products", productRouter);
    app.use("/api/shop", shopRouter);
    app.use("/api/profile", userRouter);
    app.use("/api/cart", cartRouter);
    app.use("/api/order", orderRouter)
    app.use("/img", imgRouter);
    app.use("/api/order", orderRouter);
    app.use("/api/discount", discountsRouter)
    app.use("/api/suppliers", suppliersRouter)
  } catch (err){
    console.log(err.message)
  }
}

bootstrap()