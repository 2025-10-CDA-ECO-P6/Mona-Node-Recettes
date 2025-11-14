import express from "express";
import {
  getIngredients,
} from "../controllers/ingredientsController.js";
import { getIngredientsbyid } from "../controllers/ingredientsController.js";

const router = express.Router();

router.get("/", getIngredients);
router.get("/:id", getIngredientsbyid);

export default router;
