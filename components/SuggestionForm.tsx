"use client";

import { useState } from "react";
import { toast } from "sonner";

export const SuggestionForm = () => {
  const [suggestion, setSuggestion] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestion.trim()) {
      toast.error("Please enter a suggestion");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: suggestion.trim() }),
      });
      if (!res.ok) throw new Error();
      toast.success("Suggestion submitted!", {
        description: "Others can now vote on your suggestion.",
      });
      setSuggestion("");
    } catch {
      toast.error("Failed to submit suggestion");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-xs mb-2 font-retro">Önerin:</label>
        <textarea
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          className="win95-input w-full min-h-[80px] resize-none"
          placeholder="Gay olduğunu belli edebilecek item..."
        />
      </div>
      <button type="submit" className="win95-button" disabled={submitting}>
        {submitting ? "Yollanıyor geliyor..." : "Yolla gelsin"}
      </button>
    </form>
  );
};
