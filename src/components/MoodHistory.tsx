import { MoodEntry, MOOD_CONFIG } from "@/types/mood";
import { format, parseISO } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Quote, Brain, Sparkles, Image as ImageIcon, Tag } from "lucide-react";

interface MoodHistoryProps {
  entries: MoodEntry[];
  onDelete: (id: string) => void;
}

export const MoodHistory = ({ entries, onDelete }: MoodHistoryProps) => {
  if (entries.length === 0) return null;

  return (
    <div className="space-y-6 max-w-2xl mx-auto mt-12 pb-20">
      <h3 className="text-xl font-black text-gray-900 flex items-center gap-2 px-2">
        Your Reflection History
      </h3>
      <div className="space-y-6">
        {entries.map((entry) => {
          const config = MOOD_CONFIG[entry.mood];
          return (
            <Card key={entry.id} className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white">
              <CardContent className="p-0">
                <div className="flex items-stretch">
                  <div className={`w-1.5 ${config.bg}`} style={{ backgroundColor: config.pixelColor }} />
                  <div className="flex-1 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        {format(parseISO(entry.date), "EEEE, MMMM d • h:mm a")}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(entry.id)}
                        className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-opacity h-8 w-8"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-4xl">{config.emoji}</span>
                      <div>
                        <div className={`text-sm font-black uppercase tracking-tighter ${config.color}`}>
                          {entry.mood}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                          <Tag className="w-3 h-3" />
                          <span style={{ color: config.pixelColor }}>{config.pixelLabel} Pixel</span>
                        </div>
                      </div>
                    </div>

                    {entry.note && (
                      <div className="mb-6 bg-gray-50/50 p-4 rounded-xl border border-gray-50 italic text-gray-600 relative">
                        <Quote className="absolute -left-2 -top-2 w-6 h-6 text-indigo-100" />
                        "{entry.note}"
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {entry.body_scan && (
                        <div className="p-4 rounded-xl bg-indigo-50/30 border border-indigo-50">
                          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs mb-1 uppercase tracking-wider">
                            <Brain className="w-3 h-3" /> Body Scan
                          </div>
                          <p className="text-sm text-gray-700">{entry.body_scan}</p>
                        </div>
                      )}
                      {entry.coping_strategy && (
                        <div className="p-4 rounded-xl bg-purple-50/30 border border-purple-50">
                          <div className="flex items-center gap-2 text-purple-600 font-bold text-xs mb-1 uppercase tracking-wider">
                            <Heart className="w-3 h-3" /> Coping Strategy
                          </div>
                          <p className="text-sm text-gray-700">{entry.coping_strategy}</p>
                        </div>
                      )}
                    </div>

                    {entry.gratitude_items && entry.gratitude_items.length > 0 && (
                      <div className="mb-6">
                        <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs mb-3 uppercase tracking-wider">
                          <Sparkles className="w-3 h-3" /> Small Wins & Gratitude
                        </div>
                        <ul className="space-y-2">
                          {entry.gratitude_items.map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                              <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-[10px] font-bold">
                                {i + 1}
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="pt-4 border-t border-gray-50 flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-orange-50 text-orange-400">
                        <ImageIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Visual Metaphor</div>
                        <p className="text-sm text-gray-800 font-medium italic">"{config.visualMetaphor}"</p>
                      </div>
                    </div>
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