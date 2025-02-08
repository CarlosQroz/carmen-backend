import { Router } from "express";
import multer from "multer";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/categories.controller.js";

const router = Router();

// Configuración de multer para guardar imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });


// GET all categories
router.get("/categories", getCategories);

// GET a category by ID
router.get("/category/:id", getCategory);

// DELETE a category
router.delete("/category/:id", deleteCategory);

// INSERT a new category with image
router.post("/category", upload.single("image"), createCategory);

// UPDATE a category
router.patch("/category/:id", updateCategory);

export default router;
