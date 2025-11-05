
export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "AssistAI",
  description:
    "An AI-powered real-time guidance system for specially abled people.",
  mainNav: [
    {
      title: "Home",
      href: "/",
      label: "Home"
    },
    {
      title: "Chat",
      href: "/chat",
      label: "Chat"
    },
    {
      title: "Vision",
      href: "/vision",
      label: "Vision"
    },
    {
      title: "Sign Language",
      href: "/sign-language",
      label: "Sign Language"
    },
  ],
  links: {
    settings: "/settings",
  },
};
