"use client";

import { motion } from "framer-motion";
import { World } from "@/data/worlds";

interface WorldCardProps {
  world: World;
}

export function WorldCard({ world }: WorldCardProps) {
  return (
    <motion.article
      key={world.id}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br ${world.bgFrom} ${world.bgTo} ${world.textColor}`}
      role="region"
      aria-label={`Message de bienvenue du monde : ${world.name}`}
    >
      {/* Header */}
      <header className="flex items-center gap-4 px-6 pt-6 pb-4 border-b border-white/10">
        <span
          className="text-5xl leading-none select-none"
          role="img"
          aria-label={world.name}
        >
          {world.emoji}
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest opacity-60 mb-1">
            Monde
          </p>
          <h2 className="text-xl font-bold leading-tight">{world.name}</h2>
        </div>
      </header>

      {/* Greeting */}
      <div className="px-6 py-5">
        <blockquote className="text-base sm:text-lg leading-relaxed italic opacity-90">
          &ldquo;{world.greeting}&rdquo;
        </blockquote>
        <footer className="mt-4 text-sm opacity-60 not-italic">{world.signature}</footer>
      </div>

      {/* Style tag */}
      <div className="px-6 pb-5">
        <span
          className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${world.accentColor} text-white/90`}
        >
          {world.style}
        </span>
      </div>
    </motion.article>
  );
}
