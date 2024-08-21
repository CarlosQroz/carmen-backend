import { Router } from "express";
import {
  getObjects,
  getObject,
  deleteObject,
  updateObject,
  createObject,
} from "../controllers/objects.controller.js";

const router = Router();

// GET all 
router.get("/objects", getObjects);

// GET one
router.get("/object/:id", getObject);

// DELETE one
router.delete("/object/:id", deleteObject);

// INSERT one
router.post("/object", createObject);

//update one
router.patch("/object/:id", updateObject);

export default router;
