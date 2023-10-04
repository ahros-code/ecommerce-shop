import {Router} from "express";
import sellerController from "../controllers/seller.controller";
import {upload} from "../config/multer/multer.config";

const router = Router();

router.post("/register", upload.single("avatar"), sellerController.userRegister)
router.get("/activate/:link", sellerController.activate)
router.post("/login", sellerController.login)
router.post("/forgot",sellerController.forgotPassword)
router.post("/new-password",sellerController.newPassword)

export default router;