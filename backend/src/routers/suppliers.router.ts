import {Router} from "express";
import suppliersController from "../controllers/suppliers.controller";

const router = Router()

router.get("/all", suppliersController.getAllSuppliers)

export default router;