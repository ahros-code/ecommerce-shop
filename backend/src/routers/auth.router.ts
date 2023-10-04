import {Router} from "express";
import authController from "../controllers/auth.controller";
import {upload} from "../config/multer/multer.config";

const router = Router();

router.post("/register", upload.single("avatar"), authController.userRegister)
router.get("/activate/:link", authController.activate)
router.post("/login", authController.login)
router.post("/forgot",authController.forgotPassword)
router.post("/new-password", authController.newPassword)

export default router;