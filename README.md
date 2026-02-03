# 🌑 Black & Gold: High-Fidelity Portfolio

A premium, minimalist portfolio template built with **Next.js 14**, focusing on "Executive-Tech" aesthetics, motion discipline, and deep-dark mode visuals. This project was originally crafted for my personal site and is now open-sourced for developers who appreciate a clinical, authoritative look.

---

## ✨ Features

* **Systems Architect Aesthetic:** A curated "Black & Gold" theme with a custom leather-grain texture overlay.
* **3D Interactive Globe:** Integrated **COBE Globe** for high-end regional visualization.
* **Advanced UI Components:** Powered by **Magic UI** (Terminal, BorderBeam, IconCloud, and Lens).
* **Privacy-First:** All contact details and identity strings are environment-variable driven.
* **Bento Grid Layout:** A responsive, structured grid for skills and project showcasing.

---

## 🛠 Tech Stack

* **Framework:** `Next.js 14` (App Router)
* **Styling:** `Tailwind CSS`
* **Animations:** `Framer Motion`
* **Icons:** `Lucide React` & `Simple Icons`
* **Components:** `Magic UI`

---

## 📸 Screenshots

| Hero & Terminal | Project Bento Grid | Contact Hub |
| --- | --- | --- |
|  |  |  |

---

## 🚀 Quick Start (Template)

### 1. Clone & Install

```bash
git clone https://github.com/Yasuui/Gold-Black.git
cd black-and-gold
npm install

```

### 2. Environment Setup

Create a `.env.local` file in the root. This is critical for keeping your personal data out of public repositories.

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_USER_EMAIL` | Primary contact email |
| `NEXT_PUBLIC_X_HANDLE` | X (Twitter) handle |
| `NEXT_PUBLIC_TELEGRAM_HANDLE` | Telegram username |
| `NEXT_PUBLIC_SUBSTACK_URL` | Newsletter URL |

### 3. Personalization

The **"Source of Truth"** for this portfolio is located in `src/data/content.ts`. Edit this file to update:

* **Projects:** Add your title, descriptions, and image paths.
* **Skills:** Update the `iconCloudIcons` array with slugs from [Simple Icons](https://simpleicons.org/).
* **Navigation:** Reorder or rename links to fit your page flow.

---

## 📦 Deployment

This repository is optimized for **Vercel**.

1. Push your code to GitHub.
2. Import the project into Vercel.
3. Add your Environment Variables in the Vercel Dashboard.
4. Deploy.

---

## 👤 Credits

* **Developer:** Yonis Diriye
* **License:** MIT

> Created for my personal website; now available for everyone who values a dark, premium aesthetic.

---