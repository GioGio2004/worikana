"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, MessageCircle, Shield, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LandingPage() {


  return (
    <div className="flex flex-col min-h-screen bg-slate-900">
      {/* Header */}
      <header className="flex-none p-4 bg-slate-800 border-b border-slate-700">
        <div className="container mx-auto flex items-center justify-between">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <Bot size={32} className="text-orange-400" />
            <h1 className="text-2xl font-bold text-orange-400">ჭორიკანა</h1>
          </motion.div>

          <div className="flex gap-4">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {" "}
              <Link href={"/sign-in"}>
                <Button
                  variant="outline"
                  className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-slate-900"
                >
                  შესვლა
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link href={"/sign-up"}>
                <Button className="bg-orange-500 hover:bg-orange-600 text-slate-900">
                  რეგისტრაცია
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <div className="container mx-auto grid md:grid-cols-2 gap-8 py-16 px-4">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-orange-400 mb-6">
            შენი ჭორიკანა ასისტენტი
            </h2>
            <p className="text-slate-300 text-lg mb-8">
             გაიგე ყველაზე და ყველაფერზე რაც კი გაინტერესებს უბრალოდ მითხარი პაწი 😏️  
             სულ გაფაციცებული ვუსმენს ყველაფერს რაც შენს ირგვლივ ხდება
            </p>

            <div className="space-y-4 mb-8">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-start gap-3"
              >
                <div className="p-2 rounded-full bg-orange-500/20 text-orange-400">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <p className="text-slate-400">
                   გაიგე ყველაფერ
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex items-start gap-3"
              >
                <div className="p-2 rounded-full bg-orange-500/20 text-orange-400">
                  <Shield size={18} />
                </div>
                <div>
                  <p className="text-slate-400">
                    მოაგროვე ინფორმაცია ყველაზე ისე რო ვერავინ გაიგოს 🤫
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex items-start gap-3"
              >
                <div className="p-2 rounded-full bg-orange-500/20 text-orange-400">
                  <Sparkles size={18} />
                </div>
                <div>
                  <p className="text-slate-400">
                    გაგვიზიარე შენი ამბები 
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={"/sign-in"}>
              <Button className="bg-orange-500 hover:bg-orange-600 text-slate-900 w-fit text-lg px-12 mr-10 py-6 h-auto group">
                გაიგე ყველაფერი{" "}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex justify-center items-center"
          >
            <Card className="w-full max-w-md bg-slate-800 border-slate-700 shadow-xl overflow-hidden">
              <CardContent className="p-0">
                <div className="relative w-full h-96">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="p-8 text-center">
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, 0, -5, 0],
                        }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="mb-6 inline-block"
                      >
                        <Bot size={80} className="text-orange-400" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-slate-100 mb-2">
                        მზაად ხარ? 
                      </h3>
                      <p className="text-slate-400 mb-6">
                        შენს სამსახურში თუ რამეში დაგჭირდე 
                      </p>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button className="bg-orange-500 hover:bg-orange-600 text-slate-900">
                          დაიწყე ჭორაობა
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex-none bg-slate-800 border-t border-slate-700 py-6 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="flex items-center gap-2 mb-4 md:mb-0"
            >
              <Bot size={24} className="text-orange-400" />
              <span className="text-slate-300">© 2025 ჭორკანა</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="flex gap-6"
            >
              <a href="#" className="text-slate-400 hover:text-orange-400">
                Privacy
              </a>
              <a href="#" className="text-slate-400 hover:text-orange-400">
                Terms
              </a>
              <a href="#" className="text-slate-400 hover:text-orange-400">
                Contact
              </a>
              <a href="#" className="text-slate-400 hover:text-orange-400">
                Help
              </a>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}
