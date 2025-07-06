/**
 * Portfolio Data
 * 
 * This file contains all the data used throughout the portfolio application.
 * It defines interfaces for projects and skills, and exports data objects
 * for personal information, projects, skills, and template names.
 */

// Interface for project data
export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  link?: string;
  github?: string;
  category: 'client' | 'personal';
}

// Interface for skill data
export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'data-science';
  level: number;
}

/**
 * Personal information data
 * Contains basic details about the portfolio owner
 */
export const personalInfo = {
  name: "Syed Shariq Hussain",
  title: "Full Stack Developer & Data Scientist",
  education: "Computer Science Graduate (2021)",
  bio: "Passionate Computer Science graduate with expertise in MERN stack development and data science. I create innovative web solutions that blend cutting-edge technology with exceptional user experiences.",
  email: "shariq.hussain@email.com",
  linkedin: "linkedin.com/in/shariq-hussain",
  github: "github.com/shariq-hussain",
  location: "Remote / Available Worldwide"
};

/**
 * Projects data
 * Array of portfolio projects with details
 */
export const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include payment integration, inventory management, and analytics dashboard.",
    tech: ["React", "Node.js", "MongoDB", "Express", "Stripe", "Redis"],
    image: "https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800",
    link: "https://demo-ecommerce.com",
    github: "https://github.com/shariq/ecommerce",
    category: "client"
  },
  {
    id: "2",
    title: "Data Analytics Dashboard",
    description: "Interactive dashboard for business intelligence using Python, React, and D3.js. Real-time data visualization with predictive analytics.",
    tech: ["Python", "React", "D3.js", "Flask", "PostgreSQL", "Docker"],
    image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800",
    link: "https://analytics-demo.com",
    github: "https://github.com/shariq/analytics",
    category: "client"
  },
  {
    id: "3",
    title: "Task Management System",
    description: "Collaborative project management tool with real-time updates, team chat, and advanced filtering capabilities.",
    tech: ["React", "Node.js", "Socket.io", "MongoDB", "JWT", "Tailwind"],
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
    github: "https://github.com/shariq/taskmanager",
    category: "personal"
  },
  {
    id: "4",
    title: "Machine Learning Model API",
    description: "REST API for serving ML models with automatic scaling and monitoring. Built with FastAPI and deployed on AWS.",
    tech: ["Python", "FastAPI", "TensorFlow", "AWS", "Docker", "Redis"],
    image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800",
    github: "https://github.com/shariq/ml-api",
    category: "personal"
  }
];

/**
 * Skills data
 * Array of technical skills with proficiency levels
 */
export const skills: Skill[] = [
  // Frontend
  { name: "React", category: "frontend", level: 95 },
  { name: "TypeScript", category: "frontend", level: 90 },
  { name: "Next.js", category: "frontend", level: 85 },
  { name: "Tailwind CSS", category: "frontend", level: 90 },
  { name: "Vue.js", category: "frontend", level: 75 },
  
  // Backend
  { name: "Node.js", category: "backend", level: 90 },
  { name: "Express.js", category: "backend", level: 85 },
  { name: "Python", category: "backend", level: 88 },
  { name: "Django", category: "backend", level: 80 },
  { name: "FastAPI", category: "backend", level: 85 },
  
  // Database
  { name: "MongoDB", category: "database", level: 85 },
  { name: "PostgreSQL", category: "database", level: 80 },
  { name: "Redis", category: "database", level: 75 },
  
  // Tools
  { name: "Git", category: "tools", level: 90 },
  { name: "Docker", category: "tools", level: 80 },
  { name: "AWS", category: "tools", level: 75 },
  { name: "Figma", category: "tools", level: 70 },
  
  // Data Science
  { name: "TensorFlow", category: "data-science", level: 85 },
  { name: "Pandas", category: "data-science", level: 90 },
  { name: "NumPy", category: "data-science", level: 88 },
  { name: "Scikit-learn", category: "data-science", level: 85 }
];

/**
 * Template names
 * Array of available template options for the portfolio
 */
export const templateNames = [
  "Minimalist",
  "Creative",
  "Corporate",
  "Dark Tech",
  "Experimental",
  "Glassmorphism",
  "Parallax",
  "Neumorphism",
  "Brutalism",
  "Cyberpunk",
  "Skeuomorphism",
  "Metro UI",
  "Organic",
  "Typographic",
  "Magazine",
  "Liquid Interface",
  "AI Dynamic Layout",
  "Retro Terminal",
  "Animated Isometric",
  "Time Machine Mode",
  "Escher Grid"
] as const;

// Type for template names to ensure type safety
export type TemplateName = typeof templateNames[number];