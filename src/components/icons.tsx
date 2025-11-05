import { type LucideProps, MessageCircle, Eye } from "lucide-react";

export const Icons = {
  logo: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 8V6.5A2.5 2.5 0 1 0 9.5 9" />
      <path d="M12 17.5A2.5 2.5 0 1 1 9.5 15" />
      <path d="M12 8h2a2 2 0 1 1 0 4h-2V8Z" />
      <path d="M12 12h2a2 2 0 1 0 0-4h-2v4Z" />
      <path d="M12 16h2a2 2 0 1 1 0 4h-2v-4Z" />
      <path d="M12 12v4" />
      <path d="M12 8v4" />
    </svg>
  ),
};
