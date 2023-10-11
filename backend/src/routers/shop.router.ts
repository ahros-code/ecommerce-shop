import {Router} from "express";
import shopController from "../controllers/shop.controller";
import {upload} from "../config/multer/multer.config";

const router = Router();

router.get("/get", shopController.getShop)
router.post("/new", upload.single("img"), shopController.addNewShop);
router.post("/new/product", upload.single("img"), shopController.addNewShopProduct);

export default router;