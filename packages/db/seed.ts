import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./src/schema/index";
import { projects } from "./src/schema/index";
import { config } from "dotenv";

config(); // Load environment variables

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

const client = postgres(connectionString, { max: 1 });
const db = drizzle(client, { schema });

async function seed() {
  console.log("Seeding projects...");
  await db.delete(projects); // Clear existing
  
  await db.insert(projects).values([
    {
      title: "PowerXchange",
      slug: "powerxchange",
      shortDescription: "Full-Stack Development, Web Application, Student Marketplace",
      description: "A comprehensive student marketplace web application that allows students to exchange goods and services efficiently on campus.",
      imageUrl: "/powerxchange.png",
      githubUrl: "https://github.com/aakankshakpoojari",
      liveUrl: null,
      scope: "Full-Stack Development · Web Application · Student Marketplace",
      contributors: "Aakanksha K Poojari, Atharva Joshi, Atmika Nayak",
      year: 2026,
      featured: true,
      displayOrder: 1,
    },
    {
      title: "Unnathi",
      slug: "unnathi",
      shortDescription: "Full-Stack Development, Financial Literacy, Women-Centric Platform",
      description: "A women-centric financial literacy platform aimed at providing resources, tools, and a community for women to manage and grow their wealth.",
      imageUrl: "/unnathi.png",
      githubUrl: "https://github.com/aakankshakpoojari",
      liveUrl: null,
      scope: "Full-Stack Development · Financial Literacy · Women-Centric Platform",
      contributors: "Aakanksha K Poojari, Atmika Nayak, Shreya G Amin, Ishta P Jain",
      year: 2026,
      featured: true,
      displayOrder: 2,
    },
    {
      title: "PublicEye",
      slug: "publiceye",
      shortDescription: "Full-Stack Development, Civic Technology, Issue Management",
      description: "A civic technology platform designed to streamline issue management between citizens and local authorities, fostering better community engagement.",
      imageUrl: "/publiceye.png",
      githubUrl: "https://github.com/aakankshakpoojari",
      liveUrl: null,
      scope: "Full-Stack Development · Civic Technology · Issue Management",
      contributors: "Aakanksha K Poojari, Atharva Joshi, Atmika Nayak, Adithya Karkera",
      year: 2026,
      featured: true,
      displayOrder: 3,
    },
    {
      title: "W3HIRE",
      slug: "w3hire",
      shortDescription: "Web3, Full-Stack Development, Decentralized Freelancing",
      description: "A decentralized freelancing platform built on Web3 technologies, ensuring secure, transparent, and fee-minimized transactions between clients and freelancers.",
      imageUrl: "/w3hire.png",
      githubUrl: "https://github.com/aakankshakpoojari",
      liveUrl: null,
      scope: "Web3 · Full-Stack Development · Decentralized Freelancing",
      contributors: "Atharva Joshi, Aditya Kumar Jha, Aakanksha K Poojari, Atmika Nayak, Adithya Karkera",
      year: 2026,
      featured: true,
      displayOrder: 4,
    }
  ]);

  console.log("Projects seeded successfully.");
  await client.end();
}

seed().catch((err) => {
  console.error("Error seeding projects:", err);
  process.exit(1);
});
