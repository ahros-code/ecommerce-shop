import {Router} from "express";
import discountsController from "../controllers/discounts.controller";
import {upload} from "../config/multer/multer.config";

const router = Router();

router.get("/all", discountsController.getDiscounts);
router.post("/add", upload.single("img"), discountsController.addDiscounts);

export default router;