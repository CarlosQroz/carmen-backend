import { Router } from "express";

import { 
    getStocks,
    getStock,
    createStock,
    deleteStock,
    updateStock
 } from "../controllers/stocks.controller.js";


 const router = Router();

// GET all
router.get("/stocks", getStocks);

// GET one by id
router.get("/stocks/:id", getStock);

// DELETE by id
router.delete("/stocks/:id", deleteStock);

// INSERT by id
router.post("/stocks", createStock);

// EDIT by id
router.patch("/stocks/:id", updateStock);

export default router;