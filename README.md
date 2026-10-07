# Fayza Siti Rahmawati - Portfolio Website

A modern, interactive, and responsive multilingual portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Live Demo

- **Production URL**: [https://fayzarahma-portofolio.vercel.app](https://fayzarahma-portofolio.vercel.app)

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Internationalization (i18n)**: Custom React Context (`LanguageProvider`)

## 📊 Application Architecture & Flow

```mermaid
flowchart TD
    %% Node Pengunjung
    Start([Visitor Buka Website]) --> Init[App Initialization & Root Layout]

    %% Context & State
    Init --> Provider[LanguageProvider Context]
    Provider --> State{Language State}
    State -->|Default| EN[Bahasa Inggris]
    State -->|Toggle| ID[Bahasa Indonesia]

    %% Rendering Komponen
    EN --> RenderUI[Render Komponen UI]
    ID --> RenderUI

    subgraph UI_Components [Komponen Utama Portfolio]
        RenderUI --> Nav[Navbar Component]
        RenderUI --> Hero[Hero Section]
        RenderUI --> Exp[Experience Section]
        RenderUI --> Proj[Projects Section]
        RenderUI --> Contact[Contact Section]
    end

    %% Interaksi
    Nav -->|Klik Button EN/ID| State
    Contact -->|Klik Email| Mail[Open Gmail Web Compose]
    Contact -->|Klik WA| WA[Open WhatsApp Chat]
```
