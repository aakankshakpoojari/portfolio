import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug, getProfile } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { SideCreepers } from "@/components/SideCreepers";

export const revalidate = 0;

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const [project, profile] = await Promise.all([
    getProjectBySlug(slug),
    getProfile(),
  ]);

  if (!project) {
    notFound();
  }

  // Same smart role detection as home page for the navbar
  const isLongTagline = (text?: string | null) =>
    (text && text.length > 25) || text?.includes("\n") || text?.toLowerCase().includes("frontend");

  const role =
    profile.bio && !isLongTagline(profile.bio)
      ? profile.bio
      : profile.headline && !isLongTagline(profile.headline)
      ? profile.headline
      : "Full Stack Developer";

  const ImageComponent = (
    <div className="relative w-full aspect-video md:aspect-[21/9] bg-[#e5f1e8]/10 cursor-pointer group">
      <Image
        src={project.imageUrl || "/myimage.jpeg"}
        alt={project.title}
        fill
        unoptimized
        className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
      />
      {project.liveUrl && (
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 text-white font-mono tracking-widest text-sm bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm transition-all transform translate-y-4 group-hover:translate-y-0">
            VIEW LIVE SITE ↗
          </span>
        </div>
      )}
    </div>
  );

  return (
    <>
      <SideCreepers />
      <div className="min-h-screen w-full bg-[#f4f4f0] text-[#032306] font-sans selection:bg-[#032306] selection:text-[#f4f4f0] overflow-x-hidden scroll-smooth flex flex-col relative z-20">
        {/* Light theme navbar specifically for this page */}
        <div className="border-b border-[#032306]/10">
        <Navbar name={profile.name || "Aakanksha"} role={role} />
      </div>

      <main className="flex-grow pt-24 pb-32">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
          {/* Header text */}
          <div className="mb-16 md:mb-24">
            <h1 className="text-6xl sm:text-7xl md:text-[120px] font-extrabold tracking-tight leading-none mb-4 md:mb-8 text-[#021a0d]">
              {project.title}
            </h1>
            <p className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#032306]/50 max-w-5xl leading-[1.1]">
              {project.shortDescription || project.description}
            </p>
          </div>
        </div>

        {/* Full width image */}
        <div className="w-full mb-16 md:mb-32">
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="block w-full">
              {ImageComponent}
            </a>
          ) : (
            ImageComponent
          )}
        </div>

        {/* Details section */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
            {/* Left: About */}
            <div className="md:col-span-7">
              <h3 className="text-xs sm:text-sm font-mono tracking-widest uppercase mb-6 font-bold flex items-center">
                <span className="mr-2">/</span> ABOUT THE PROJECT
              </h3>
              <div className="text-xl sm:text-2xl md:text-3xl font-medium leading-snug text-[#021a0d]">
                {project.description}
              </div>
            </div>

            {/* Right: Meta Details */}
            <div className="md:col-span-5 flex flex-col space-y-12">
              {project.scope && (
                <div>
                  <h3 className="text-xs sm:text-sm font-mono tracking-widest uppercase mb-4 font-bold flex items-center">
                    <span className="mr-2">/</span> SCOPE
                  </h3>
                  <p className="text-lg sm:text-xl font-medium">{project.scope}</p>
                </div>
              )}
              
              {project.contributors && (
                <div>
                  <h3 className="text-xs sm:text-sm font-mono tracking-widest uppercase mb-4 font-bold flex items-center">
                    <span className="mr-2">/</span> CREDITS
                  </h3>
                  <p className="text-lg sm:text-xl font-medium">{project.contributors}</p>
                </div>
              )}

              {project.githubUrl && (
                <div>
                  <h3 className="text-xs sm:text-sm font-mono tracking-widest uppercase mb-4 font-bold flex items-center">
                    <span className="mr-2">/</span> SOURCE
                  </h3>
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lg sm:text-xl font-medium hover:underline underline-offset-4"
                  >
                    GitHub Repository ↗
                  </a>
                </div>
              )}

              {project.year && (
                <div>
                  <h3 className="text-xs sm:text-sm font-mono tracking-widest uppercase mb-4 font-bold flex items-center">
                    <span className="mr-2">/</span> YEAR
                  </h3>
                  <p className="text-lg sm:text-xl font-medium">{project.year}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

        <footer className="w-full px-6 py-8 text-center text-xs text-[#032306]/40 font-medium border-t border-[#032306]/10 mt-auto">
          <Link href="/" className="hover:text-[#032306] transition-colors underline underline-offset-4">
            BACK TO HOME
          </Link>
        </footer>
      </div>
    </>
  );
}
