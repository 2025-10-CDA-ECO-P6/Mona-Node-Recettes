import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { openDb } from "./db/database.js";
import recettesRoutes from "./routes/recettesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import ingredientsRoutes from "./routes/ingredientsRoutes.js";

dotenv.config();
const app = express();
const PORT = 1337;

app.use(express.json());
app.use(cookieParser());

// Routes publiques
app.use("/auth", authRoutes);
app.use("/api/recettes", recettesRoutes);
app.use("/api/ingredients", ingredientsRoutes);

app.get("/", (req, res) => {
  res.send("OK");
});

// Initialisation SQLite
openDb().then(async (db) => {
  console.log("Base SQLite ouverte.");

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      mdp TEXT NOT NULL
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS recettes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      documentId TEXT UNIQUE NOT NULL,
      titre TEXT NOT NULL,
      temps_preparation INTEGER,
      difficulte INTEGER,
      budget INTEGER,
      description TEXT
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS ingredients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom_ingredient TEXT UNIQUE NOT NULL
    );
  `);


  await db.exec(`
  CREATE TABLE IF NOT EXISTS recette_ingredients (
    recette_id INTEGER NOT NULL,
    ingredient_id INTEGER NOT NULL,
    PRIMARY KEY (recette_id, ingredient_id),
    FOREIGN KEY (recette_id) REFERENCES recettes(id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE CASCADE
  );
  `);

  
  app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
  });
});
