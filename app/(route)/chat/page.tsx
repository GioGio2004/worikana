"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
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
  // const [chatId, setChatId] = useState<string | undefined>(undefined);
  const [messages, setMessages] = useState<{ sender: string; text: string; id: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Load chat history when chatId changes
  // useEffect(() => {
  //   if (chatId) {
  //     console.log(`Loading chat history for ${chatId}`);
  //     setMessages([]);
  //   }
  // }, [chatId]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);


  // this is where the caht response is being handled
  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "You", text: input, id: `user-${Date.now()}` };
    setMessages(prev => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const { data } = await axios.post("/api/chat", { 
        message: input,
        // chatId: chatId
      });
      setMessages(prev => [...prev, { sender: "Bot", text: data.reply, id: `bot-${Date.now()}` }]);
    } catch {
      setMessages(prev => [...prev, { sender: "Bot", text: "Error processing request", id: `error-${Date.now()}` }]);
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

  const adjustTextareaHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 150) + "px";
    setInput(textarea.value);
  };

  return (
    <SidebarProvider >
      <AppSidebar className="bg-slate-900"/>
      <SidebarInset className="flex flex-col h-screen overflow-hidden bg-slate-900">
        {/* Header with sidebar trigger */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-slate-800 border-slate-700">
          <SidebarTrigger className="-ml-1 text-orange-400 hover:bg-slate-700" />
          <Separator orientation="vertical" className="mr-2 h-4 bg-slate-700" />
          <Breadcrumb>
            <BreadcrumbList>
              <h1 className="text-xl md:text-2xl font-bold text-orange-400 flex items-center">
                <Bot className="mr-2" /> ჭორიკანა{" "}
                {/* {chatId ? `- ${chatId}` : ""} */}
              </h1>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto justify-end flex gap-4 items-center">
            <SignOutButton redirectUrl="/">
              <Button
                variant="outline"
                className="border-slate-600 hover:bg-slate-700 text-orange-400"
              >
                <span className="hidden sm:inline">გამოსვლა</span>
                
                <span className="sm:hidden">გამოსვლა</span>
              
              </Button>
            </SignOutButton>
            <ToogleTheme />
          </div>
        </header>

        {/* Main chat area */}
        <div className="flex-grow overflow-hidden p-2 sm:p-4 w-full bg-slate-900">
          <Card className="h-full flex flex-col bg-slate-800 border-slate-700 shadow-lg">
            <CardContent className="p-3 sm:p-6 flex flex-col h-full">
              {/* Messages */}
              <div className="flex-grow overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800">
                {messages.length === 0 && (
                  <div className="text-center text-slate-400 py-6 sm:py-12 transition-opacity duration-300">
                    <div className="inline-block p-3 sm:p-4 rounded-full bg-slate-700 mb-3 sm:mb-4">
                      <Bot size={28} className="text-orange-400" />
                    </div>
                    <p className="text-base sm:text-lg">
                      <strong>მოდი მეჭორავე</strong>, აბა ვიზე გიდა
                      საუბარი ჩემო ლამაზო
                    </p>
                    <p className="text-xs sm:text-sm mt-2 text-slate-500">
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
                        className={`flex-none w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                          msg.sender === "You"
                            ? ""
                            : "bg-slate-700"
                        }`}
                      >
                        {msg.sender === "You" ? (
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-slate-700 rounded-full"> 
                            <UserButton />
                          </div>
                        ) : (
                          <Bot size={8} className="sm:size-8" />
                        )}
                      </div>

                      <div
                        className={`p-2 sm:p-4 rounded-lg ${
                          msg.sender === "You"
                            ? "bg-orange-500 text-slate-900"
                            : "bg-slate-700 text-slate-100"
                        }`}
                      >
                        <p className="whitespace-pre-wrap break-words text-sm sm:text-base">
                          {msg.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start transition-all duration-300 animate-fadeIn">
                    <div className="flex items-start gap-1 sm:gap-2 max-w-[85%] sm:max-w-[80%]">
                      <div className="flex-none w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-700 flex items-center justify-center">
                        <Bot size={14} className="sm:size-16" />
                      </div>

                      <div className="p-2 sm:p-4 rounded-lg bg-slate-700">
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

              <Separator className="my-2 sm:my-4 bg-slate-700" />

              {/* Input area */}
              <div className="flex-none mt-1 sm:mt-2">
                <div className="flex gap-2 items-end bg-slate-700 rounded-lg p-1 sm:p-2">
                  <Textarea
                    ref={inputRef}
                    value={input}
                    onChange={adjustTextareaHeight}
                    onKeyDown={handleKeyDown}
                    placeholder="ჭორაობის დროა..."
                    className="flex-grow bg-slate-700 border-blue-900 focus:border-orange-500 focus:ring-orange-500 resize-none min-h-[36px] sm:min-h-[40px] max-h-[100px] sm:max-h-[150px] text-slate-100 text-sm sm:text-base"
                    style={{ height: "auto" }}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={loading || !input.trim()}
                    className="flex-none bg-orange-500 hover:bg-orange-600 text-slate-900 h-8 sm:h-10 px-2 sm:px-4 relative"
                  >
                    {!loading && <Send size={10} />}
                    {loading && (
                      <div className="h-3 w-3 sm:h-4 sm:w-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                    )}
                  </Button>
                </div>
              </div>
              {/* speak with ai */}
               <Speech />
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}