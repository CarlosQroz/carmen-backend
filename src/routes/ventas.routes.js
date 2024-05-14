import { Router } from "express";

import { 
    createVenta,
    getVenta,
    getVentas,
    deleteVenta,
    updateVenta
 } from "../controllers/ventas.controller.js";

 const router = Router();

 

// GET all
router.get("/ventas", getVentas);

// GET one by id
router.get("/ventas/:id", getVenta);

// DELETE by id
router.delete("/ventas/:id", deleteVenta);

// INSERT by id
router.post("/ventas", createVenta);

// EDIT by id
router.patch("/ventas/:id", updateVenta);

export default router;
