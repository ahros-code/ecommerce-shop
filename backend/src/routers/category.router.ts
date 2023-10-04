import {Router} from "express";
import categoryController from "../controllers/category.controller";
import {upload} from "../config/multer/multer.config";

const router = Router();

router.get("/all", categoryController.getAllCategoriesAndProducts)
router.get("/:categoryId", categoryController.getProductsByCategory)
router.post("/new", upload.single("img"),categoryController.addCategory)

export default router;