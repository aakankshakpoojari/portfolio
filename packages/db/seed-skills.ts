import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./src/schema/index";
import { skills } from "./src/schema/index";
import { config } from "dotenv";

config(); // Load environment variables

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

const client = postgres(connectionString, { max: 1 });
const db = drizzle(client, { schema });

async function seedSkills() {
  console.log("Seeding skills...");
  await db.delete(skills);

  await db.insert(skills).values([
    // --- Languages ---
    { name: "Java", category: "Languages", displayOrder: 1 },
    { name: "Python", category: "Languages", displayOrder: 2 },
    { name: "C++", category: "Languages", displayOrder: 3 },
    { name: "C", category: "Languages", displayOrder: 4 },
    { name: "JavaScript", category: "Languages", displayOrder: 5 },

    // --- Frontend ---
    { name: "React", category: "Frontend", displayOrder: 6 },
    { name: "HTML", category: "Frontend", displayOrder: 7 },
    { name: "CSS", category: "Frontend", displayOrder: 8 },

    // --- Backend ---
    { name: "Node.js", category: "Backend", displayOrder: 9 },
    { name: "Express.js", category: "Backend", displayOrder: 10 },
    { name: "MERN", category: "Backend", displayOrder: 11 },
    { name: "REST APIs", category: "Backend", displayOrder: 12 },

    // --- Databases ---
    { name: "MongoDB", category: "Databases", displayOrder: 13 },
    { name: "PostgreSQL", category: "Databases", displayOrder: 14 },
    { name: "SQL", category: "Databases", displayOrder: 15 },
    { name: "Firebase", category: "Databases", displayOrder: 16 },
    { name: "Supabase", category: "Databases", displayOrder: 17 },

    // --- Tools ---
    { name: "Git", category: "Tools", displayOrder: 18 },
    { name: "GitHub", category: "Tools", displayOrder: 19 },
    { name: "Linux", category: "Tools", displayOrder: 20 },

    // --- Core Concepts ---
    { name: "OOP", category: "Core Concepts", displayOrder: 21 },
    { name: "System Design", category: "Core Concepts", displayOrder: 22 },
  ]);

  console.log("Skills seeded successfully.");
  await client.end();
}

seedSkills().catch((err) => {
  console.error("Error seeding skills:", err);
  process.exit(1);
});
