import { useState } from "react";
import { MoodType, MOOD_CONFIG, MoodEntry } from "@/types/mood";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MoodSelector } from "@/components/MoodSelector";
import { showSuccess } from "@/utils/toast";
import { Check, Heart, Target, Eye } from "lucide-react";

interface EnhancedMoodEntryFormProps {
  onAdd: (entry: Omit<MoodEntry, "id" | "date">) => void;
}

export const EnhancedMoodEntryForm = ({ onAdd }: EnhancedMoodEntryFormProps) => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [note, setNote] = useState("");
  const [bodyScan, setBodyScan] = useState("");
  const [copingStrategy, setCopingStrategy] = useState("");
  const [gratitudeItems, setGratitudeItems] = useState(["", "", ""]);
  const [visualMetaphor, setVisualMetaphor] = useState("");

  const handleGratitudeChange = (index: number, value: string) => {
    const newItems = [...gratitudeItems];
    newItems[index] = value;
    setGratitudeItems(newItems);
  };

  const handleSubmit = () => {
    if (!selectedMood) {
      return;
    }
    
    onAdd({
      mood: selectedMood,
      note: note,
      body_scan: bodyScan,
      coping_strategy: copingStrategy,
      gratitude_items: gratitudeItems.filter(item => item.trim() !== ""),
      visual_metaphor: visualMetaphor,
    });
    
    // Reset form
    setSelectedMood(null);
    setNote("");
    setBodyScan("");
    setCopingStrategy("");
    setGratitudeItems(["", "", ""]);
    setVisualMetaphor("");
    showSuccess("Mood logged successfully!");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-none bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
      <CardHeader className="text-center pb-8 border-b dark:border-zinc-800">
        <CardTitle className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          How are you feeling today?
        </CardTitle>
        <CardDescription className="text-zinc-500 dark:text-zinc-400">
          Share your mood and explore your inner experience
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-10 space-y-8">
        <MoodSelector selected={selectedMood} onSelect={setSelectedMood} />

        <div className="space-y-2">
          <label htmlFor="note" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            What's on your mind?
          </label>
          <Textarea
            id="note"
            placeholder="Describe your thoughts and feelings..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="rounded-xl border-zinc-100 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 py-6 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 min-h-[100px]"
          />
        </div>

        <div className="space-y-6 pt-4">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Heart className="w-5 h-5 text-indigo-500" />
            The Deep Reflection
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Body Scan: Where do you feel this emotion physically?
              </label>
              <Textarea
                placeholder="Describe where you feel this emotion in your body..."
                value={bodyScan}
                onChange={(e) => setBodyScan(e.target.value)}
                className="rounded-xl border-zinc-100 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 py-4 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Coping Strategy: What did you do or could you do to manage this feeling?
              </label>
              <Textarea
                placeholder="Share what helps you cope with this emotion..."
                value={copingStrategy}
                onChange={(e) => setCopingStrategy(e.target.value)}
                className="rounded-xl border-zinc-100 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 py-4 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6 pt-4">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-500" />
            The Small Wins & Gratitude
          </h3>
          
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            List 3 tiny wins or things you're grateful for today, regardless of your mood.
          </p>
          
          <div className="space-y-3">
            {[0, 1, 2].map((index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <Input
                  placeholder={`Win or gratitude item #${index + 1}`}
                  value={gratitudeItems[index]}
                  onChange={(e) => handleGratitudeChange(index, e.target.value)}
                  className="rounded-xl border-zinc-100 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6 pt-4">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Eye className="w-5 h-5 text-purple-500" />
            Visual Metaphor
          </h3>
          
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Describe a vivid image or scene that represents your current emotional state.
          </p>
          
          <div className="space-y-2">
            <Textarea
              placeholder="e.g., 'A quiet library in the rain' or 'A bubbling neon fountain'..."
              value={visualMetaphor}
              onChange={(e) => setVisualMetaphor(e.target.value)}
              className="rounded-xl border-zinc-100 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 py-4 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 min-h-[100px]"
            />
          </div>
        </div>

        <Button 
          onClick={handleSubmit}
          disabled={!selectedMood}
          className="w-full rounded-xl py-6 bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 font-bold"
        >
          Log Mood <Check className="ml-2 w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  );
};