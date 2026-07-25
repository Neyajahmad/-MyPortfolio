export const personalInfo = {
  name: "Neyaj Ahmad",
  roleTitle: "Full Stack Developer",
  tagline: "Building Digital Products with Purpose and Precision.",
  contact: {
    email: "neyajahmad6585@gmail.com",
    phone: "+91-6203133986",
    github: "github.com/Neyajahmad",
    linkedin: "linkedin.com/in/neyajahmad",
  },
  location: "Punjab, India",
};

export const skills = {
  Languages: ["Java", "JavaScript", "Python"],
  "Web Development": ["HTML", "CSS", "Tailwind CSS", "React", "Node.js", "Express.js"],
  Databases: ["MongoDB", "MySQL"],
  Tools: ["Git", "GitHub", "Android Studio", "Docker"],
  "Soft Skills": ["Problem Solving", "Analytical Thinking", "Collaboration"],
};

export const experience = [
  {
    role: "Software Engineer",
    company: "Ethara AI",
    type: "Full-time",
    period: "May 2026 – Present",
    location: "Gurgaon, Haryana, India",
    mode: "On-site",
    responsibilities: [
      "Collaborating with AI Ops and Quality teams to improve model performance, consistency, and instruction following capabilities.",
      "Working with Python, Git, GitHub, and Docker to support AI powered applications and workflow automation.",
      "Contributing to RLHF, RLVR, and SFT pipelines for training and evaluating frontier Large Language Models.",
      "Designing project specifications, evaluation rubrics, and quality benchmarks for AI datasets.",
      "Performing rubric-based assessment, quality assurance, and validation of AI training data."
    ]
  }
];

