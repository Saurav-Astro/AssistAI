"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSpeak } from "@/hooks/use-speak";
import { aiChatAssistant } from "@/ai/flows/ai-chat-assistant";
import type { AIChatAssistantInput } from "@/ai/flows/ai-chat-assistant";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { speak } = useSpeak();

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector("div[data-radix-scroll-area-viewport]");
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    setTimeout(scrollToBottom, 100);

    try {
      const chatHistory = messages.map(msg => ({ role: msg.role, content: msg.content })) as AIChatAssistantInput['history'];

      const response = await aiChatAssistant({
        message: input,
        history: chatHistory,
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.text,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      speak(response.text);
    } catch (error) {
      console.error("Error communicating with AI assistant:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm sorry, but I'm having trouble connecting. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
      speak(errorMessage.content);
    } finally {
      setIsLoading(false);
      setTimeout(scrollToBottom, 100);
    }
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="container mx-auto max-w-3xl px-4 py-8">
          <AnimatePresence>
            {messages.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center text-muted-foreground"
                >
                    <p>Start a conversation with your AI Assistant.</p>
                </motion.div>
            )}
            {messages.map((message) => (
              <motion.div
                key={message.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "mb-6 flex items-start gap-3 sm:gap-4",
                  message.role === "user" && "justify-end"
                )}
              >
                {message.role === "assistant" && (
                  <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border">
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-[80%] sm:max-w-md rounded-2xl p-3 sm:p-4",
                    message.role === "user"
                      ? "rounded-br-none bg-primary text-primary-foreground"
                      : "rounded-bl-none bg-card text-card-foreground shadow-sm"
                  )}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mt-2 h-6 w-6 text-muted-foreground"
                    onClick={() => speak(message.content)}
                    aria-label="Read message aloud"
                  >
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>
                 {message.role === "user" && (
                  <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border">
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                )}
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                key="loading"
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6 flex items-start gap-4"
              >
                <Avatar className="h-10 w-10 border">
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div className="max-w-md rounded-2xl rounded-bl-none bg-card p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground" />
                    <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground [animation-delay:0.2s]" />
                    <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground [animation-delay:0.4s]" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScrollArea>
      <div className="border-t bg-background">
        <div className="container mx-auto max-w-3xl p-4">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="h-12 flex-1 text-base"
              aria-label="Chat message input"
            />
            <Button
              type="submit"
              size="icon"
              className="h-12 w-12"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
            >
              <Send className="h-6 w-6" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
