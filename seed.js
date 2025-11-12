import { openDb } from "./db/database.js";

async function seed() {
  const db = await openDb();

  console.log("Insertion de données de test...");

  await db.run(`
    INSERT INTO users (nom, email, mdp)
    VALUES
      ('Alice Dupont', 'alice@example.com', 'password123'),
      ('Bob Martin', 'bob@example.com', 'azerty123');
  `);

  await db.run(`
    INSERT INTO recettes (titre, temps_preparation, difficulte, budget, description)
    VALUES
      ('Soupe de potiron', 45, 2, 1, 'Une soupe douce et parfumée.'),
      ('Pâtes au pesto', 20, 1, 1, 'Un plat italien classique et rapide.'),
      ('Curry de poulet', 60, 3, 2, 'Un curry onctueux aux épices douces.');
  `);

  console.log("chargement seed");
}

seed();
