import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { openDb } from "../db/database.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { nom, email, password } = req.body;

  if (!nom || !email || !password) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  const db = await openDb();

  // Vérifie si l'email existe déjà
  const existingUser = await db.get("SELECT * FROM users WHERE email = ?", [email]);
  if (existingUser) {
    return res.status(400).json({ message: "Email déjà utilisé" });
  }

  // Hash du MDP
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insertion du user
  await db.run(
    "INSERT INTO users (nom, email, mdp) VALUES (?, ?, ?)",
    [nom, email, hashedPassword]
  );

  return res.status(201).json({ message: "Utilisateur créé avec succès" });
});


// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const db = await openDb();
  const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);

  if (!user) {
    return res.status(401).json({ message: "Identifiants invalides" });
  }

  const isMatch = await bcrypt.compare(password, user.mdp);

  if (!isMatch) {
    return res.status(401).json({ message: "Identifiants invalides" });
  }

  // Token JWT
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ message: "Connexion réussie", token });
});

// LOGOUT
router.get("/logout", (req, res) => {
  res.json({ message: "Déconnecté avec succès" });
});

export default router;
