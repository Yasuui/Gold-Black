/**
 * Portfolio Content Data
 * All portfolio data lives here for easy management
 * No PII - using placeholders for sensitive information
 */

export interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  link: string
  linkType: "github" | "external" | "none"
  featured?: boolean
  status?: "Live" | "Beta" | "In Development" | "Archived"
  // Deep dive content for drawer
  challenge?: string
  stack?: string[]
  architectNote?: string
}

export interface TerminalLog {
  text: string
  type: "command" | "output" | "success" | "error" | "info"
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export interface SkillCategory {
  name: string
  skills: string[]
}

// Hero Section - Terminal Logs
export const terminalLogs: TerminalLog[] = [
  { text: "$ whoami", type: "command" },
  { text: "Full-Stack Developer & UI/UX Enthusiast", type: "output" },
  { text: "$ cat background.txt", type: "command" },
  { text: "→ Passionate about crafting digital experiences", type: "info" },
  { text: "→ Specializing in React, Next.js, TypeScript", type: "info" },
  { text: "→ Building performant & accessible applications", type: "info" },
  { text: "$ echo $CURRENT_STATUS", type: "command" },
  { text: "✓ Available for new opportunities", type: "success" },
  { text: "$ ls ./expertise", type: "command" },
  { text: "frontend/  backend/  design/  devops/", type: "output" },
]

// Env-backed contact (no PII in source)
const userEmail = process.env.NEXT_PUBLIC_USER_EMAIL ?? ""
const xHandle = process.env.NEXT_PUBLIC_X_HANDLE ?? ""
const telegramHandle = process.env.NEXT_PUBLIC_TELEGRAM_HANDLE ?? ""
const substackUrl = process.env.NEXT_PUBLIC_SUBSTACK_URL ?? ""

// Personal Info (display name + env for contact)
export const personalInfo = {
  name: "Yonis Diriye",
  title: "Full-Stack Developer",
  email: userEmail,
  phone: "+1 (XXX) XXX-XXXX",
  location: "Toronto, Ontario",
  tagline: "Crafting digital experiences that matter",
  bio: `A passionate developer focused on building beautiful, 
        performant, and accessible web applications. 
        I blend design sensibility with technical expertise 
        to create experiences that users love.`,
}

// Contact channels for Communication Hub (deep links from env)
export const contactChannels = {
  email: {
    label: userEmail || "Email",
    href: userEmail ? `mailto:${userEmail}?subject=Inquiry%20regarding%20Systems%20Architecture` : "#",
    primaryAction: "Send Secure Email",
  },
  x: {
    label: "Direct Message",
    sublabel: xHandle ? `@${xHandle}` : "X",
    href: xHandle ? `https://x.com/messages/compose?recipient_id=${xHandle}` : "https://x.com",
    primaryAction: "Open DM",
  },
  telegram: {
    label: "Telegram",
    sublabel: telegramHandle ? `@${telegramHandle}` : "Telegram",
    href: telegramHandle ? `https://t.me/${telegramHandle}` : "https://t.me",
    primaryAction: "Open Chat",
  },
  substack: {
    label: "Newsletter",
    sublabel: substackUrl ? substackUrl.replace(/^https?:\/\//, "") : "Substack",
    href: substackUrl || "https://substack.com",
    primaryAction: "Subscribe",
  },
}

// Projects Data - Curated Triple (3 is the magic number for portfolios)
export const projects: Project[] = [
  {
    id: "vienna-waits",
    title: "Vienna Waits Growth Strategy",
    description: "Served as Project Lead for a technical growth strategy initiative. Directed a cross-functional team of 5, overseeing the Decision Log and milestone tracking to deliver a comprehensive expansion roadmap.",
    image: "/projects/vienna-waits.png",
    tags: ["Project Management", "Growth Strategy", "Team Leadership", "Riipen Labs"],
    link: "https://viennawaits.com",
    linkType: "external",
    featured: true,
    status: "Live",
    challenge: "Vienna Waits needed a scalable growth strategy that could transition them from a boutique coaching practice to a multi-market enterprise. The challenge was balancing rapid expansion with maintaining their core philosophy of intentional living.",
    stack: ["Strategic Planning", "Market Analysis", "Stakeholder Management", "Agile Methodology", "Decision Logging", "KPI Tracking"],
    architectNote: "I chose to implement a phased rollout approach rather than aggressive scaling. This allowed the team to validate assumptions at each stage and pivot quickly. The Decision Log became our single source of truth, ensuring alignment across all 5 team members.",
  },
  {
    id: "study-spark",
    title: "Study Spark",
    description: "An AI-powered educational platform developed for the Bolt Hackathon. Generates personalized learning paths and interactive summaries from complex academic materials.",
    image: "/projects/study-spark.png",
    tags: ["Next.js", "OpenAI API", "Vibe Coding", "Tailwind CSS"],
    link: "https://github.com/yourusername/study-spark",
    linkType: "github",
    status: "Beta",
    challenge: "Students struggle to extract key concepts from dense academic materials. Traditional summarization tools lack personalization and fail to adapt to individual learning styles or knowledge gaps.",
    stack: ["Next.js 14", "TypeScript", "OpenAI GPT-4 API", "Tailwind CSS", "Vercel AI SDK", "PostgreSQL", "Prisma ORM"],
    architectNote: "I opted for streaming responses using Vercel AI SDK to provide real-time feedback during content generation. This dramatically improved perceived performance and user engagement. The 'Vibe Coding' approach meant rapid iteration—shipping features within hours, not days.",
  },
  {
    id: "basepass",
    title: "BasePass",
    description: "A decentralized event attendance system built for the Base Batches hackathon. Uses cryptographically signed QR codes and NFT stamps to verify on-chain presence.",
    image: "/projects/basepass.png",
    tags: ["Solidity", "Next.js", "Wagmi", "Web3 UX"],
    link: "https://github.com/yourusername/basepass",
    linkType: "github",
    status: "Beta",
    challenge: "Event organizers lack verifiable proof of attendance that's tamper-proof and portable. Traditional check-ins are easily faked, and attendees have no lasting credential from their participation.",
    stack: ["Solidity", "Next.js 14", "TypeScript", "Wagmi v2", "Viem", "Base Network (L2)", "IPFS", "Tailwind CSS"],
    architectNote: "Building on Base (Coinbase's L2) was a deliberate choice for near-zero gas fees—critical for event use cases where users mint multiple attendance NFTs. The QR code signing happens client-side to maintain privacy, with verification occurring on-chain only at mint time.",
  },
]

// Icon Cloud Icons (for 3D rotating icon display)
export const iconCloudIcons = [
  "nextdotjs",
  "react",
  "typescript",
  "python",
  "nodedotjs",
  "postgresql",
  "googlecloud",
  "docker",
  "git",
  "tailwindcss",
  "figma",
]

// Map icon slugs to display names for technology labels
export const iconSlugToName: Record<string, string> = {
  nextdotjs: "Next.js",
  react: "React",
  typescript: "TypeScript",
  python: "Python",
  nodedotjs: "Node.js",
  postgresql: "PostgreSQL",
  googlecloud: "Google Cloud",
  docker: "Docker",
  git: "Git",
  tailwindcss: "Tailwind CSS",
  figma: "Figma",
}

// Skills Data - Updated for Bento Grid Layout
export const skillCategories: SkillCategory[] = [
  {
    name: "Design & UX",
    skills: [
      "UI/UX Prototyping",
      "Human-Centered Design",
      "Responsive Web",
      "Accessibility",
    ],
  },
  {
    name: "DevOps & Systems",
    skills: [
      "AWS Cloud",
      "Dockerization",
      "CI/CD Pipelines",
      "Systems Analysis",
    ],
  },
]

// Bento Grid categories: Frontend, Backend, Tools/DevOps, Design
export interface BentoCategory {
  id: string
  name: string
  iconSlugs: string[]
  skills: string[]
}

export const bentoCategories: BentoCategory[] = [
  {
    id: "frontend",
    name: "Frontend",
    iconSlugs: ["react", "nextdotjs", "typescript", "tailwindcss"],
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Responsive Web"],
  },
  {
    id: "backend",
    name: "Backend",
    iconSlugs: ["nodedotjs", "python", "postgresql"],
    skills: ["Node.js", "Python", "PostgreSQL", "REST APIs", "Data Modeling"],
  },
  {
    id: "tools-devops",
    name: "Tools & DevOps",
    iconSlugs: ["googlecloud", "docker", "git"],
    skills: ["Google Cloud", "Docker", "Git", "CI/CD Pipelines", "Systems Analysis"],
  },
  {
    id: "design",
    name: "Design",
    iconSlugs: ["figma"],
    skills: ["UI/UX Prototyping", "Human-Centered Design", "Accessibility", "Figma"],
  },
]

// Social Links
export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/yourusername",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/yourusername",
    icon: "linkedin",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/yourusername",
    icon: "twitter",
  },
]

// Navigation Links - Order matches scroll: Home → Skills → Projects → Contact
export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

// Theme Configuration
export const themeConfig = {
  colors: {
    background: "#0A0A0A",
    text: "#FDF8F2",
    accent: "#D4A373",
    accentHover: "#E5B98A",
    muted: "#1A1A1A",
    border: "#2A2A2A",
  },
}
