"use client";

import { useState } from "react";

interface AiSummarizerProps {
  title: string;
}

export default function AiSummarizer({ title }: AiSummarizerProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleLaunch = async (service: "chatgpt" | "claude" | "perplexity" | "gemini") => {
    const currentUrl = typeof window !== "undefined" ? window.location.href : "";
    const promptText = `Please provide an executive summary, architectural breakdown, and core engineering lessons from this case study:\n\nTitle: "${title}"\nURL: ${currentUrl}\n\nPlease highlight: (1) Core engineering challenge, (2) Solution & system design, (3) Measurable outcome & benchmarks.`;

    let destinationUrl = "";
    let serviceName = "";

    switch (service) {
      case "chatgpt":
        serviceName = "ChatGPT";
        destinationUrl = `https://chatgpt.com/?q=${encodeURIComponent(promptText)}`;
        break;
      case "claude":
        serviceName = "Claude";
        destinationUrl = `https://claude.ai/new?q=${encodeURIComponent(promptText)}`;
        break;
      case "perplexity":
        serviceName = "Perplexity";
        destinationUrl = `https://www.perplexity.ai/search?q=${encodeURIComponent(promptText)}`;
        break;
      case "gemini":
        serviceName = "Gemini";
        destinationUrl = "https://gemini.google.com/app";
        break;
    }

    try {
      await navigator.clipboard.writeText(promptText);
      setToastMessage(`Prompt copied — opening ${serviceName}`);
    } catch {
      setToastMessage(`Opening ${serviceName}`);
    }

    setTimeout(() => {
      setToastMessage(null);
    }, 2500);

    window.open(destinationUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative flex flex-wrap items-center gap-3">
      <span className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-300 font-semibold">
        Summarize with:
      </span>

      <div className="flex items-center gap-2">
        {/* ChatGPT */}
        <button
          type="button"
          onClick={() => handleLaunch("chatgpt")}
          className="flex h-8 items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.04] px-3 text-xs font-mono font-medium text-zinc-200 transition-colors hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
        >
          <span>ChatGPT</span>
        </button>

        {/* Claude */}
        <button
          type="button"
          onClick={() => handleLaunch("claude")}
          className="flex h-8 items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.04] px-3 text-xs font-mono font-medium text-zinc-200 transition-colors hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
        >
          <span>Claude</span>
        </button>

        {/* Perplexity */}
        <button
          type="button"
          onClick={() => handleLaunch("perplexity")}
          className="flex h-8 items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.04] px-3 text-xs font-mono font-medium text-zinc-200 transition-colors hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
        >
          <span>Perplexity</span>
        </button>

        {/* Gemini */}
        <button
          type="button"
          onClick={() => handleLaunch("gemini")}
          className="flex h-8 items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.04] px-3 text-xs font-mono font-medium text-zinc-200 transition-colors hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
        >
          <span>Gemini</span>
        </button>
      </div>

      {/* Minimal Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-lg border border-white/10 bg-zinc-950 px-4 py-2.5 text-xs text-zinc-200 shadow-xl">
          <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
