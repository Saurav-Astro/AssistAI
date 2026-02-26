<div align="center">

# 🤖 AssistAI

**An AI-powered accessibility companion for specially-abled people**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-App_Hosting-FFCA28?logo=firebase)](https://firebase.google.com/)
[![Google Gemini](https://img.shields.io/badge/Google-Gemini_AI-4285F4?logo=google)](https://deepmind.google/technologies/gemini/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Project Structure](#-project-structure) • [Deployment](#-deployment) • [Contributing](#-contributing)

</div>

---

## 📖 Overview

AssistAI is a modern, accessible web application built to empower individuals with special needs. Powered by Google's Gemini AI through Firebase Genkit, it provides real-time guidance through an intuitive interface with three core capabilities: conversational AI assistance, visual scene understanding, and American Sign Language recognition.

---

## ✨ Features

### 💬 AI Chat Assistant
Have natural, context-aware conversations with a Gemini-powered AI assistant. Get real-time guidance, answers to questions, and helpful information — all in a friendly chat interface that maintains full conversation history.

### 👁️ Vision Help
Point your device camera at the world around you and let AssistAI describe what it sees. The AI vision module identifies objects, people, scenes, and text, helping users navigate and understand their surroundings independently.

### 🤟 Sign Language Converter
Show an American Sign Language (ASL) hand sign to the camera and instantly receive the corresponding word or letter as text. Built to bridge communication gaps for the hearing-impaired community.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router, React Server Components) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **AI / LLM** | [Google Gemini](https://deepmind.google/technologies/gemini/) via [Firebase Genkit](https://firebase.google.com/docs/genkit) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) + [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate) |
| **UI Components** | [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Forms** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **Camera** | [react-webcam](https://github.com/mozmorris/react-webcam) |
| **Backend** | [Firebase](https://firebase.google.com/) |
| **Deployment** | [Firebase App Hosting](https://firebase.google.com/docs/app-hosting) |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [npm](https://www.npmjs.com/) v9 or later
- A [Google AI / Gemini API key](https://aistudio.google.com/app/apikey)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Saurav-Astro/AssistAI.git
   cd AssistAI
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the project root and add your API key:

   ```env
   GOOGLE_GENAI_API_KEY=your_google_gemini_api_key_here
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:9002](http://localhost:9002) in your browser.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server on port 9002 (with Turbopack) |
| `npm run build` | Build the application for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint to check code quality |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run genkit:dev` | Start the Genkit AI developer UI |
| `npm run genkit:watch` | Start Genkit in watch mode for development |

---

## 📂 Project Structure

```
AssistAI/
├── src/
│   ├── ai/
│   │   ├── flows/
│   │   │   ├── ai-chat-assistant.ts          # Chat AI flow (Genkit)
│   │   │   ├── real-time-object-identification.ts  # Vision AI flow (Genkit)
│   │   │   └── sign-language-converter.ts    # ASL recognition flow (Genkit)
│   │   ├── genkit.ts                         # Genkit configuration
│   │   └── dev.ts                            # Genkit dev server entry
│   ├── app/
│   │   ├── chat/                             # AI Chat page
│   │   ├── vision/                           # Vision Help page
│   │   ├── sign-language/                    # Sign Language page
│   │   ├── settings/                         # Settings page
│   │   ├── layout.tsx                        # Root layout
│   │   └── page.tsx                          # Home / landing page
│   ├── components/
│   │   ├── ui/                               # Reusable shadcn/ui components
│   │   ├── chat-interface.tsx                # Chat UI component
│   │   ├── vision-interface.tsx              # Vision UI component
│   │   ├── sign-language-interface.tsx       # Sign language UI component
│   │   ├── site-header.tsx                   # Top navigation header
│   │   └── theme-toggle.tsx                  # Light/dark mode toggle
│   ├── hooks/                                # Custom React hooks
│   ├── lib/                                  # Utility functions
│   └── config/                               # App configuration
├── apphosting.yaml                           # Firebase App Hosting config
├── next.config.ts                            # Next.js configuration
├── tailwind.config.ts                        # Tailwind CSS configuration
└── tsconfig.json                             # TypeScript configuration
```

---

## ☁️ Deployment

### Firebase App Hosting (Recommended)

This project is pre-configured for [Firebase App Hosting](https://firebase.google.com/docs/app-hosting).

1. Install the Firebase CLI: `npm install -g firebase-tools`
2. Log in: `firebase login`
3. Deploy: `firebase apphosting:backends:create` (first time) or push to your connected branch.

Configuration is managed in [`apphosting.yaml`](./apphosting.yaml).

---

## ♿ Accessibility

AssistAI is built with accessibility as a core principle:

- **Keyboard navigation** support throughout the app
- **Skip-to-content** link for screen reader users
- **ARIA attributes** on all interactive elements
- **Responsive design** that works on all screen sizes and devices
- **Dark mode** support respecting system preferences

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

Please make sure your code passes lint and type checks before submitting:

```bash
npm run lint && npm run typecheck
```

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.

---

<div align="center">

Made with ❤️ to make the world more accessible

</div>
