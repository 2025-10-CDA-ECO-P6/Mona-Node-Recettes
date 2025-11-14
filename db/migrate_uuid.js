import { openDb } from "./database.js"; 
import { v4 as uuidv4 } from "uuid";

async function migrate() {
  const db = await openDb();

  console.log("Migration : ajout de la colonne documentId...");

  await db.run(`
    ALTER TABLE recettes
    ADD COLUMN documentId TEXT;
  `).catch(() => {});

  const recettes = await db.all("SELECT id FROM recettes WHERE documentId IS NULL");

  for (const r of recettes) {
    await db.run(
      "UPDATE recettes SET documentId = ? WHERE id = ?",
      [uuidv4(), r.id]
    );
  }

  console.log("Migration terminée.");
}

migrate();
