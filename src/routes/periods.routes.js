import { Router } from "express"
import { 
    createPeriod, 
    deletePeriod,
    getPeriod,
    getPeriods,
    updatePeriod,
} from "../controllers/periods.controller.js"

const router = Router();

router.get("/periods", getPeriods);

router.get("/periods/:id", getPeriod);

router.delete("/periods/:id", deletePeriod);

router.post("/periods", createPeriod);

router.patch("/periods/:id", updatePeriod);

export default router;