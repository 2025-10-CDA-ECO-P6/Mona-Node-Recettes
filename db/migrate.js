import {openDb} from "../db/database.js";

export async function migrate() {
  const db = await openDb();
    await db.exec(`ALTER TABLE recettes ADD COLUMN ingredients TEXT;`);
    console.log("ingredient add bdd");
}

migrate().catch((err) => console.error(err));