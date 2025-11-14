import express from "express";
import {
  getRecettes,
  getRecetteByDocumentId,
  createRecette,
  updateRecette,
  deleteRecette,
} from "../controllers/recettesController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();


router.get("/", getRecettes);
router.get("/:documentId", getRecetteByDocumentId);


router.post("/", auth, createRecette);
router.put("/:id", auth, updateRecette);
router.delete("/:id", auth, deleteRecette);

export default router;
