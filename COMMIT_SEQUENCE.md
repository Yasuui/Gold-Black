# Human–AI Commit Sequence

Run these in order to produce a professional, conventional-commit history. Stage the listed files for each step, then run the `git commit` command.

**Note:** If your working tree already has all changes in one go, use the **One-shot alternative** at the bottom, or stage only the files listed in each step so each commit represents that logical change.

---

**1. Architecture & layout**

```bash
git add src/app/ src/lib/ src/data/ package.json tsconfig.json next.config.ts tailwind.config.ts postcss.config.mjs eslint.config.mjs .gitignore
git commit -m "feat: initial architecture and core systems layout"
```

---

**2. UI: leather noise and glassmorphism**

```bash
git add src/app/globals.css src/components/ui/
git commit -m "ui: calibrate high-fidelity leather noise and glassmorphism"
```

---

**3. Z-index and border-beam**

```bash
git add src/components/ui/border-beam.tsx src/components/sections/
git commit -m "fix: resolve z-index stacking and border-beam visibility"
```

---

**4. Environment and privacy**

```bash
git add .env.example src/data/content.ts
git commit -m "dx: migrate personal identifiers to environment variables"
```

---

**5. Folder structure**

```bash
git add src/components/ src/hooks/ src/app/page.tsx
git commit -m "refactor: standardize folder structure (components/ui, sections, hooks)"
```

---

**6. README**

```bash
git add README.md
git commit -m "docs: initialize README with env and structure"
```

---

**Optional 7th (if you have uncommitted polish):**

```bash
git add -A
git commit -m "chore: lint and minor polish"
```

---

## One-shot alternative

If you prefer a single commit after all work is done:

```bash
git add -A
git commit -m "feat: portfolio with env-based contact, standardized structure, and docs

- dx: move email, X, Telegram, Substack to env vars
- refactor: components/ui, components/sections, hooks
- docs: README with env setup and file structure"
```
