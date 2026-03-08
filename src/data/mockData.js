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
  Languages: ["Java", "JavaScript", "C++"],
  "Web Development": ["HTML", "CSS", "Tailwind CSS", "React", "Node.js", "Express.js"],
  Databases: ["MongoDB", "MySQL"],
  Tools: ["Git", "GitHub", "Android Studio"],
  "Soft Skills": ["Problem Solving", "Analytical Thinking", "Collaboration"],
};

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
    github: "github.com/Neyajahmad/AffiliateLinkSharing",
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
    github: "github.com/Neyajahmad/SmartQues-Ans",
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
    github: "github.com/Neyajahmad/TaskManagement",
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
    score: "CGPA: 7.28",
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
