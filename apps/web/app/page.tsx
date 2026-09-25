import { getProfile } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";

export const revalidate = 0; // Dynamic rendering for live updates

export default async function HomePage() {
  const profile = await getProfile();

  // Smart role detection: concise role in navbar
  const isLongTagline = (text?: string | null) =>
    (text && text.length > 25) || text?.includes("\n") || text?.toLowerCase().includes("frontend");

  const role =
    profile.bio && !isLongTagline(profile.bio)
      ? profile.bio
      : profile.headline && !isLongTagline(profile.headline)
      ? profile.headline
      : "Full Stack Developer";

  return (
    <main className="min-h-screen w-full bg-striped-pattern flex flex-col justify-between selection:bg-slate-900 selection:text-white">
      {/* Top Navbar */}
      <Navbar name="Aak" role={role} />

      {/* Main Hero Section */}
      <Hero profileData={profile} />

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 text-center text-xs text-slate-400 font-medium">
        © {new Date().getFullYear()} {profile.name || "Aakanksha K Poojari"}
      </footer>
    </main>
  );
}
