import jwt from "jsonwebtoken";

// next = passer à la suite
export function auth(req, res, next) {
  const headerAuth = req.headers["authorization"]; 

 // console.log("HEADER AUTH:", headerAuth); // DEBUUUG

  if (!headerAuth || !headerAuth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Non autorisé (token manquant)" });
  }

  // séparer partie "Bearer" et le token
  const token = headerAuth.split(" ")[1];

  // Verifier le token 
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Erreur JWT:", err);
      return res.status(401).json({ message: "Token invalide" });
    }
    req.user = decoded;
    next();
  });
}
