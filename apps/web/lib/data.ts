import { db, profile } from "@portfolio/db";

export async function getProfile() {
  try {
    const records = await db.select().from(profile).limit(1);
    if (records.length > 0) {
      return records[0];
    }
  } catch (error) {
    console.error("Error fetching profile from database:", error);
  }

  // Fallback default in case DB is warming up or empty
  return {
    id: "default",
    name: "Aakanksha K Poojari",
    headline: "Building the frontend you see\nand the backend you don't.",
    bio: "Full stack developer",
    location: "India",
    profileImageUrl: "",
    resumeUrl: null,
    email: "aakanksha@example.com",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
