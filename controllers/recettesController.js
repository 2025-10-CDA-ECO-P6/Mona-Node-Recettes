import { openDb } from "../db/database.js";
import { v4 as uuidv4 } from "uuid";

export async function getRecettes(req, res) {
  const db = await openDb();
  
  const recettes = await db.all("SELECT * FROM recettes");
  res.json({data: recettes});
}

export async function getRecetteByDocumentId(req, res) {
  const { documentId } = req.params;
  const db = await openDb();
  const recette = await db.get("SELECT * FROM recettes WHERE documentId = ?", [documentId]);
  if (!recette) {
    return res.status(404).json({ message: "Recette non trouvée" });
  }
  res.json({data: recette});
}

export async function createRecette(req, res) {
  const { titre, temps_preparation, difficulte, budget, description } = req.body.data;

  if (!titre) {
    return res.status(400).json({ message: "Le champ 'titre' est obligatoire" });
  }

  const documentId = uuidv4(); 

  const db = await openDb();

  await db.run(
    `INSERT INTO recettes (documentId, titre, temps_preparation, difficulte, budget, description)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      documentId,
      titre,
      temps_preparation,
      difficulte,
      budget,
      description,
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
    }
  });
}

export async function updateRecette(req, res) {
  const { documentId } = req.params;
  const payload = req.body.data || req.body;

  const db = await openDb();

  // attraper recette actuelle
  const existing = await db.get(
    "SELECT * FROM recettes WHERE documentId = ?",
    [documentId]
  );

  if (!existing) {
    return res.status(404).json({ message: "Recette non trouvée" });
  }

  const updated = {
    titre: payload.titre ?? existing.titre,
    temps_preparation: payload.temps_preparation ?? existing.temps_preparation,
    difficulte: payload.difficulte ?? existing.difficulte,
    budget: payload.budget ?? existing.budget,
    description: payload.description ?? existing.description,
  };

  const result = await db.run(
    `UPDATE recettes
     SET titre = ?, temps_preparation = ?, difficulte = ?, budget = ?, description = ?
     WHERE documentId = ?`,
    [
      updated.titre,
      updated.temps_preparation,
      updated.difficulte,
      updated.budget,
      updated.description,
      documentId
    ]
  );

  res.json({ message: "Recette mise à jour avec succès" });
}

export async function deleteRecette(req, res) {
  const { documentId } = req.params;
  const db = await openDb();

  const result = await db.run("DELETE FROM recettes WHERE documentId = ?", [documentId]);

  if (result.changes === 0) {
    return res.status(404).json({ message: "Recette non trouvée" });
  }

  res.json({ message: "Recette supprimée avec succès" });
}
