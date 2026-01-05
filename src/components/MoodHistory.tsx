import { MoodEntry, MOOD_CONFIG } from "@/types/mood";
import { format, parseISO } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Brain, Sparkles, Target, Zap, Layers, Award } from "lucide-react";

interface MoodHistoryProps {
  entries: MoodEntry[];
  onDelete: (id: string) => void;
}

export const MoodHistory = ({ entries, onDelete }: MoodHistoryProps) => {
  if (entries.length === 0) return null;

  return (
    <div className="space-y-6 max-w-2xl mx-auto mt-12 pb-20">
      <h3 className="text-lg font-bold text-zinc-900 dark:text-white px-2">History</h3>
      <div className="space-y-4">
        {entries.map((entry) => {
          const scoreStr = entry.mood_score.toString();
          const config = MOOD_CONFIG[scoreStr] || MOOD_CONFIG["6"];
          return (
            <Card key={entry.id} className="group border-none shadow-sm bg-white dark:bg-zinc-900">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg" style={{ backgroundColor: entry.hex_color + '20' }}>
                      {config.emoji}
                    </div>
                    <div>
                      <div className="text-sm font-bold dark:text-white">Score {entry.mood_score}/10</div>
                      <div className="text-[10px] text-zinc-500 uppercase tracking-widest">{format(parseISO(entry.date), "MMM d, h:mm a")}</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(entry.id)} className="opacity-0 group-hover:opacity-100 h-8 w-8 text-zinc-400 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6 text-xs border-b dark:border-zinc-800 pb-6">
                  <div className="flex items-center gap-2">
                    <Zap className="w-3 h-3 text-yellow-500" />
                    <span className="text-zinc-500 uppercase font-bold">Energy:</span>
                    <span className="dark:text-zinc-300 font-medium">{entry.energy_level}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Layers className="w-3 h-3 text-blue-500" />
                    <span className="text-zinc-500 uppercase font-bold">Focus:</span>
                    <span className="dark:text-zinc-300 font-medium">{entry.life_area}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex gap-3">
                    <Brain className="w-4 h-4 text-zinc-400 shrink-0" />
                    <p className="text-sm dark:text-zinc-300"><span className="font-bold text-zinc-500">Body:</span> {entry.body_scan}</p>
                  </div>
                  <div className="flex gap-3">
                    <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                    <p className="text-sm dark:text-zinc-300"><span className="font-bold text-zinc-500">Win:</span> {entry.small_win}</p>
                  </div>
                  {entry.reframe_note && (
                    <div className="flex gap-3">
                      <Target className="w-4 h-4 text-indigo-400 shrink-0" />
                      <p className="text-sm dark:text-zinc-300"><span className="font-bold text-zinc-500">Growth:</span> {entry.reframe_note}</p>
                    </div>
                  )}
                  <div className="flex gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-zinc-200 dark:border-zinc-700 shrink-0" />
                    <p className="text-sm dark:text-zinc-300"><span className="font-bold text-zinc-500">Seed:</span> {entry.seed_task}</p>
                  </div>
                </div>

                <div className="pt-4 border-t dark:border-zinc-800 grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: entry.hex_color }} title={entry.hex_color} />
                    <p className="text-sm italic text-zinc-600 dark:text-zinc-400">"{entry.visual_metaphor}"</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-black uppercase tracking-tighter text-indigo-600 dark:text-indigo-400">{entry.achievement_badge}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};