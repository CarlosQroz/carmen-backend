import { Router } from "express";

import {
    createVariante_Producto,
    deleteVariante_Producto,
    getVariantes_Producto,
    getVariantes_Productos,
    updateVariantes_Producto
} from "../controllers/variantes_producto.controller.js"


const router = Router();


// GET all
router.get("/variantes", getVariantes_Productos);

// GET one by id
router.get("/variantes/:id", getVariantes_Producto);

// DELETE by id
router.delete("/variantes/:id", deleteVariante_Producto);

// INSERT by id
router.post("/variantes", createVariante_Producto);

// EDIT by id
router.patch("/variantes/:id", updateVariantes_Producto);

export default router;
