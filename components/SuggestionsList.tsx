"use client";

import { useEffect, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { toast } from "sonner";

interface Suggestion {
  id: string;
  text: string;
  upvotes: number;
  downvotes: number;
  created_at: string;
}

export const SuggestionsList = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSuggestions = async () => {
    try {
      const res = await fetch("/api/suggestions");
      if (!res.ok) throw new Error();
      setSuggestions(await res.json());
    } catch {
      toast.error("Failed to load suggestions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const handleVote = async (id: string, voteType: "upvote" | "downvote") => {
    try {
      const res = await fetch(`/api/suggestions/${id}/${voteType}`, { method: "POST" });
      if (!res.ok) throw new Error();
      const updated: Suggestion = await res.json();
      setSuggestions((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    } catch {
      toast.error("Failed to vote");
    }
  };

  if (loading) {
    return (
      <div className="win95-inset bg-white p-4 text-center">
        <span className="text-xs">Öneriler yükleniyor...</span>
      </div>
    );
  }

  if (suggestions.length === 0) {
    return (
      <div className="win95-inset bg-white p-4 text-center">
        <span className="text-xs">Hiç öneri olmaması biraz gay...</span>
      </div>
    );
  }

  return (
    <div className="win95-inset bg-white p-2 max-h-[400px] overflow-y-auto">
      {suggestions.map((suggestion) => (
        <div key={suggestion.id} className="win95-inset bg-input p-2 mb-2 flex items-start gap-2">
          <div className="flex flex-col gap-1">
            <button
              onClick={() => handleVote(suggestion.id, "upvote")}
              className="win95-button p-1 w-6 h-6 flex items-center justify-center"
              aria-label="Upvote"
            >
              <ChevronUp className="w-3 h-3" />
            </button>
            <div className="text-center text-xs font-bold">
              {suggestion.upvotes - suggestion.downvotes}
            </div>
            <button
              onClick={() => handleVote(suggestion.id, "downvote")}
              className="win95-button p-1 w-6 h-6 flex items-center justify-center"
              aria-label="Downvote"
            >
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          <div className="flex-1">
            <p className="text-xs leading-relaxed break-words">{suggestion.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
