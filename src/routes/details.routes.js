import { Router } from "express";
import {
    getDetails,
    getDetail,
    deleteDetail,
    createDetail,
    updateDetails,
    addStock,
    getStockHistory
} from "../controllers/details.controller.js";

const router = Router();

// GET all
router.get("/details", getDetails);

// GET one by id
router.get("/detail/:id", getDetail);

// DELETE by id
router.delete("/detail/:id", deleteDetail);

// INSERT 
router.post("/detail", createDetail);

// EDIT by id
router.patch("/detail/:id", updateDetails);

// Nueva ruta para añadir stock
router.patch("/details/:id/addstock" , addStock); 

// Nueva ruta para obtener el historial de stock
router.get("/stockhistory", getStockHistory); 


export default router;
