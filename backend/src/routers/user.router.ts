import {raw, Router} from "express";
import {UserModel} from "../models";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../constants/constants";
import userController from "../controllers/user.controller";

const router = Router();

router.get("/", userController.getProfile);

export default router;