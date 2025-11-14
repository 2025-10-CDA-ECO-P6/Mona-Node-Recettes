import { openDb } from "../db/database.js";
import { v4 as uuidv4 } from "uuid";

export async function getRecettes(req, res) {
  const db = await openDb();
  const recettes = await db.all("SELECT * FROM recettes");
  res.json(recettes);
}

export async function getRecetteByDocumentId(req, res) {
  const { documentId } = req.params;
  const db = await openDb();
  const recette = await db.get("SELECT * FROM recettes WHERE documentId = ?", [documentId]);
  if (!recette) {
    return res.status(404).json({ message: "Recette non trouvée" });
  }
  res.json(recette);
}

export async function createRecette(req, res) {
  const { titre, temps_preparation, difficulte, budget, description, ingredients } = req.body;

  if (!titre) {
    return res.status(400).json({ message: "Le champ 'titre' est obligatoire" });
  }

  const documentId = uuidv4(); 

  const db = await openDb();

  await db.run(
    `INSERT INTO recettes (documentId, titre, temps_preparation, difficulte, budget, description, ingredients)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      documentId,
      titre,
      temps_preparation,
      difficulte,
      budget,
      description,
      ingredients
    ]
  );

  return res.status(201).json({
    data: {
      documentId,
      titre,
      temps_preparation,
      difficulte,
      budget,
      description,
      ingredients
    }
  });
}

export async function updateRecette(req, res) {
  const { id } = req.params;
  const { titre, temps_preparation, difficulte, budget, description , ingredients } = req.body;
  const db = await openDb();

  const result = await db.run(
    "UPDATE recettes SET titre = ?, temps_preparation = ?, difficulte = ?, budget = ?, description = ?, ingredients = ? WHERE id = ?",
    [titre, temps_preparation, difficulte, budget, description, ingredients, id]
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
