"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { Breadcrumb, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Bot } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { SignOutButton, UserButton } from "@clerk/clerk-react";
import ToogleTheme from "@/components/toogle-theme";
import Speech from "@/components/userSpeech";

export default function Page() {
  const [messages, setMessages] = useState<
    { sender: string; text: string; id: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // this is where the chat response is being handled
  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "You", text: input, id: `user-${Date.now()}` };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const { data } = await axios.post("/api/chat", {
        message: input,
      });
      setMessages((prev) => [
        ...prev,
        { sender: "Bot", text: data.reply, id: `bot-${Date.now()}` },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "Bot",
          text: "Error processing request",
          id: `error-${Date.now()}`,
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar className="bg-slate-900" />
      <SidebarInset className="flex flex-col h-screen overflow-hidden bg-slate-900">
        {/* Header with sidebar trigger */}
        <header className="flex h-14 md:h-16 shrink-0 items-center gap-2 border-b px-3 md:px-4 bg-slate-800 border-slate-700">
          <SidebarTrigger className="-ml-1 text-orange-400 hover:bg-slate-700" />
          <Separator orientation="vertical" className="mr-2 h-4 bg-slate-700" />
          <Breadcrumb>
            <BreadcrumbList>
              <h1 className="text-lg md:text-2xl font-bold text-orange-400 flex items-center">
                <Bot className="mr-2 size-4 md:size-6" /> ჭორიკანა
              </h1>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto justify-end flex gap-2 md:gap-4 items-center">
            <SignOutButton redirectUrl="/">
              <Button
                variant="outline"
                size="sm"
                className="border-slate-600 hover:bg-slate-700 text-orange-400 h-8 px-2 md:h-10 md:px-4"
              >
                <span className="hidden sm:inline">გამოსვლა</span>
                <span className="sm:hidden">გამოსვლა</span>
              </Button>
            </SignOutButton>
            <ToogleTheme />
          </div>
        </header>

        {/* Main chat area */}
        <div className="flex-grow overflow-hidden p-1 sm:p-4 w-full bg-slate-900">
          <Card className="h-full flex flex-col bg-slate-800 border-slate-700 shadow-lg">
            <CardContent className="p-2 sm:p-6 flex flex-col h-full">
              {/* Messages */}
              <div 
                ref={chatContainerRef}
                className="flex-grow overflow-y-auto pr-1 md:pr-2 space-y-3 md:space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800"
              >
                {messages.length === 0 && (
                  <div className="text-center text-slate-400 py-4 sm:py-12 transition-opacity duration-300">
                    <div className="inline-block p-2 sm:p-4 rounded-full bg-slate-700 mb-2 sm:mb-4">
                      <Bot size={24} className="text-orange-400" />
                    </div>
                    <p className="text-sm sm:text-lg">
                      <strong>მოდი მეჭორავე</strong>, აბა ვიზე გიდა საუბარი ჩემო ლამაზო
                    </p>
                    <p className="text-xs mt-1 text-slate-500">
                      პაწი მომენატრე
                    </p>
                  </div>
                )}

                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"} transition-all duration-300 animate-fadeIn`}
                  >
                    <div
                      className={`flex items-start gap-1 sm:gap-2 max-w-[85%] sm:max-w-[80%] ${msg.sender === "You" ? "flex-row-reverse" : ""}`}
                    >
                      <div
                        className={`flex-none w-6 h-6 rounded-full flex items-center justify-center ${
                          msg.sender === "You" ? "" : "bg-slate-700"
                        }`}
                      >
                        {msg.sender === "You" ? (
                          <div className="w-5 h-5 bg-slate-700 rounded-full">
                            <UserButton />
                          </div>
                        ) : (
                          <Bot size={16} />
                        )}
                      </div>

                      <div
                        className={`p-2 sm:p-3 rounded-lg ${
                          msg.sender === "You"
                            ? "bg-orange-500 text-slate-900"
                            : "bg-slate-700 text-slate-100"
                        }`}
                      >
                        <p className="whitespace-pre-wrap break-words text-xs sm:text-sm md:text-base">
                          {msg.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start transition-all duration-300 animate-fadeIn">
                    <div className="flex items-start gap-1 sm:gap-2 max-w-[85%] sm:max-w-[80%]">
                      <div className="flex-none w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center">
                        <Bot size={16} />
                      </div>

                      <div className="p-2 sm:p-3 rounded-lg bg-slate-700">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-150"></div>
                          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-300"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <Separator className="my-2 bg-slate-700" />

              {/* Input area - Fixed height container */}
              <div className="flex-none mt-1">
                <div className="flex gap-2 items-center bg-slate-700 rounded-lg p-1 sm:p-2">
                  <div className="flex-grow relative h-10 sm:h-12">
                    <Textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="ჭორაობის დროა..."
                      className="absolute inset-0 bg-slate-700 border-blue-900 focus:border-orange-500 focus:ring-orange-500 overflow-y-auto text-slate-100 text-xs sm:text-sm py-2 min-h-0"
                    />
                  </div>
                  <div className="flex-none flex gap-1">
                    <Speech />
                    <Button
                      onClick={sendMessage}
                      disabled={loading || !input.trim()}
                      className="flex-none bg-orange-500 hover:bg-orange-600 text-slate-900 h-8 sm:h-10 w-8 sm:w-10 p-0"
                    >
                      {!loading && <Send size={16} className="mx-auto" />}
                      {loading && (
                        <div className="h-3 w-3 sm:h-4 sm:w-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}