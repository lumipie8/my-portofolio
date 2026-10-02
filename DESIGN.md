# Portfolio Design Guidelines & Technical Specifications

## 1. Brand Identity & Overview

- **Name:** Fayza Siti Rahmawati
- **Role:** Computer Science Student & Frontend Developer Enthusiast
- **Theme Concept:** Modern Dark Mode with Glassmorphism, Deep Space/Starline Accents (Backseasy style), and Interactive 3D Lanyard ID Card Hero Section.
- **Tone & Feel:** Professional, Sleek, Interactive, and Tech-Focused.

## 2. Color Palette & Aesthetics

- **Primary Background:** Deep Dark Charcoal (`#0a0a0c` or `#0e0f12`) with subtle animated gradient or line/star patterns.
- **Glassmorphism Panels:**
  - Background: `rgba(255, 255, 255, 0.03)`
  - Border: `1px solid rgba(255, 255, 255, 0.08)`
  - Backdrop Blur: `blur(12px)`
  - Hover Glow: Subtle white/silver shadow glow (`box-shadow: 0 0 20px rgba(255, 255, 255, 0.15)`)
- **Accent Colors:** Electric Blue / Violet Cyan (`#6366f1` / `#3b82f6`) for key action buttons and active indicators.
- **Typography:**
  - Font Sans: Inter / Geist / Plus Jakarta Sans.
  - Headings: Bold, clean, high-contrast white (`#ffffff`).
  - Body Text: Muted gray (`#9ca3af` / `#d1d5db`).

## 3. Structural Layout & Sections

1. **Header / Navbar:** Sticky/fixed glassmorphic navigation bar with logo and section anchors.
2. **Hero Section:**
   - Left Side: Intro headline, short bio, CTA buttons (Projects & Contact).
   - Right Side: Interactive 3D/Physics Lanyard ID Card featuring user portrait (`bg-abu.png`).
3. **Experience Section:**
   - Glassmorphic card list or interactive vertical timeline showcasing internships:
     - **BPJS Ketenagakerjaan** - Administrative & Digital Operations Intern (Feb 2023 - May 2023)
     - **Inspektorat Kabupaten Serang** - Administrative Intern (Aug 2022 - Nov 2022)
4. **Featured Projects Section:**
   - Grid layout of glass cards featuring web development projects with interactive hover states and GitHub/Live links.
5. **Skills Section:**
   - Interactive tech-stack badges (HTML, CSS, JavaScript, Git, React, Office/Archives Management, etc.).
6. **Footer & Contact:**
   - Minimalist footer with social links (LinkedIn, GitHub, Email).

## 4. Animation & Interactivity Rules

- Use Framer Motion / React Three Fiber for smooth transitions.
- Interactive elements must have clear hover and active feedback.
- Ensure all layouts are fully responsive (Mobile, Tablet, Desktop).
