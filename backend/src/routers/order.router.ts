import {Router} from "express";
import orderController from "../controllers/order.controller";

const router = Router();

router.get("/get", orderController.getUserOrders);
router.post("/add", orderController.addOrder);

export default router;