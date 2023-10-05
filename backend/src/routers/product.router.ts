import {Router} from "express";
import productController from "../controllers/product.controller";

const router = Router();

router.get("/r", productController.getRecommendedProducts)
router.get("/search", productController.findProducts);
router.get("/shop/:shopId", productController.getAllShopProducts)
router.get("/all", productController.getAllProducts)
router.get("/:productId", productController.getOneProduct)


export default router;