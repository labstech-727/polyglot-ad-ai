import { motion } from "framer-motion";
import { Sparkles, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="relative overflow-hidden border-b border-emerald-100/50 bg-gradient-to-b from-emerald-50/80 to-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl" />
      </div>

      <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-700 text-white shadow-sm">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-emerald-900" style={{ fontFamily: "Outfit, sans-serif" }}>
            AdGen<span className="text-amber-600">AI</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 gap-1.5">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Hausa / English</span>
          </Button>
        </div>
      </nav>

      <section className="relative z-10 mx-auto max-w-4xl px-4 pb-16 pt-12 text-center sm:px-6 sm:pb-20 sm:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Ad Generator
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-emerald-950 sm:text-5xl md:text-6xl" style={{ fontFamily: "Outfit, sans-serif" }}>
            AdGenAI{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent">
              Create Ads
            </span>{" "}
            in Any Language with AI
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-emerald-800/70 sm:text-lg">
            Ka kirkiro bidiyon tallan TikTok/Reels a cikin dakika 60 kawai.
            Create professional video ads in 60 seconds using AI voice transcription.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              className="h-11 rounded-full bg-emerald-700 px-6 text-white shadow-md hover:bg-emerald-800 active:scale-[0.98]"
              onClick={() => document.getElementById("generator-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              Fara Kirkira / Start Creating
              <Sparkles className="ml-1.5 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 rounded-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 active:scale-[0.98]"
              onClick={() => document.getElementById("templates")?.scrollIntoView({ behavior: "smooth" })}
            >
              Duba Samfura / View Templates
            </Button>
          </div>
        </motion.div>
      </section>
    </header>
  );
}