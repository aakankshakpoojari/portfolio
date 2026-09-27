import { db, profile, education, experience, projects, skills, asc, desc, eq, type Education, type Experience, type Project, type Skill } from "@portfolio/db";

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
    bio: "I’m a Computer Science undergraduate with a strong foundation in DSA and full-stack development, experienced in building RESTful APIs, scalable applications, and database-driven systems. I work with Java, Python, JavaScript, React, Node.js, and PostgreSQL, and enjoy turning ideas into practical software through projects and internships.",
    location: "India",
    profileImageUrl: "",
    resumeUrl: null,
    email: "aakanksha@example.com",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export async function getEducation(): Promise<Education[]> {
  try {
    const records = await db
      .select()
      .from(education)
      .orderBy(asc(education.displayOrder), asc(education.startDate));
    if (records.length > 0) {
      return records;
    }
  } catch (error) {
    console.error("Error fetching education from database:", error);
  }

  // Fallback defaults
  return [
    {
      id: "edu-1",
      institution: "Canara Engineering College",
      degree: "B.E. in Computer Science and Engineering",
      field: "CGPA: 8.8 / 10",
      description: "Deep foundation in Data Structures, Algorithms, Object-Oriented Programming, Database Management Systems, Computer Networks, and Full Stack Web Architecture. Active developer in collegiate tech fests and hackathons.",
      startDate: "2022",
      endDate: "2026",
      displayOrder: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "edu-2",
      institution: "Canara Pre-University College",
      degree: "Pre-University (PCMC)",
      field: "Distinction",
      description: "Focused on Physics, Chemistry, Mathematics, and Computer Science with excellence in core mathematical and computational logic.",
      startDate: "2020",
      endDate: "2022",
      displayOrder: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "edu-3",
      institution: "Canara High School",
      degree: "Secondary School Leaving Certificate (SSLC)",
      field: "Top Achiever",
      description: "Graduated with outstanding academic distinction. Participated in mathematics competitions, science exhibitions, and computer science clubs.",
      startDate: "2019",
      endDate: "2020",
      displayOrder: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
}

export async function getExperience(): Promise<Experience[]> {
  try {
    const records = await db
      .select()
      .from(experience)
      .orderBy(asc(experience.displayOrder), asc(experience.startDate));
    if (records.length > 0) {
      return records;
    }
  } catch (error) {
    console.error("Error fetching experience from database:", error);
  }

  // Fallback defaults matching Inspirante & AlgoOrbit
  return [
    {
      id: "exp-1",
      company: "Inspirante Technologies",
      role: "Full Stack Developer Intern",
      description: "Architected and delivered end-to-end web modules with React, Next.js, and Node.js. Built robust REST APIs, integrated PostgreSQL database schemas, and optimized database queries for responsiveness and low latency.",
      startDate: "2024",
      endDate: "Present",
      isCurrent: true,
      location: "Mangalore, India",
      displayOrder: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "exp-2",
      company: "AlgoOrbit",
      role: "Software Engineer Intern",
      description: "Engineered scalable backend services and responsive frontend user interfaces. Implemented data structures and algorithmic workflows, integrated third-party APIs, and participated in agile team sprints and code reviews.",
      startDate: "2023",
      endDate: "2024",
      isCurrent: false,
      location: "Remote",
      displayOrder: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
}

export async function getProjects(): Promise<Project[]> {
  try {
    const records = await db
      .select()
      .from(projects)
      .orderBy(asc(projects.displayOrder), desc(projects.createdAt));
    if (records.length > 0) {
      return records;
    }
  } catch (error) {
    console.error("Error fetching projects from database:", error);
  }

  // Fallback defaults
  return [
    {
      id: "proj-1",
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
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "proj-2",
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
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "proj-3",
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
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "proj-4",
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
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    // First check db
    const records = await db
      .select()
      .from(projects)
      .where(eq(projects.slug, slug))
      .limit(1);
    if (records.length > 0) {
      return records[0];
    }
  } catch (error) {
    console.error("Error fetching project by slug:", error);
  }

  // Fallback defaults
  const defaults = await getProjects();
  return defaults.find((p) => p.slug === slug) || null;
}

export async function getSkills(): Promise<Skill[]> {
  try {
    const records = await db
      .select()
      .from(skills)
      .orderBy(asc(skills.displayOrder));
    if (records.length > 0) {
      return records;
    }
  } catch (error) {
    console.error("Error fetching skills from database:", error);
  }

  // Fallback
  return [];
}
