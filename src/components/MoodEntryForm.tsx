import { useState } from "react";
import { MoodType } from "@/types/mood";
import { MoodSelector } from "./MoodSelector";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { showSuccess, showError } from "@/utils/toast";

interface MoodEntryFormProps {
  onAdd: (entry: { mood: MoodType; note: string }) => void;
}

export const MoodEntryForm = ({ onAdd }: MoodEntryFormProps) => {
  const [mood, setMood] = useState<MoodType | null>(null);
  const [note, setNote] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mood) {
      showError("Please select a mood first!");
      return;
    }
    onAdd({ mood, note });
    setMood(null);
    setNote("");
    showSuccess("Journal entry saved!");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl border-none bg-white/80 backdrop-blur-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          How are you feeling today?
        </CardTitle>
        <CardDescription>Select your current mood and share your thoughts</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <MoodSelector selected={mood} onSelect={setMood} />
          
          <div className="space-y-2">
            <Textarea
              placeholder="What's on your mind? (Optional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="min-h-[120px] resize-none border-gray-100 focus:ring-purple-200"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-6 rounded-xl transition-all hover:scale-[1.02]"
          >
            Save Daily Entry
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};