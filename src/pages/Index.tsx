import { RetroWindow } from "@/components/RetroWindow";
import { ListItem } from "@/components/ListItem";
import { SuggestionForm } from "@/components/SuggestionForm";
import { SuggestionsList } from "@/components/SuggestionsList";
import { CountdownTimer } from "@/components/CountdownTimer";

const Index = () => {
  // Sample list items - can be replaced with dynamic data
  const listItems = [
    "Soft blankets",
    "Fluffy clouds",
    "Marshmallows",
    "Cotton candy",
    "Puppies",
    "Kittens",
    "Plush toys",
    "Feather pillows",
  ];

  return (
    <div className="min-h-screen p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl space-y-4">
        {/* Header Window */}
        <RetroWindow title="Yumussak listesi">
          <div className="text-center space-y-3">
            <h1 className="font-retro text-sm mb-2">YUMUSSAK LISTESI</h1>
            <p className="text-xs leading-relaxed">
              A collection of soft and cozy things. Browse the canonical list below, vote on suggestions, and submit your own!
            </p>
            <CountdownTimer />
            <p className="text-xs text-muted-foreground">
              Top-voted suggestions will be added to the list at month's end
            </p>
          </div>
        </RetroWindow>

        {/* Canonical List Window */}
        <RetroWindow title="Canonical List">
          <div className="win95-inset bg-white p-2 max-h-[400px] overflow-y-auto">
            {listItems.map((item, index) => (
              <ListItem key={index} text={item} index={index + 1} />
            ))}
          </div>
        </RetroWindow>

        {/* Community Suggestions Window */}
        <RetroWindow title="Community Suggestions">
          <SuggestionsList />
        </RetroWindow>

        {/* Suggestion Form Window */}
        <RetroWindow title="Submit Suggestion">
          <SuggestionForm />
        </RetroWindow>
      </div>
    </div>
  );
};

export default Index;
