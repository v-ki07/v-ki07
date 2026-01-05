import { MoodType, MOOD_CONFIG } from "@/types/mood";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface MoodSelectorProps {
  selected: MoodType | null;
  onSelect: (mood: MoodType) => void;
}

export const MoodSelector = ({ selected, onSelect }: MoodSelectorProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 py-4">
      {(Object.entries(MOOD_CONFIG) as [MoodType, typeof MOOD_CONFIG["great"]][]).map(([type, config]) => (
        <button
          key={type}
          onClick={() => onSelect(type)}
          className={cn(
            "flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-200 border-2",
            selected === type 
              ? `${config.bg} border-current ${config.color} scale-105 shadow-md` 
              : "border-transparent hover:bg-gray-50 text-gray-400"
          )}
        >
          <span className="text-4xl">{config.emoji}</span>
          <span className="text-xs font-medium uppercase tracking-wider">{config.label}</span>
        </button>
      ))}
    </div>
  );
};