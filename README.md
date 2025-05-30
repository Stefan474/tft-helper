# TFT Helper 
_Simplify how you think about Teamfight Tactics and focus on playing instead of juggling different guide sites._

[Live demo → tft-helper-sepia.vercel.app](https://tft-helper-sepia.vercel.app)   |  
Built with **Vue 3 + TypeScript + Supabase + Tailwind** and deployed on **Vercel**.

---

## ✨ Features

| Area | What it does |
|------|--------------|
| **Cheat-sheet builder** | Drag-and-drop champions & items onto a virtual board, then save the comp to your account. |
| **Import / Export** | One-click JSON import & export share keys so friends can load your board instantly. |
| **Preset guides** | “Guide” page ships with curated meta comps to reduce the initial user friction. |
| **Responsive UI** | Tailwind + DaisyUI layout that works from 1440p monitors down to phone screens. Separate UX flows for mobile vs desktop. |
| **Supabase backend** | Postgres storage (4 tables) for item, champion and user data. |
| **Dashboard view** | Quickly go through all your saved cheat sheets. |
| **Dark / Light modes** | Follows OS preference with smooth transitions. |

> **Planned next:** row-level security, rate-limiting, Vitest unit tests & a Cypress happy-path e2e.

---

## 📸 Demo

### Using the guides

<p align="left">
  <img src="https://github.com/user-attachments/assets/1b77f186-aa16-462a-992f-5c8a6f168fab"
       alt="Main board" height="400">
</p>

### Making a sheet

<p align="left">
  <img src="https://github.com/user-attachments/assets/949028fc-1576-4b45-9bc7-b602125aabc3"
       alt="Item picker" height="400">
</p>

### Import/Export

<p align="left">
  <img src="https://github.com/user-attachments/assets/8fc692c7-09c0-4c03-996a-29ea8a87af37"
       alt="Export modal" height="400">
</p>

### Responsiveness + Themes

<p align="left">
  <img src="https://github.com/user-attachments/assets/182dd143-9a6a-4e43-94c2-65331bb6a4a6"
       alt="Responsive view" height="400">
</p>



---

## 🏗️ Tech Stack

| Frontend | Styling | Backend-as-a-Service | Dev & Ops |
|----------|---------|----------------------|-----------|
| Vue 3 (script-setup), TypeScript | Tailwind CSS + DaisyUI | Supabase (Postgres) | Vite, ESLint, Prettier, Vercel |

---

## 🚀 Quick Start

```bash
# 1. Clone
git clone https://github.com/Stefan474/tft-helper.git
cd tft-helper

# 2. Install
pnpm install      # or npm install / yarn install

# 3. Configure environment
cp .env.example .env        # create your local env file
# ┌────────────────────────────────────────────────┐
# | VITE_SUPABASE_URL= https://xyzcompany.supabase.co |
# | VITE_SUPABASE_ANON_KEY= public-anon-key            |
# └────────────────────────────────────────────────┘

# 4. Run dev server
pnpm dev          # Vite: http://localhost:5173
```

Open for any tips and advice <3 
