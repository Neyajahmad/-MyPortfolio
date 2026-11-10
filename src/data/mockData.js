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
    period: "May 2026 - Present",
    current: true,
    location: "Gurgaon, Haryana, India",
    mode: "On-site",
    summary: "Building AI evaluation infrastructure for frontier Large Language Models: Python and FastAPI services, Dockerised evaluation harnesses, and the RL task bundles and benchmarks behind RLHF, RLVR and SFT pipelines.",
    stats: [
      { value: "10K", label: "Task programme scope" },
      { value: "60", label: "App long-horizon benchmark" },
      { value: "22", label: "Rubric criteria designed" },
      { value: "100%", label: "Verified pass, rollout to reward" }
    ],
    highlights: [
      {
        title: "Built ccbridge, a Python and FastAPI reverse proxy",
        detail: "Fronts Anthropic-compatible LLM endpoints with OAuth credential refresh, shared-secret authentication, request retries and upstream error classification, so agent and grader processes never handle a raw credential."
      },
      {
        title: "Operated an end-to-end LLM agent evaluation harness",
        detail: "Ran inference and grading on Hybrid-Gym and OpenHands inside Docker sandboxes with enforced network lockdown, taking a code-understanding task from rollout to a verified reward of 1.0000 (100% pass) across programmatic and rubric channels."
      },
      {
        title: "Authored reinforcement-learning task bundles",
        detail: "Designed task contracts, agent prompts, reference answers and a weighted 22-criteria rubric over Python, Go, JavaScript and Rust repositories, for a post-training programme scoped to 10,000 tasks."
      },
      {
        title: "Designed a six-stage generation pipeline for MCP benchmarks",
        detail: "Emits a 12-file bundle per tool-calling task, gated by automated QC scripts and a linter enforcing 14 structural invariants, with Docker Compose environments serving MCP over streamable HTTP."
      },
      {
        title: "Authored an L4 long-horizon agent benchmark",
        detail: "Spans 60 applications (26 required, 34 distractors) with a 40+ node solve chain, verified by Pytest trajectory and state assertions plus a graph-F1 plan channel. Documented 9 reproducible failure modes in the team runbook."
      },
      {
        title: "Contributed to RLHF, RLVR and SFT pipelines",
        detail: "Worked with AI Ops and Quality teams to improve model performance, output consistency and instruction-following in production workflows."
      }
    ],
    stack: ["Python", "FastAPI", "Docker", "Docker Compose", "Pytest", "MCP", "OpenHands", "OAuth 2.0", "RLHF / RLVR / SFT"]
  }
];

export const projects = [
  {
    id: "affiliate-plus",
    category: "Full Stack",
    year: "2025",
    highlights: [
      "Real-time analytics dashboard covering click counts, device types and user location, serving 50+ tracked links",
      "15+ RESTful APIs on an MVC architecture with middleware validation and JWT authentication",
      "Role-based access control across admin, affiliate and viewer roles",
      "Razorpay payments with webhook-based transaction verification"
    ],
    title: "Affiliate++",
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
      "/images/affiliate-dashboard.png"
    ]
  },
  {
    id: "smartqa",
    category: "Full Stack",
    year: "2025",
    highlights: [
      "Bidirectional WebSocket communication via Socket.IO supporting 30+ concurrent users",
      "Google Gemini API ranks questions and surfaces high-priority ones automatically",
      "Cut manual moderation effort by approximately 60%",
      "Redux Toolkit powered React.js frontend on a Node.js and MongoDB backend"
    ],
    title: "SmartQA",
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
      "/images/smartqa-ui.png"
    ]
  },
  {
    id: "nutritrack",
    category: "Android",
    year: "2025",
    highlights: [
      "Published on the Google Play Store",
      "MVVM with LiveData, Firebase authentication and REST APIs for AI-based dietary recommendations",
      "Google ML Kit on-device food recognition across 30+ food categories, removing manual calorie entry"
    ],
    title: "NutriTrack",
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
    ]
  },
  {
    id: "tourist-safety",
    category: "Full Stack",
    title: "Tourist Safety Application",
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
    ]
  },
  {
    id: "task-management",
    category: "Frontend",
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
      "/images/task-management.png"
    ]
  },
  {
    id: "chat-app",
    category: "Full Stack",
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
    image: "/images/chat-app.png"
  },
  {
    id: "expense-tracker",
    category: "Full Stack",
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
    image: "/images/expense-tracker.png"
  },
  {
    id: "recipe-master",
    category: "Full Stack",
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
    image: "/images/recipe-master-cover.svg"
  },
  {
    id: "notes-app",
    category: "Android",
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
    image: "/images/notes-app-cover.svg"
  },
  {
    id: "ecommerce-ui",
    category: "Frontend",
    title: "E-commerce Website UI",
    subtitle: "Modern Web Store Layout",
    description: "A custom-built e-commerce website UI with multiple sections including: Home, Shop, Blog, About, Contact, Login.",
    features: [
      "Smooth navigation",
      "Responsive design",
      "Modern UI layout"
    ],
    techStack: ["HTML", "CSS"],
    image: "/images/ecommerce-ui.png"
  },
  {
    id: "netflix-clone",
    category: "Frontend",
    title: "Netflix UI Clone",
    subtitle: "Responsive Frontend Recreation",
    description: "A fully responsive Netflix homepage UI clone created using HTML and CSS.",
    features: [
      "Netflix-style UI",
      "Responsive layout",
      "Mobile and desktop support"
    ],
    techStack: ["HTML", "CSS"],
    image: "/images/netflix-clone.png"
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
    degree: "BTech, Computer Science & Engineering",
    score: "CGPA: 7.52",
    period: "2022 - Present"
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
