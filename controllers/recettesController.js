import { openDb } from "../db/database.js";

export async function getRecettes(req, res) {
  const db = await openDb();
  const recettes = await db.all("SELECT * FROM recettes");
  res.json(recettes);
}

export async function getRecetteById(req, res) {
  const { id } = req.params;
  const db = await openDb();
  const recette = await db.get("SELECT * FROM recettes WHERE id = ?", [id]);
  if (!recette) {
    return res.status(404).json({ message: "Recette non trouvée" });
  }
  res.json(recette);
}

export async function createRecette(req, res) {
  const { titre, temps_preparation, difficulte, budget, description } = req.body;

  if (!titre) {
    return res.status(400).json({ message: "Le champ 'titre' est obligatoire" });
  }

  const db = await openDb();
  const result = await db.run(
    "INSERT INTO recettes (titre, temps_preparation, difficulte, budget, description, ingredients) VALUES (?, ?, ?, ?, ?, ?)",
    [titre, temps_preparation, difficulte, budget, description]
  );

  res.status(201).json({ id: result.lastID, titre, temps_preparation, difficulte, budget, description });
}

export async function updateRecette(req, res) {
  const { id } = req.params;
  const { titre, temps_preparation, difficulte, budget, description } = req.body;
  const db = await openDb();

  const result = await db.run(
    "UPDATE recettes SET titre = ?, temps_preparation = ?, difficulte = ?, budget = ?, description = ? WHERE id = ?",
    [titre, temps_preparation, difficulte, budget, description, id]
  );

  if (result.changes === 0) {
    return res.status(404).json({ message: "Recette non trouvée" });
  }

  res.json({ message: "Recette mise à jour avec succès" });
}

export async function deleteRecette(req, res) {
  const { id } = req.params;
  const db = await openDb();

  const result = await db.run("DELETE FROM recettes WHERE id = ?", [id]);

  if (result.changes === 0) {
    return res.status(404).json({ message: "Recette non trouvée" });
  }

  res.json({ message: "Recette supprimée avec succès" });
}
