import { MoodEntry, MOOD_CONFIG } from "@/types/mood";
import { format, parseISO } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, MessageCircle } from "lucide-react";

interface MoodHistoryProps {
  entries: MoodEntry[];
  onDelete: (id: string) => void;
}

export const MoodHistory = ({ entries, onDelete }: MoodHistoryProps) => {
  if (entries.length === 0) return null;

  return (
    <div className="space-y-6 max-w-2xl mx-auto mt-12 pb-20">
      <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 px-2">History</h3>
      <div className="space-y-4">
        {entries.map((entry) => {
          const config = MOOD_CONFIG[entry.mood];
          return (
            <Card key={entry.id} className="group border-none shadow-sm bg-white dark:bg-zinc-900">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${config.bg}`}>
                      {config.emoji}
                    </div>
                    <div>
                      <div className={`text-sm font-bold ${config.color} capitalize`}>{config.label}</div>
                      <div className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">{format(parseISO(entry.date), "MMM d, h:mm a")}</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(entry.id)} className="opacity-0 group-hover:opacity-100 h-8 w-8 text-zinc-400 hover:text-red-500 transition-opacity">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                {entry.note && (
                  <div className="pt-4 border-t dark:border-zinc-800 flex items-start gap-3">
                    <MessageCircle className="w-4 h-4 text-zinc-400 shrink-0 mt-1" />
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 italic">{entry.note}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};