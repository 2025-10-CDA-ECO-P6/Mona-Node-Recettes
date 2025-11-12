import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  
  if (password === "toto") {
    const jwtToken = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "Authentification réussie",
      token: jwtToken,
    });
  } else {
    res.status(401).json({ message: "Authentification échouée" });
  }
});

router.get("/logout", (req, res) => {
  res.json({ message: "Déconnecté avec succès" });
});

export default router;
