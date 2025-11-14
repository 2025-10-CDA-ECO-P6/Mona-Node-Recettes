import { openDb } from "../db/database.js";

export async function getIngredients(req, res) {
  const db = await openDb();
  const ingredients = await db.all("SELECT * FROM ingredients");
  res.json({ data: ingredients });
}


export async function getIngredientsbyid(req, res) {
  const db = await openDb();
  const { id } = req.params; 
  const ingredients = await db.get("SELECT * FROM ingredients WHERE id = ?", [id]);

    if (!ingredients) {
        return res.status(404).json({message : "pas d'ingrédients"})
    }
  res.json({ data: ingredients });
}
