import {Router} from "express";
import imgController from "../controllers/img.controller";

const router = Router();

router.get("/:fileName", imgController.getImg);

export default router;