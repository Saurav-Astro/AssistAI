<div align="center">

# 🤖 AssistAI

**An AI-powered accessibility companion for specially-abled people**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-App_Hosting-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Google Gemini](https://img.shields.io/badge/Powered_by-Gemini_AI-4285F4?logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)
[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e.svg)](LICENSE)

*Empowering independence through AI — for the visually impaired, hearing impaired, and beyond.*

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [How It Works](#-how-it-works)
- [Tech Stack](#️-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Deployment](#️-deployment)
- [Accessibility](#-accessibility)
- [Roadmap](#-roadmap)
- [FAQ](#-faq)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📖 Overview

AssistAI is a modern, accessible web application built to empower individuals with special needs. Powered by Google's Gemini AI through Firebase Genkit, it provides real-time guidance through an intuitive interface with three core capabilities: **conversational AI assistance**, **visual scene understanding**, and **American Sign Language recognition**.

Whether you are visually impaired and need help identifying your surroundings, hearing-impaired and looking to communicate through sign language, or simply need a reliable AI companion for real-time guidance — AssistAI has you covered.

---

## ✨ Features

| Feature | Description |
|---|---|
| 💬 **AI Chat Assistant** | Context-aware conversations with conversation history |
| 👁️ **Vision Help** | Camera-based real-time object & scene identification |
| 🤟 **Sign Language Converter** | ASL hand sign recognition to text via webcam |
| 🌙 **Dark / Light Mode** | Automatic system theme detection with manual toggle |
| 📱 **Responsive Design** | Optimized for mobile, tablet, and desktop |

### 💬 AI Chat Assistant
Have natural, context-aware conversations with a Gemini-powered AI assistant. Get real-time guidance, answers to questions, and helpful information — all in a friendly chat interface that maintains full conversation history across the session.

### 👁️ Vision Help
Point your device camera at the world around you and let AssistAI describe what it sees. The AI vision module identifies objects, people, scenes, and text, helping users navigate and understand their surroundings independently.

### 🤟 Sign Language Converter
Show an American Sign Language (ASL) hand sign to the camera and instantly receive the corresponding word or letter as text. Built to bridge communication gaps for the hearing-impaired community.

---

## ⚙️ How It Works

AssistAI uses **[Firebase Genkit](https://firebase.google.com/docs/genkit)** to define structured AI flows that connect Next.js server actions to the **Google Gemini** large language model.

```
User Input (text / camera)
        │
        ▼
  Next.js Server Action
        │
        ▼
  Genkit AI Flow  ──►  Google Gemini API
        │
        ▼
  Structured JSON Output
        │
        ▼
   React UI Update
```

Each feature maps to a dedicated Genkit flow:

| Flow file | Capability | Input | Output |
|---|---|---|---|
| `ai-chat-assistant.ts` | Conversational AI | Text + history | AI text response |
| `real-time-object-identification.ts` | Vision analysis | Camera image (data URI) | Object description |
| `sign-language-converter.ts` | ASL recognition | Hand-sign image (data URI) | Translated word/letter |

Zod schemas enforce strict input/output types at every step, ensuring reliability and type safety from the AI model through to the UI.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router, React Server Components, Turbopack) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **AI / LLM** | [Google Gemini](https://deepmind.google/technologies/gemini/) via [Firebase Genkit](https://firebase.google.com/docs/genkit) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) + [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate) |
| **UI Components** | [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Forms** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **Camera** | [react-webcam](https://github.com/mozmorris/react-webcam) |
| **Backend / Hosting** | [Firebase](https://firebase.google.com/) (App Hosting) |

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

   > 💡 You can get a free Gemini API key at [Google AI Studio](https://aistudio.google.com/app/apikey).

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
│   │   │   ├── ai-chat-assistant.ts              # Chat AI flow (Genkit)
│   │   │   ├── real-time-object-identification.ts # Vision AI flow (Genkit)
│   │   │   └── sign-language-converter.ts         # ASL recognition flow (Genkit)
│   │   ├── genkit.ts                              # Genkit + Gemini configuration
│   │   └── dev.ts                                 # Genkit dev server entry
│   ├── app/
│   │   ├── chat/                                  # AI Chat page
│   │   ├── vision/                                # Vision Help page
│   │   ├── sign-language/                         # Sign Language page
│   │   ├── settings/                              # Settings page
│   │   ├── layout.tsx                             # Root layout + metadata
│   │   └── page.tsx                               # Home / landing page
│   ├── components/
│   │   ├── ui/                                    # Reusable shadcn/ui components
│   │   ├── chat-interface.tsx                     # Chat UI component
│   │   ├── vision-interface.tsx                   # Vision UI component
│   │   ├── sign-language-interface.tsx            # Sign language UI component
│   │   ├── site-header.tsx                        # Top navigation header
│   │   └── theme-toggle.tsx                       # Light/dark mode toggle
│   ├── hooks/                                     # Custom React hooks
│   ├── lib/                                       # Utility functions
│   └── config/                                    # App configuration
├── apphosting.yaml                                # Firebase App Hosting config
├── next.config.ts                                 # Next.js configuration
├── tailwind.config.ts                             # Tailwind CSS configuration
└── tsconfig.json                                  # TypeScript configuration
```

---

## ☁️ Deployment

### Firebase App Hosting (Recommended)

This project is pre-configured for [Firebase App Hosting](https://firebase.google.com/docs/app-hosting).

1. **Install the Firebase CLI**

   ```bash
   npm install -g firebase-tools
   ```

2. **Log in to Firebase**

   ```bash
   firebase login
   ```

3. **Create a backend** (first time only)

   ```bash
   firebase apphosting:backends:create
   ```

4. **Deploy** by pushing to your connected Git branch — Firebase App Hosting automatically builds and deploys on every push.

Configuration is managed in [`apphosting.yaml`](./apphosting.yaml). The app is configured to run with `maxInstances: 1` by default; increase this value in `apphosting.yaml` to scale for higher traffic.

### Other Platforms

Because AssistAI is a standard Next.js application, it can also be deployed to:

- [Vercel](https://vercel.com/) — `npx vercel`
- [Cloudflare Pages](https://pages.cloudflare.com/) — see `wrangler.jsonc` for Cloudflare Workers config

---

## ♿ Accessibility

AssistAI is built with accessibility as a core principle:

- ⌨️ **Keyboard navigation** — full keyboard support throughout the app
- 🔗 **Skip-to-content link** — lets screen reader users jump directly to main content
- 🏷️ **ARIA attributes** — meaningful labels on all interactive elements
- 📐 **Responsive design** — works across all screen sizes and devices
- 🌙 **Dark / Light mode** — respects system preferences with a manual override
- 🎯 **Focus management** — visible focus rings for all focusable elements

---

## 🗺️ Roadmap

- [ ] Multi-language support for the chat assistant
- [ ] Text-to-speech output for vision and chat responses
- [ ] Support for additional sign languages (BSL, ISL, etc.)
- [ ] Offline mode with on-device AI models
- [ ] User accounts and saved conversation history
- [ ] Mobile app (React Native / Capacitor)

---

## ❓ FAQ

**Do I need a paid API key to use AssistAI?**

No. Google AI Studio provides a free tier for the Gemini API that is sufficient for development and light usage.

**Which sign languages are supported?**

Currently, AssistAI supports American Sign Language (ASL). Support for additional sign languages is on the roadmap.

**Does the camera feed get stored or sent to a server permanently?**

No. Camera frames are captured client-side, sent to the AI model for a single inference call, and are not stored.

**Can I use AssistAI on a mobile device?**

Yes. AssistAI is fully responsive and works in mobile browsers. Camera features use the device's front or rear camera.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** your feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open a Pull Request** describing your changes

Please make sure your code passes lint and type checks before submitting:

```bash
npm run lint && npm run typecheck
```

### Reporting Issues

Found a bug or have a feature request? Please [open an issue](https://github.com/Saurav-Astro/AssistAI/issues) with a clear description and steps to reproduce.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

<div align="center">

Built with ❤️ to make the world more accessible

⭐ Star this repo if you find it helpful!

</div>
