import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

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
    const { error } = await supabase
      .from("suggestions")
      .insert({ text: suggestion.trim() });

    if (error) {
      toast.error("Failed to submit suggestion");
      console.error("Error submitting suggestion:", error);
    } else {
      toast.success("Suggestion submitted!", {
        description: "Others can now vote on your suggestion.",
      });
      setSuggestion("");
    }
    setSubmitting(false);
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
      <button
        type="submit"
        className="win95-button"
        disabled={submitting}
      >
        {submitting ? "Yollanıyor geliyor..." : "Yolla gelsin"}
      </button>
    </form>
  );
};
