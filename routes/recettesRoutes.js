import express from "express";
import {
  getRecettes,
  getRecetteById,
  createRecette,
  updateRecette,
  deleteRecette,
} from "../controllers/recettesController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();


router.get("/", getRecettes);
router.get("/:id", getRecetteById);


router.post("/", auth, createRecette);
router.put("/:id", auth, updateRecette);
router.delete("/:id", auth, deleteRecette);

export default router;
