"use client";

/*
  RSYS – Round 1 Presentation Website
  ----------------------------------
  Purpose:
  - Explain the problem
  - Show the enforcement-first design
  - Heavy wireflow, minimal tech
  - Used ONLY for Round 1 (Team A)

  NOTE FOR LIVE EDITS:
  - All text blocks are plain JSX
  - You can safely edit wording during judging
*/

import Link from "next/link";

export default function PresentationRound1() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Background glow layers (pure visual, no logic) */}
      <GlowBackground />

      {/* HERO SECTION */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
          RSYS
        </h1>

        <p className="mt-6 text-xl text-slate-300 max-w-2xl">
          A disaster relief system
          <span className="text-white font-semibold">
            {" "}where corruption is impossible by design.
          </span>
        </p>

        {/* Optional navigation (you can remove if judges prefer clean view) */}
        <div className="mt-10 flex gap-4">
          <Link
            href="/judge"
            className="px-6 py-3 rounded-xl bg-white text-black font-medium"
          >
            Judge Mode (Later)
          </Link>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <Section title="The Real Problem">
        <WireCard>
          <p className="text-slate-300">
            Disaster relief systems do not fail at fundraising.
            <br />
            They fail after money is collected.
          </p>

          <ul className="list-disc list-inside mt-6 space-y-2 text-slate-400">
            <li>No enforcement after donation</li>
            <li>Opaque fund movement</li>
            <li>Manual trust in administrators</li>
            <li>No verifiable outcomes for donors</li>
          </ul>
        </WireCard>
      </Section>

      {/* SOLUTION SECTION */}
      <Section title="The RSYS Approach">
        <WireGrid>
          <WireNode title="Enforcement First">
            Rules are enforced by smart contracts,
            not policies or promises.
          </WireNode>

          <WireNode title="Role-Based System">
            Every actor operates under a strictly
            limited on-chain role.
          </WireNode>

          <WireNode title="Funds Are Locked">
            Donations cannot be withdrawn
            without meeting contract conditions.
          </WireNode>

          <WireNode title="Fully Auditable">
            Every action is verifiable on-chain,
            by anyone.
          </WireNode>
        </WireGrid>
      </Section>

      {/* WIREFLOW SECTION (MOST IMPORTANT) */}
      <Section title="End-to-End Enforcement Wireflow">
        <WireFlow />
      </Section>

      {/* WHY THIS MATTERS */}
      <Section title="Why This Is Different">
        <WireCard>
          <ul className="space-y-3 text-slate-300">
            <li>✔ No backend authority</li>
            <li>✔ No manual overrides</li>
            <li>✔ No admin fund custody</li>
            <li>✔ No trust assumptions</li>
            <li>✔ Enforcement happens automatically</li>
          </ul>
        </WireCard>
      </Section>

      {/* CLOSING */}
      <section className="relative z-10 py-32 text-center px-6">
        <h2 className="text-4xl font-semibold">
          Trust is replaced by code.
        </h2>
        <p className="mt-4 text-slate-400">
          RSYS doesn’t promise transparency.
          <br />
          It enforces it.
        </p>
      </section>
    </main>
  );
}

/* ─────────────── UI HELPERS (SAFE TO EDIT) ─────────────── */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative z-10 py-24 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-semibold mb-12 text-center">
        {title}
      </h2>
      {children}
    </section>
  );
}

function WireCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md p-8 max-w-3xl mx-auto">
      {children}
    </div>
  );
}

function WireGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {children}
    </div>
  );
}

function WireNode({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/20 bg-white/5 backdrop-blur-md p-6">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-slate-300 text-sm">{children}</p>
    </div>
  );
}

/*
  WireFlow:
  - Visual explanation of enforcement
  - Do NOT over-explain during presentation
*/
function WireFlow() {
  const steps = [
    "Donor sends funds → Relief Pool",
    "Admin approves campaign (no fund access)",
    "Volunteer verifies victims",
    "Service provider delivers aid",
    "Treasury releases funds automatically",
  ];

  return (
    <div className="space-y-6">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold">
            {index + 1}
          </div>

          <div className="flex-1 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md p-4">
            {step}
          </div>
        </div>
      ))}
    </div>
  );
}

/*
  Background glow elements
  - Purely visual
  - Safe to remove if judges want simplicity
*/
function GlowBackground() {
  return (
    <>
      <div className="absolute -top-40 -left-40 w-125 h-125 bg-purple-600/30 blur-[120px]" />
      <div className="absolute top-1/3 -right-40 w-125 h-125 bg-cyan-500/30 blur-[120px]" />
      <div className="absolute bottom-0 left-1/3 w-125 h-125 bg-pink-500/20 blur-[120px]" />
    </>
  );
}
