"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

/*
  RSYS – Round 1 Presentation Website (FINAL – CONTENT ENRICHED)
  -------------------------------------------------------------
  ✔ Same structure & animations
  ✔ Much richer explanations (judge-friendly)
  ✔ Still 5-minute safe
  ✔ No new tech / no new complexity
*/

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";


/* ───────────────── ANIMATION CONFIG ───────────────── */
const slideVariants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.25 },
  },
};

export default function PresentationPage() {
  const [mode, setMode] = useState<"scroll" | "slides">("scroll");
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = ["hero", "problem", "approach", "wireflow", "difference"];
  const current = slides[slideIndex];

  useEffect(() => {
  if (mode !== "slides") return;

  function handleKey(e: KeyboardEvent) {
    if (e.key === "ArrowRight") {
      setSlideIndex((i) => Math.min(i + 1, slides.length - 1));
    }
    if (e.key === "ArrowLeft") {
      setSlideIndex((i) => Math.max(i - 1, 0));
    }
  }

  window.addEventListener("keydown", handleKey);
  return () => window.removeEventListener("keydown", handleKey);
}, [mode, slides.length]);


  return (
    <main className="relative min-h-screen bg-slate-950 text-white overflow-hidden">
      <GlowBackground />

      {/* MODE TOGGLE */}
      <div className="fixed top-6 right-6 z-50 flex gap-2">
        <ToggleButton active={mode === "scroll"} onClick={() => setMode("scroll")}>
          Scroll
        </ToggleButton>
        <ToggleButton active={mode === "slides"} onClick={() => setMode("slides")}>
          Slides
        </ToggleButton>
      </div>

      {/* SLIDE PROGRESS */}
      {mode === "slides" && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 text-center">
          <div className="flex justify-center gap-2 mb-2">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full ${
                  i === slideIndex ? "bg-white" : "bg-white/30"
                }`}
              />
            ))}
          </div>
          <div className="text-xs uppercase tracking-widest text-white/70">
            {slides[slideIndex]}
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {(mode === "scroll" || current === "hero") && (
          <Slide key="hero">
            <Hero />
          </Slide>
        )}

        {(mode === "scroll" || current === "problem") && (
          <Slide key="problem">
            <Problem />
          </Slide>
        )}

        {(mode === "scroll" || current === "approach") && (
          <Slide key="approach">
            <Approach />
          </Slide>
        )}

        {(mode === "scroll" || current === "wireflow") && (
          <Slide key="wireflow">
            <Wireflow />
          </Slide>
        )}

        {(mode === "scroll" || current === "difference") && (
          <Slide key="difference">
            <Difference />
          </Slide>
        )}
      </AnimatePresence>

      {/* SLIDE NAV */}
      {mode === "slides" && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-4">
          <NavButton
            disabled={slideIndex === 0}
            onClick={() => setSlideIndex((i) => i - 1)}
          >
            ← Prev
          </NavButton>
          <NavButton
            disabled={slideIndex === slides.length - 1}
            onClick={() => setSlideIndex((i) => i + 1)}
          >
            Next →
          </NavButton>
        </div>
      )}
    </main>
  );
}

/* ───────────────── SLIDE WRAPPER ───────────────── */
function Slide({ children }: { children: React.ReactNode }) {
  return (
    <motion.section
      variants={slideVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen flex items-center justify-center px-6"
    >
      {children}
    </motion.section>
  );
}

/* ───────────────── SECTIONS ───────────────── */

function Hero() {
  return (
    <div className="text-center max-w-3xl">
      <h1 className="text-6xl font-bold">RSYS</h1>
      <p className="mt-6 text-xl text-slate-300">
        A disaster relief system where corruption, misuse of funds, and blind
        trust are{" "}
        <span className="text-white font-semibold">
          eliminated by design
        </span>
        .
      </p>
      <p className="mt-4 text-slate-400 text-sm">
        Built using smart contracts to enforce how aid money is approved,
        distributed, and audited — without relying on human honesty.
      </p>
      
    </div>
  );
}

function Problem() {
  return (
    <Card title="The Problem With Disaster Relief Today">
      <p className="text-slate-300">
        Disaster relief systems usually break <b>after</b> donations are
        collected. Once funds enter the system, donors lose visibility and
        control.
      </p>
      <ul className="list-disc list-inside mt-6 space-y-2 text-slate-400">
        <li>Funds are managed by centralized authorities</li>
        <li>Spending decisions are opaque and manual</li>
        <li>Corruption and delays are difficult to detect</li>
        <li>Donors cannot verify real-world outcomes</li>
      </ul>
      <p className="mt-4 text-slate-400 text-sm">
        Existing systems rely on trust. RSYS removes that assumption.
      </p>
    </Card>
  );
}

function Approach() {
  return (
    <Grid title="The RSYS Approach">
      <Node title="Enforcement Over Trust">
        Instead of trusting administrators, RSYS enforces rules directly at the
        smart contract level. Invalid actions simply fail on-chain.
      </Node>
      <Node title="NFT-Based Roles">
        Campaign admins, volunteers, victims, and service providers are all
        represented by NFTs that strictly define what actions an address can
        perform.
      </Node>
      <Node title="Funds Are Never Custodied">
        No individual or organization can directly access donated funds. Funds
        remain locked inside contracts until conditions are satisfied.
      </Node>
      <Node title="Transparent by Default">
        Every approval, verification, and payout emits on-chain events that can
        be independently audited by anyone.
      </Node>
    </Grid>
  );
}

function Wireflow() {
  const steps = [
    "Donor contributes funds to the Relief Pool",
    "Admin approves a campaign (without touching funds)",
    "Volunteers verify victims on the ground",
    "Service providers deliver real aid",
    "Treasury contract releases funds automatically",
  ];

  return (
    <Card title="End-to-End Enforcement Flow">
      <p className="text-slate-400 text-sm mb-6">
        This flow shows how RSYS enforces correct behavior at every step without
        relying on centralized control.
      </p>
      {steps.map((s, i) => (
        <div key={i} className="flex items-center gap-4 mb-4">
          <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-semibold">
            {i + 1}
          </div>
          <div className="flex-1 bg-white/5 border border-white/20 p-4 rounded-xl">
            {s}
          </div>
        </div>
      ))}
    </Card>
  );
}

function Difference() {
  return (
    <Card title="Why RSYS Is Fundamentally Different">
      <ul className="space-y-3 text-slate-300">
        <li>✔ No blind trust in institutions</li>
        <li>✔ No manual overrides or backdoors</li>
        <li>✔ No admin custody of funds</li>
        <li>✔ Fully enforced, rule-based system</li>
        <li>✔ Donors can audit outcomes independently</li>
      </ul>
      <p className="mt-4 text-slate-400 text-sm">
        RSYS does not try to improve trust — it removes the need for it.
      </p>
    </Card>
  );
}

/* ───────────────── UI HELPERS ───────────────── */

function Card({ title, children }: any) {
  return (
    <div className="max-w-3xl bg-white/5 border border-white/20 backdrop-blur-md p-8 rounded-2xl">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>
      {children}
    </div>
  );
}

function Grid({ title, children }: any) {
  return (
    <div className="max-w-5xl">
      <h2 className="text-2xl font-semibold mb-10 text-center">{title}</h2>
      <div className="grid md:grid-cols-2 gap-6">{children}</div>
    </div>
  );
}

function Node({ title, children }: any) {
  return (
    <div className="bg-white/5 border border-white/20 p-6 rounded-xl">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-slate-300 text-sm">{children}</p>
    </div>
  );
}

function ToggleButton({ active, children, ...props }: any) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-lg text-sm ${
        active ? "bg-white text-black" : "bg-white/10"
      }`}
    >
      {children}
    </button>
  );
}

function NavButton({ disabled, children, ...props }: any) {
  return (
    <button
      {...props}
      disabled={disabled}
      className="px-4 py-2 rounded-lg bg-white/10 disabled:opacity-30"
    >
      {children}
    </button>
  );
}

function GlowBackground() {
  return (
    <>
      <div className="absolute -top-40 -left-40 w-125 h-125 bg-purple-600/30 blur-[120px]" />
      <div className="absolute top-1/3 -right-40 w-125 h-125 bg-cyan-500/30 blur-[120px]" />
      <div className="absolute bottom-0 left-1/3 w-125 h-125 bg-pink-500/20 blur-[120px]" />
    </>
  );
}
