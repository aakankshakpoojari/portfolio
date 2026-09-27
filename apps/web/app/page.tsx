import { getProfile, getEducation, getExperience, getProjects } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { LoadingScreen } from "@/components/LoadingScreen";
import { SideCreepers } from "@/components/SideCreepers";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";

export const revalidate = 0; // Dynamic rendering for live updates

export default async function HomePage() {
  const [profile, educationList, experienceList, projects] = await Promise.all([
    getProfile(),
    getEducation(),
    getExperience(),
    getProjects(),
  ]);

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
    <>
      {/* Interactive Loading Screen */}
      <LoadingScreen />

      {/* Hanging Side Creepers on Left & Right screen edges */}
      <SideCreepers />

      <main className="min-h-screen w-full bg-striped-pattern flex flex-col justify-between relative selection:bg-[#021a0d] selection:text-[#dcfce7] overflow-x-hidden scroll-smooth">
        {/* Top Navbar */}
        <Navbar name="Aak" role={role} />

        {/* Main Hero Section */}
        <Hero profileData={profile} />

        {/* About Section with Expandable Views and Detail Cards */}
        <AboutSection
          name={profile.name || "Aakanksha"}
          profileImageUrl={profile.profileImageUrl}
          resumeUrl={profile.resumeUrl}
          educationList={educationList}
          experienceList={experienceList}
        />

        {/* Projects Section */}
        <ProjectsSection projects={projects} />

        {/* Skills Section */}
        <SkillsSection />

        {/* Footer */}
        <footer className="w-full max-w-7xl mx-auto px-6 py-8 text-center text-xs text-[#2a6842] font-medium z-10 border-t border-[#032306]/10 mt-12">
          © {new Date().getFullYear()} {profile.name || "Aakanksha K Poojari"}
        </footer>
      </main>
    </>
  );
}
