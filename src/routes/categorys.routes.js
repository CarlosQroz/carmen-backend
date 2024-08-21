import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/categories.controller.js";

const router = Router();

// GET all 
router.get("/categories", getCategories);

// GET An 
router.get("/category/:id", getCategory);

// DELETE An 
router.delete("/category/:id", deleteCategory);

// INSERT An 
router.post("/category", createCategory);

router.patch("/category/:id", updateCategory);

export default router;
