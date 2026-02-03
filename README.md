# Yonis Diriye Portfolio

A premium, minimalist Next.js 14 portfolio featuring Magic UI components and warm dark theme design.

## Features

### Magic UI Components

- **RetroGrid**: Animated grid background in Hero section
- **Terminal**: Sequential typing animation displaying system logs
- **IconCloud**: Interactive 3D rotating cloud of technology icons
- **Lens**: Magnifying glass effect for project image exploration
- **BorderBeam**: Animated border highlight for featured projects
- **MagicCard**: Spotlight effect following mouse cursor
- **Marquee**: Infinite scrolling animation for DevOps tools
- **ThemeToggle**: Animated light/dark mode switch

### Design System

**Theme Colors:**
- Background: `#0A0A0A`
- Text: `#FDF8F2`
- Accent: `#D4A373`
- Card Background: `#111111`
- Border: `stone-800`

**Typography:**
- Primary: Inter (via next/font/google)
- Headers: Bold, large scale
- Body: Regular weight, comfortable line-height

### Layout

**Bento Grid Structure:**
- Hero Section: 2-column grid (text + terminal)
- Skills Section: 3-column Bento Grid
  - Technical Core (2x2): IconCloud
  - Design & UX (1x1): MagicCard
  - DevOps & Systems (1x1): Marquee
- Projects Section: Responsive Bento Grid
  - Featured project spans 2 columns
  - Other projects in 1-column cards

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Modern web browser

### Environment

Contact and identity are driven by environment variables so they never live in source control.

```bash
# Copy the example env file and fill in your values
cp .env.example .env
```

Edit `.env` and set:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_USER_EMAIL` | Primary contact email (mailto + copy) |
| `NEXT_PUBLIC_X_HANDLE` | X (Twitter) handle for DMs (no @) |
| `NEXT_PUBLIC_TELEGRAM_HANDLE` | Telegram username (no @) |
| `NEXT_PUBLIC_SUBSTACK_URL` | Newsletter URL (e.g. `https://you.substack.com`) |

`.env` is gitignored. Never commit it. Use `.env.example` as the template for others.

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000` to view your portfolio.

## Customization

### 1. Personal Information

- **Contact (email, X, Telegram, Substack):** Set in `.env` (see Environment above).
- **Name, title, bio, location:** Edit `src/data/content.ts` (`personalInfo`). Display name is not in env by default; add `NEXT_PUBLIC_USER_NAME` and wire it in `content.ts` if you prefer.

### 2. Projects

Update projects in `src/data/content.ts`:

```typescript
export const projects: Project[] = [
  {
    id: "project-id",
    title: "Project Name",
    description: "Project description...",
    image: "/path/to/image.jpg", // Replace placeholder URLs
    tags: ["React", "TypeScript", "Node.js"],
    link: "https://project-url.com",
    featured: true, // Adds BorderBeam highlight
  },
]
```

### 3. Skills & Tech Stack

Modify skills in `src/data/content.ts`:

```typescript
// Icon Cloud - uses Simple Icons slugs
export const iconCloudIcons = [
  "nextdotjs",
  "react",
  "typescript",
  // Add more from https://simpleicons.org
]

// Skill categories for Bento Grid
export const skillCategories = [
  {
    name: "Design & UX",
    skills: ["Skill 1", "Skill 2", "Skill 3"],
  },
]
```

### 4. Social Links

Update social links in `src/data/content.ts`:

```typescript
export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/yourusername",
    icon: "github",
  },
]
```

### 5. Navigation

Edit navigation links in `src/data/content.ts`:

```typescript
export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]
```

## Component Documentation

### IconCloud

Interactive 3D icon sphere with mouse interaction.

**Props:**
- `iconSlugs`: Array of Simple Icons slug names
- `images`: Alternative array of image URLs

**Usage:**
```tsx
<IconCloud iconSlugs={["react", "nextdotjs", "typescript"]} />
```

### Lens

Magnifying glass effect for images.

**Props:**
- `zoomFactor`: Magnification level (default: 1.5)
- `lensSize`: Diameter of lens in pixels (default: 150)
- `children`: Content to magnify

**Usage:**
```tsx
<Lens zoomFactor={1.4} lensSize={120}>
  <Image src="/project.jpg" alt="Project" />
</Lens>
```

### BorderBeam

Animated border highlight.

**Props:**
- `size`: Beam size in pixels
- `duration`: Animation duration
- `colorFrom`, `colorTo`: Gradient colors

**Usage:**
```tsx
<BorderBeam size={80} duration={8} colorFrom="#D4A373" colorTo="#E5B98A" />
```

### MagicCard

Spotlight card effect following mouse.

**Props:**
- `gradientSize`: Spotlight size
- `gradientFrom`, `gradientTo`: Gradient colors
- `children`: Card content

**Usage:**
```tsx
<MagicCard gradientFrom="#D4A373" gradientTo="#E5B98A">
  <div>Card content</div>
</MagicCard>
```

### Terminal

Animated terminal with typing effects.

**Usage:**
```tsx
<Terminal>
  <TypingAnimation>$ whoami</TypingAnimation>
  <AnimatedSpan>Full-Stack Developer</AnimatedSpan>
</Terminal>
```

## File Structure

```
src/
├── app/
│   ├── globals.css          # Global styles & theme
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── ui/                  # Primitives & Magic UI
│   │   ├── border-beam.tsx
│   │   ├── dot-pattern.tsx
│   │   ├── globe.tsx
│   │   ├── icon-cloud.tsx
│   │   ├── lens.tsx
│   │   ├── magic-card.tsx
│   │   ├── marquee.tsx
│   │   ├── retro-grid.tsx
│   │   ├── sheet.tsx
│   │   ├── skills-beam-flow.tsx
│   │   ├── technology-icons.tsx
│   │   ├── theme-provider.tsx
│   │   ├── typewriter-terminal.tsx
│   │   └── ...
│   ├── sections/            # Page sections
│   │   ├── hero-section.tsx
│   │   ├── skills-section.tsx
│   │   ├── projects-section.tsx
│   │   └── contact-section.tsx
│   ├── navigation-dock.tsx
│   ├── project-drawer.tsx
│   └── index.ts             # Barrel exports
├── data/
│   └── content.ts           # Portfolio data (env-backed contact)
├── hooks/
│   └── index.ts             # Custom hooks
└── lib/
    └── utils.ts             # Utility functions
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy with one click

### Other Platforms

Build and deploy static files:

```bash
npm run build
# Upload .next/static and other build files
```

## Performance

- **Lighthouse Score**: Optimized for 90+ scores
- **Core Web Vitals**: LCP, FID, CLS optimized
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Font Optimization**: next/font/google

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

MIT License - feel free to use this template for your own portfolio.

## Credits

- Built with [Next.js 14](https://nextjs.org/)
- UI Components from [Magic UI](https://magicui.design/)
- Icons from [Lucide React](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Animations with [Motion](https://motion.dev/)

---

Built with ❤️ by Yonis Diriye
