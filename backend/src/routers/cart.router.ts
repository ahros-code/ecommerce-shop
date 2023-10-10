import {Router} from "express";
import cartController from "../controllers/cart.controller";

const router = Router();

router.get("/get", cartController.getUserCart);
router.delete("/:id", cartController.deleteItemFromCart);
router.post("/add", cartController.addToCart);

export default router;