export const projects = [
  {
    id: "affiliate-plus",
    title: "Affiliate++ \u2013 Affiliate Link Management Platform",
    subtitle: "Affiliate Link Management SaaS",
    description: "A SaaS platform designed to help content creators, marketers, and small businesses manage and track affiliate links more efficiently.",
    problem: "Affiliate marketers often struggle with managing many links, losing tracking data, and understanding which links perform best.",
    solution: "Affiliate++ provides a central dashboard where users can create, organize, shorten, and track affiliate links with real-time analytics.",
    features: [
      "Short URL generation", 
      "Campaign categorization", 
      "Click analytics", 
      "Device and location tracking",
      "Role-based access",
      "JWT authentication",
      "Google SSO",
      "Razorpay payment integration"
    ],
    workflow: [
      "User logs in using Google or email",
      "Selects subscription plan",
      "Receives tokens for link creation",
      "Adds long affiliate link",
      "System generates short link",
      "Dashboard shows analytics (clicks, device, location)"
    ],
    techStack: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB", "JWT", "Google SSO", "Razorpay"],
    deployment: {
      frontend: "Netlify",
      backend: "Render"
    },
    github: "https://github.com/Neyajahmad/AffiliateLinkSharing",
    live: "https://magical-mousse-326f31.netlify.app/",
    image: "/images/affiliate-dashboard.png",
    gallery: [
      "/images/affiliate-dashboard.png",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=2070&auto=format&fit=crop"
    ],
    widthClass: "md:col-span-7", // 60%
  },
  {
    id: "smartqa",
    title: "SmartQA \u2013 AI Powered Real-Time Q&A Platform",
    subtitle: "Live Event AI Question Platform",
    description: "A platform designed for lectures and workshops where participants can ask questions live.",
    problem: "In large events, questions become repetitive, hard to track, and difficult for hosts to prioritize.",
    solution: "SmartQA creates dedicated Q&A rooms where participants submit questions and AI ranks them by importance.",
    features: [
      "Real-time questions", 
      "AI ranking", 
      "Duplicate question detection", 
      "Event session rooms",
      "Live updates without refresh"
    ],
    workflow: [
      "WebSockets enable live updates",
      "AI analyzes questions",
      "Similar questions grouped together",
      "Most relevant questions ranked"
    ],
    techStack: ["React", "Node.js", "Express", "MongoDB", "Socket.IO", "Gemini AI API"],
    deployment: null,
    github: "https://github.com/Neyajahmad/SmartQues-Ans",
    live: "https://quesanswer.netlify.app/",
    image: "/images/smartqa-ui.png",
    gallery: [
      "/images/smartqa-ui.png",
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop"
    ],
    widthClass: "md:col-span-5", // 40%
  },
  {
    id: "task-management",
    title: "Task Management System",
    subtitle: "Role-based Dashboard System",
    description: "A role-based web application that simplifies task assignment and tracking between admins and users.",
    problem: "Workplace tasks often become disorganized and employees lack clarity on assigned work.",
    solution: "Provide separate dashboards for Admin and Users with clear workflow and distinct responsibilities.",
    features: [
      "View employees (Admin)",
      "Assign tasks (Admin)",
      "Track progress (Admin)",
      "Monitor completion status (Admin)",
      "View assigned tasks (User)",
      "Accept tasks (User)",
      "Mark tasks completed (User)",
      "Custom local storage persistence"
    ],
    workflow: [
      "Admin assigns task \u2192 stored in localStorage",
      "User updates task \u2192 status updated in localStorage"
    ],
    techStack: ["React", "JavaScript", "LocalStorage API"],
    deployment: null,
    github: "https://github.com/Neyajahmad/TaskManagement",
    live: "https://taskmanagement360.netlify.app/",
    image: "/images/task-management.png",
    gallery: [
      "/images/task-management.png",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop"
    ],
    widthClass: "md:col-span-12", // full width
  },
  {
    id: "expense-tracker",
    title: "Expense Tracking System",
    subtitle: "Financial Management Dashboard",
    description: "A web-based application developed using PHP, MySQL, HTML, CSS, and JavaScript to help users track and manage daily expenses.",
    problem: "People often lose track of their personal finances and struggle to categorize their daily spending efficiently.",
    solution: "A centralized dashboard providing separate roles for Admin and Users to manage users, add expenses, and generate insightful financial reports.",
    features: [
      "Admin Panel",
      "Admin login",
      "Add categories",
      "Manage users",
      "User Dashboard",
      "Add expenses",
      "Categorize spending",
      "Weekly / Monthly / Yearly reports",
      "Downloadable expense reports",
      "Expense filtering"
    ],
    techStack: ["PHP", "MySQL", "JavaScript", "HTML", "CSS", "PhpMyAdmin"],
    image: "/images/expense-tracker.png",
    widthClass: "md:col-span-4",
  },
  {
    id: "chat-app",
    title: "Chatting Application",
    subtitle: "Real-time Messaging Platform",
    description: "A real-time chat application built with Node.js, Express.js, Socket.io, and MongoDB.",
    problem: "Building reliable, low-latency communication networks that maintain persistent chat history is complex.",
    solution: "Implemented a robust WebSocket architecture enabling instant messaging with database permanence.",
    features: [
      "Real-time messaging",
      "WebSocket communication",
      "Persistent chat history",
      "Efficient database storage"
    ],
    techStack: ["Node.js", "Express.js", "Socket.io", "MongoDB"],
    image: "/images/chat-app.png",
    widthClass: "md:col-span-4",
  },
  {
    id: "netflix-clone",
    title: "Netflix UI Clone",
    subtitle: "Responsive Frontend Recreation",
    description: "A fully responsive Netflix homepage UI clone created using HTML and CSS.",
    features: [
      "Netflix-style UI",
      "Responsive layout",
      "Mobile and desktop support"
    ],
    techStack: ["HTML", "CSS"],
    image: "/images/netflix-clone.png",
    widthClass: "md:col-span-4",
  },
  {
    id: "ecommerce-ui",
    title: "E-commerce Website UI",
    subtitle: "Modern Web Store Layout",
    description: "A custom-built e-commerce website UI with multiple sections including: Home, Shop, Blog, About, Contact, Login.",
    features: [
      "Smooth navigation",
      "Responsive design",
      "Modern UI layout"
    ],
    techStack: ["HTML", "CSS"],
    image: "/images/ecommerce-ui.png",
    widthClass: "md:col-span-12",
  },
  {
    id: "tourist-safety",
    title: "Tourist Safety Application – AI Powered Emergency Assistance System",
    subtitle: "AI Powered Emergency Assistance System",
    description: "A full-stack tourist safety application that improves traveler safety using AI, real-time location tracking, SOS emergency alerts, and live admin assistance.",
    problem: "Tourists in unfamiliar locations lack real-time safety monitoring and a fast, reliable way to reach authorities during an emergency.",
    solution: "A dual-dashboard system where tourists get AI-based risk scoring and one-tap SOS alerts, while admins get live location tracking and direct chat/audio communication to coordinate emergency response.",
    features: [
      "Real-time GPS location tracking with interactive live map",
      "AI-based risk score and safety percentage prediction",
      "SOS emergency alert button",
      "Live text chat and audio/voice messaging with admin",
      "Admin dashboard with global live tourist monitoring",
      "JWT authentication and blockchain identity hash generation"
    ],
    workflow: [
      "Tourist logs in and app detects GPS location via the Geolocation API",
      "Location and movement data are streamed to the backend server",
      "AI engine analyzes speed, movement, area risk, and time to generate a risk score and safety percentage",
      "Tourist dashboard updates in real time with the safety status (SAFE / WARNING / CRITICAL)",
      "Pressing SOS instantly sends an alert to the Admin Dashboard via WebSockets",
      "Admin tracks the tourist live on the map and responds via text or audio chat"
    ],
    techStack: ["React.js", "Vite", "Node.js", "Express.js", "Socket.io", "MongoDB", "JWT", "Python (AI Service)"],
    deployment: {
      frontend: "Netlify",
      backend: "Render"
    },
    github: "https://github.com/Neyajahmad/Tourist",
    live: "https://touristsafty.netlify.app/",
    image: "/images/tourist-safety-cover.svg",
    gallery: [
      "/images/tourist-safety-cover.svg",
      "/images/tourist-safety-tourist-dashboard.svg",
      "/images/tourist-safety-admin-dashboard.svg"
    ],
    widthClass: "md:col-span-7",
  },
  {
    id: "nutritrack",
    title: "NutriTrack – AI Powered Nutrition & Fitness Tracker",
    subtitle: "Smart Android Nutrition Tracking App",
    description: "A smart Android application that helps users track nutrition, fitness, and wellness using AI-powered food recognition and real-time analytics.",
    problem: "Tracking daily nutrition accurately is tedious, and most apps lack smart food recognition or personalized AI-driven guidance.",
    solution: "NutriTrack combines food search, camera-based AI food recognition, and Gemini AI powered dietary guidance with Firebase-backed cloud sync and progress analytics.",
    features: [
      "Firebase authentication with email verification and password reset",
      "AI food recognition via CameraX and Google ML Kit",
      "Real-time calorie, protein, carbs & fat calculation using Edamam API",
      "Google Gemini AI powered conversational dietary guidance",
      "BMI calculator and weight progress charts (MPAndroidChart)",
      "Smart meal reminders and notifications with AlarmManager"
    ],
    techStack: ["Kotlin", "Android Studio", "MVVM Architecture", "Firebase Firestore", "Firebase Auth", "Dagger Hilt", "Retrofit", "Room Database"],
    deployment: null,
    github: "https://github.com/Neyajahmad/nutritrack",
    live: "https://play.google.com/store/apps/details?id=com.neyaj.nutritrack&pli=1",
    image: "/images/nutritrack-cover.svg",
    gallery: [
      "/images/nutritrack-cover.svg"
    ],
    widthClass: "md:col-span-5",
  },
  {
    id: "recipe-master",
    title: "Recipe Search and Meal Planner",
    subtitle: "Full-Stack MVC Recipe & Meal Planning App",
    description: "A full-stack MVC web application built with Laravel that lets users search recipes, view ingredients, and organize meals into a planner.",
    problem: "Planning meals and tracking recipe ingredients across multiple sources is scattered and time-consuming.",
    solution: "A Laravel MVC app that fetches recipes and ingredient data from an external API and lets users organize them into a daily/weekly meal planner with a clean Blade-based UI.",
    features: [
      "Recipe search by meal name via external API",
      "Ingredient fetching and display for each recipe",
      "Daily/weekly meal planner",
      "Dynamic routing with Laravel's built-in router",
      "Blade templating for reusable UI components",
      "Responsive design with Tailwind CSS and Bootstrap"
    ],
    techStack: ["PHP", "Laravel", "Blade", "MySQL", "Tailwind CSS", "Bootstrap"],
    deployment: null,
    github: "https://github.com/Neyajahmad/RecipeMaster",
    image: "/images/recipe-master-cover.svg",
    widthClass: "md:col-span-4",
  },
  {
    id: "notes-app",
    title: "Notes App",
    subtitle: "Kotlin Android Notes App with SQLite",
    description: "An Android notes application built with Kotlin that lets users add, edit, and delete notes with persistent SQLite storage.",
    problem: "Users need a simple, reliable way to jot down and manage notes that persist across app sessions.",
    solution: "A lightweight Kotlin Android app with full CRUD note management backed by a local SQLite database and a polished splash screen experience.",
    features: [
      "Add, edit and delete notes",
      "SQLite-backed data persistence",
      "Custom splash screen",
      "Clean Kotlin Android architecture"
    ],
    techStack: ["Kotlin", "Android Studio", "SQLite"],
    deployment: null,
    github: "https://github.com/Neyajahmad/NotesApp",
    image: "/images/notes-app-cover.svg",
    widthClass: "md:col-span-4",
  }
];

export const hackathons = [
  {
    year: "2024",
    title: "Web Ka Hackathon",
    tag: "Qualified for Round 2",
    description: "Collaborated with a team to design and build a web-based solution under tight deadlines, demonstrating strong problem solving, teamwork, and web development skills."
  }
];

export const education = [
  {
    institution: "Lovely Professional University",
    degree: "BTech \u2014 Computer Science & Engineering",
    score: "CGPA: 7.52",
    period: "2022 \u2013 Present"
  },
  {
    institution: "DAV Public School, Dhanbad",
    degree: "Higher Secondary",
    score: "83.6%",
    period: ""
  },
  {
    institution: "DAV Public School, Dhanbad",
    degree: "Matriculation",
    score: "82.8%",
    period: ""
  }
];
