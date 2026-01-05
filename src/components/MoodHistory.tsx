import { MoodEntry, MOOD_CONFIG } from "@/types/mood";
import { format, parseISO } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Quote } from "lucide-react";

interface MoodHistoryProps {
  entries: MoodEntry[];
  onDelete: (id: string) => void;
}

export const MoodHistory = ({ entries, onDelete }: MoodHistoryProps) => {
  if (entries.length === 0) return null;

  return (
    <div className="space-y-4 max-w-2xl mx-auto mt-12">
      <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 px-2">
        Recent Reflections
      </h3>
      <div className="space-y-4">
        {entries.map((entry) => (
          <Card key={entry.id} className="group overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow bg-white">
            <CardContent className="p-0">
              <div className="flex items-stretch">
                <div className={`w-2 ${MOOD_CONFIG[entry.mood].bg.replace('bg-', 'bg-')}`} 
                     style={{ backgroundColor: `var(--${entry.mood}-color)` }} // Fallback for custom logic
                />
                <div className="flex-1 p-5 flex items-start gap-4">
                  <span className="text-3xl mt-1">{MOOD_CONFIG[entry.mood].emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-500">
                        {format(parseISO(entry.date), "MMMM d, yyyy • h:mm a")}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(entry.id)}
                        className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-sm font-bold uppercase tracking-widest ${MOOD_CONFIG[entry.mood].color}`}>
                        {entry.mood}
                      </span>
                    </div>
                    {entry.note && (
                      <div className="relative">
                        <Quote className="absolute -left-1 -top-1 w-3 h-3 text-gray-100" />
                        <p className="text-gray-600 leading-relaxed pl-4 italic">
                          {entry.note}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};