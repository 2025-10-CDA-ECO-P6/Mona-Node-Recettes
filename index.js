import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { openDb } from "./db/database.js";
import recettesRoutes from "./routes/recettesRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();
const PORT = 1337;

app.use(express.json());
app.use(cookieParser());

// Routes publiques
app.use("/auth", authRoutes);
app.use("/api/recettes", recettesRoutes);

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
      description TEXT,
      ingredients TEXT
    );
  `);

  app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
  });
});
