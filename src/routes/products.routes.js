import { Router } from "express";
import {
    createProduct,
    deleteProduct,
    getProduct, getProducts, updateProduct
} from "../controllers/products.controller.js";


const router = Router();

// GET all
router.get("/products", getProducts);

// GET one by id
router.get("/products/:id", getProduct);

// DELETE by id
router.delete("/products/:id", deleteProduct);

// INSERT by id
router.post("/products", createProduct);

// EDIT by id
router.patch("/products/:id", updateProduct);

export default router;
