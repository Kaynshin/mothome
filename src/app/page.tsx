"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { WorldCard } from "@/components/WorldCard";
import { worlds, World } from "@/data/worlds";

function pickRandomWorld(excludeId?: string): World {
  const candidates = excludeId
    ? worlds.filter((w) => w.id !== excludeId)
    : worlds;
  const index = Math.floor(Math.random() * candidates.length);
  return candidates[index];
}

export default function Home() {
  const [currentWorld, setCurrentWorld] = useState<World | null>(null);
  const lastWorldIdRef = useRef<string | undefined>(undefined);

  const handleNewWorld = useCallback(() => {
    const next = pickRandomWorld(lastWorldIdRef.current);
    lastWorldIdRef.current = next.id;
    setCurrentWorld(next);
  }, []);

  useEffect(() => {
    handleNewWorld();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center gap-8 px-4 py-12">
      {/* Title */}
      <header className="text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Hello World
          <span className="text-indigo-400"> Multiverse</span>
        </h1>
        <p className="mt-2 text-gray-400 text-sm sm:text-base max-w-sm">
          Un monde différent. Un message d&apos;accueil humoristique. À chaque fois.
        </p>
      </header>

      {/* World Card with AnimatePresence */}
      <section
        className="w-full max-w-2xl"
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence mode="wait">
          {currentWorld && (
            <WorldCard key={currentWorld.id} world={currentWorld} />
          )}
        </AnimatePresence>
      </section>

      {/* Action Button */}
      <button
        onClick={handleNewWorld}
        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-colors duration-150"
        aria-label="Voyager vers un nouveau monde"
        type="button"
      >
        <span aria-hidden="true">🌍</span>
        Nouveau monde
      </button>

      {/* Footer */}
      <footer className="text-gray-600 text-xs text-center">
        {worlds.length} mondes disponibles · Unicorn Agency
      </footer>
    </main>
  );
}
