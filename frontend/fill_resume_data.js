const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Clearing existing data...");
  await prisma.skill.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.education.deleteMany();
  await prisma.project.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.achievement.deleteMany();

  console.log("Inserting Vivek's Resume Data...");

  // SKILLS
  const skillsData = [
    { name: "PHP", category: "Languages" },
    { name: "Python", category: "Languages" },
    { name: "C / C++", category: "Languages" },
    { name: "JavaScript", category: "Languages" },
    { name: "CodeIgniter", category: "Frameworks" },
    { name: "Laravel", category: "Frameworks" },
    { name: "Django", category: "Frameworks" },
    { name: "React JS", category: "Frameworks" },
    { name: "Bootstrap", category: "Frameworks" },
    { name: "PostgreSQL", category: "Databases" },
    { name: "MySQL", category: "Databases" },
    { name: "SQLite", category: "Databases" },
    { name: "HTML5 & CSS3", category: "Web Tech" },
    { name: "AJAX", category: "Web Tech" },
    { name: "Git & Postman", category: "Tools" },
    { name: "REST API Development", category: "Expertise" },
    { name: "MVC Architecture", category: "Expertise" }
  ];
  await prisma.skill.createMany({ data: skillsData });

  // EXPERIENCE
  await prisma.experience.create({
    data: {
      company: "Maulana Azad National Institute of Technology (MANIT)",
      role: "Developer",
      dateRange: "Jul 2023 - Present",
      description: "Architected MANIT Web Service (ERP) for 5,000+ users. Engineered dynamic Time Table Management Module using PHP & PostgreSQL. Designed Convocation Portal serving 1,000+ students. Improved system uptime with query optimization."
    }
  });

  await prisma.experience.create({
    data: {
      company: "Presently Solutions Pvt. Ltd.",
      role: "Frontend Developer & PHP Developer",
      dateRange: "Jan 2022 - Jul 2022",
      description: "Spearheaded user-friendly web applications. Collaborated with cross-functional teams for feature development. Ensured scalability, responsiveness, and performance. Implemented security measures."
    }
  });

  await prisma.experience.create({
    data: {
      company: "Freelance",
      role: "Web Developer / Consultant",
      dateRange: "Oct 2022 - Present",
      description: "Optimized and launched 6+ static websites with 10K monthly visitors. Developed an enterprise-level Inventory Management System using Laravel with AI-based demand forecasting. Created Resume Builder using React and Node.js."
    }
  });

  // EDUCATION
  await prisma.education.create({
    data: {
      degree: "MCA (7.9 CGPA)",
      university: "Bansal Institute of Science and Technology, Bhopal",
      year: "2025"
    }
  });

  await prisma.education.create({
    data: {
      degree: "B.Sc. (Math, CS, Defence) - 73.21%",
      university: "Govt. Motilal Vigyan Mahavidyalaya, Bhopal",
      year: "2023"
    }
  });

  // PROJECTS
  await prisma.project.create({
    data: {
      title: "MWS - Educational ERP",
      description: "Devised Time Table Module for 5,000+ users and improved accuracy by 90%.",
      tags: "PHP,PostgreSQL,ERP",
      link: "",
      github: ""
    }
  });

  await prisma.project.create({
    data: {
      title: "Convocation Portal",
      description: "Digitized convocation for 1,000+ students with automated verification.",
      tags: "PHP,MySQL",
      link: "",
      github: ""
    }
  });

  await prisma.project.create({
    data: {
      title: "Inventory Management System",
      description: "Enterprise system using Laravel with AI-based demand forecasting. Provisioned predictive alerts reducing errors by 60%.",
      tags: "Laravel,AI",
      link: "",
      github: ""
    }
  });

  await prisma.project.create({
    data: {
      title: "Dynamic Resume Builder",
      description: "Enhanced a dynamic resume builder with real-time preview and automated PDF export functionality.",
      tags: "React,Node.js",
      link: "",
      github: ""
    }
  });

  // CERTIFICATIONS
  await prisma.certificate.create({
    data: {
      name: "Python Programming",
      issuer: "Excellent Coaching Centre",
      link: "2023"
    }
  });

  await prisma.certificate.create({
    data: {
      name: "C & C++ Programming",
      issuer: "Vidyasagar University",
      link: "2022"
    }
  });

  console.log("Resume Data injected successfully!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
