export const profile = {
  name: "Rahul Kumar",
  firstName: "Rahul",
  role: "Full-stack developer",
  github: "importantboy",
  email: "rahul.deowanshi@gmail.com",
  githubUrl: "https://github.com/importantboy",
  website: "https://rahulprojects.online",
  description: "I build thoughtful web experiences, from the interface you see to the systems that make it work. React, Next.js, Node.js, and MongoDB are my everyday tools.",
};

export const skills = [
  { label: "The interface", number: "01", description: "Responsive, accessible experiences that feel good to use.", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Motion"] },
  { label: "Behind the scenes", number: "02", description: "APIs and application logic that bring a product to life.", items: ["Node.js", "Express.js", "MongoDB", "REST APIs", "Authentication"] },
  { label: "The workflow", number: "03", description: "Practical tools for shipping, learning, and improving.", items: ["Git & GitHub", "Vercel", "Postman", "Responsive design", "Problem solving"] },
];

export type ProjectEditorial = { title: string; category: string; summary: string; art: "cacao" | "worksheet" | "store" | "terminal" | "abstract"; tags: string[]; featured?: boolean; highlights?: string[] };

// Optional presentation overrides. New public repositories appear without adding an entry here.
export const projectEditorial: Record<string, ProjectEditorial> = {
  "truffle-box": { title: "Maison Cacao", category: "E-commerce", summary: "A custom chocolate-box experience. Choose your truffles, build a box, and follow it through checkout.", art: "cacao", tags: ["Next.js", "TypeScript", "Supabase", "Razorpay"], featured: true, highlights: ["Custom 2 × 2 to 6 × 6 boxes with drag-and-drop and accessible tap placement.", "Supabase accounts, saved addresses, and order history.", "Razorpay checkout with server-created orders and verified webhooks."] },
  "dsa-template": { title: "DSA Solver", category: "Developer tools", summary: "A focused workspace for thinking through algorithms, tracing a solution, and exporting the process.", art: "worksheet", tags: ["React", "JavaScript", "Vite", "jsPDF"], featured: true, highlights: ["A structured worksheet for breaking down a problem and its solution.", "Local autosave and light / dark themes.", "Markdown and printable PDF exports."] },
  "shopify-headless": { title: "Headless Storefront", category: "E-commerce", summary: "A Next.js storefront project exploring a headless approach to Shopify commerce.", art: "store", tags: ["Next.js", "TypeScript", "Shopify"], featured: true },
  "rbacexpress": { title: "Express RBAC", category: "Backend", summary: "An Express project focused on role-based access control.", art: "terminal", tags: ["JavaScript", "Express.js", "Node.js"] },
  "portfolio": { title: "Personal Portfolio", category: "Web experience", summary: "The website you’re exploring. A responsive home for my work, built with Next.js and Motion.", art: "abstract", tags: ["Next.js", "TypeScript", "Motion"] },
};
