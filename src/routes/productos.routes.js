import { Router } from "express";
import {
    createProducto,
    deleteProducto,
    getProducto, getProductos, updateProducto
} from "../controllers/productos.controller.js";


const router = Router();

// GET all
router.get("/productos", getProductos);

// GET one by id
router.get("/productos/:id", getProducto);

// DELETE by id
router.delete("/productos/:id", deleteProducto);

// INSERT by id
router.post("/productos", createProducto);

// EDIT by id
router.patch("/productos/:id", updateProducto);

export default router;
