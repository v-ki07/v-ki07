import { useState } from "react";
import { MoodType, MOOD_CONFIG, MoodEntry } from "@/types/mood";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MoodSelector } from "@/components/MoodSelector";
import { showSuccess } from "@/utils/toast";
import { Check } from "lucide-react";

interface MoodEntryFormProps {
  onAdd: (entry: Omit<MoodEntry, "id" | "date">) => void;
}

export const MoodEntryForm = ({ onAdd }: MoodEntryFormProps) => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    if (!selectedMood) {
      return;
    }
    
    onAdd({
      mood: selectedMood,
      note: note,
    });
    
    setSelectedMood(null);
    setNote("");
    showSuccess("Mood logged successfully!");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-none bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
      <CardHeader className="text-center pb-8 border-b dark:border-zinc-800">
        <CardTitle className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          How are you feeling today?
        </CardTitle>
        <CardDescription className="text-zinc-500 dark:text-zinc-400">
          Select your mood and add an optional note.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-10 space-y-8">
        <MoodSelector selected={selectedMood} onSelect={setSelectedMood} />

        <div className="space-y-2">
          <label htmlFor="note" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Optional: Add a note
          </label>
          <Textarea
            id="note"
            placeholder="What's on your mind?"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="rounded-xl border-zinc-100 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 py-6 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 min-h-[100px]"
          />
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