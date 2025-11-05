"use client";

import Link from 'next/link';
import {
  MessageCircle,
  Eye,
  Navigation,
  Cog,
  Hand,
} from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'AI Chat Assistant',
    description: 'Talk with our AI for real-time guidance.',
    href: '/chat',
    icon: MessageCircle,
    color: 'text-blue-500',
  },
  {
    title: 'Vision Help',
    description: 'Identify objects and scenes around you.',
    href: '/vision',
    icon: Eye,
    color: 'text-green-500',
  },
  {
    title: 'Sign Language',
    description: 'Convert sign language gestures to text.',
    href: '/sign-language',
    icon: Hand,
    color: 'text-orange-500',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export default function Home() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 sm:py-16">
      <header className="mb-12 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl font-headline"
        >
          Welcome to AssistAI
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          className="mt-4 text-lg text-muted-foreground sm:text-xl"
        >
          Your personal guide to a more accessible world. How can I help you
          today?
        </motion.p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -8, scale: 1.03, transition: { type: "spring", stiffness: 300 } }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href={feature.href} passHref className="h-full">
              <Card
                className="group relative h-full transform-gpu overflow-hidden rounded-2xl border-2 transition-shadow duration-300 ease-in-out hover:shadow-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <CardHeader className="p-6">
                  <div className="mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-primary/10">
                    <feature.icon
                      className={`h-7 w-7 sm:h-8 sm:w-8 ${feature.color}`}
                      aria-hidden="true"
                    />
                  </div>
                  <CardTitle className="text-xl sm:text-2xl font-bold font-headline text-card-foreground">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="mt-2 text-base text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
