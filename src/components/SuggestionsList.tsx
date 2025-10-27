import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
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
    const { data, error } = await supabase
      .from("suggestions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load suggestions");
      console.error("Error fetching suggestions:", error);
    } else {
      setSuggestions(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const handleVote = async (id: string, voteType: "upvote" | "downvote") => {
    const suggestion = suggestions.find((s) => s.id === id);
    if (!suggestion) return;

    const updatedData =
      voteType === "upvote"
        ? { upvotes: suggestion.upvotes + 1 }
        : { downvotes: suggestion.downvotes + 1 };

    const { error } = await supabase
      .from("suggestions")
      .update(updatedData)
      .eq("id", id);

    if (error) {
      toast.error("Failed to vote");
      console.error("Error voting:", error);
    } else {
      fetchSuggestions();
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
