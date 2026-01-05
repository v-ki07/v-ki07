import { useState } from "react";
import { MoodType, MOOD_CONFIG, MoodEntry } from "@/types/mood";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MoodSelector } from "@/components/MoodSelector";
import { showSuccess, showError } from "@/utils/toast";
import { 
  Check, 
  Heart, 
  Target, 
  Eye,
  ArrowLeft,
  ArrowRight,
  Sparkles
} from "lucide-react";

interface StagedMoodEntryProps {
  onAdd: (entry: Omit<MoodEntry, "id" | "date">) => void;
}

export const StagedMoodEntry = ({ onAdd }: StagedMoodEntryProps) => {
  const [step, setStep] = useState(1);
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
      showError("Please select a mood");
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
    setStep(1);
    setSelectedMood(null);
    setNote("");
    setBodyScan("");
    setCopingStrategy("");
    setGratitudeItems(["", "", ""]);
    setVisualMetaphor("");
    showSuccess("Mood logged successfully!");
  };

  const nextStep = () => {
    if (step === 1 && !selectedMood) {
      showError("Please select a mood before continuing");
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                How are you feeling today?
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400">
                Start by selecting your current mood
              </p>
            </div>
            
            <MoodSelector selected={selectedMood} onSelect={setSelectedMood} />
            
            {selectedMood && (
              <div className="pt-4">
                <label htmlFor="note" className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 block">
                  What's on your mind?
                </label>
                <Textarea
                  id="note"
                  placeholder="Describe your thoughts and feelings..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="rounded-xl border-zinc-100 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 py-6 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 min-h-[120px]"
                />
              </div>
            )}
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 flex items-center justify-center gap-2">
                <Heart className="w-5 h-5 text-indigo-500" />
                The Deep Reflection
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400">
                Explore your inner experience
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Body Scan: Where do you feel this emotion physically?
                  </label>
                  <Textarea
                    placeholder="Describe where you feel this emotion in your body..."
                    value={bodyScan}
                    onChange={(e) => setBodyScan(e.target.value)}
                    className="rounded-xl border-zinc-100 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 py-4 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 min-h-[100px]"
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
                    className="rounded-xl border-zinc-100 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 py-4 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 flex items-center justify-center gap-2">
                <Target className="w-5 h-5 text-emerald-500" />
                The Small Wins & Gratitude
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400">
                List 3 tiny wins or things you're grateful for today
              </p>
            </div>
            
            <div className="space-y-4">
              {[0, 1, 2].map((index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-emerald-500 font-bold text-lg">•</span>
                  <Input
                    placeholder={`Win or gratitude item #${index + 1}`}
                    value={gratitudeItems[index]}
                    onChange={(e) => handleGratitudeChange(index, e.target.value)}
                    className="rounded-xl border-zinc-100 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 py-6"
                  />
                </div>
              ))}
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 flex items-center justify-center gap-2">
                <Eye className="w-5 h-5 text-purple-500" />
                Visual Metaphor
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400">
                Describe a vivid image that represents your emotional state
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Textarea
                  placeholder="e.g., 'A quiet library in the rain' or 'A bubbling neon fountain'..."
                  value={visualMetaphor}
                  onChange={(e) => setVisualMetaphor(e.target.value)}
                  className="rounded-xl border-zinc-100 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 py-6 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 min-h-[150px]"
                />
              </div>
              
              <div className="bg-indigo-50 dark:bg-indigo-950/20 rounded-xl p-4 border border-indigo-100 dark:border-indigo-900/30">
                <h4 className="font-medium text-indigo-800 dark:text-indigo-200 flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4" />
                  Your Pixel Tag
                </h4>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700"
                    style={{ backgroundColor: selectedMood ? MOOD_CONFIG[selectedMood].bg.replace('bg-', '') : '#f3f4f6' }}
                  />
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 capitalize">
                    {selectedMood || 'Select mood'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-none bg-white dark:bg-zinc-900 shadow-xl overflow-hidden">
      <CardHeader className="text-center pb-6 border-b dark:border-zinc-800">
        <CardTitle className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
          Mood Journal
        </CardTitle>
        <CardDescription className="text-zinc-500 dark:text-zinc-400">
          A mindful journey through your emotions
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-8">
        {/* Progress indicator */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step === s 
                    ? 'bg-indigo-600 text-white' 
                    : step > s 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'
                }`}
              >
                {step > s ? '✓' : s}
              </div>
              {s < 4 && (
                <div className={`w-12 h-1 ${step > s ? 'bg-emerald-500' : 'bg-zinc-200 dark:bg-zinc-800'}`} />
              )}
            </div>
          ))}
        </div>
        
        {/* Step content */}
        <div className="min-h-[300px]">
          {renderStep()}
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-between pt-8">
          <Button
            onClick={prevStep}
            disabled={step === 1}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          
          {step < 4 ? (
            <Button
              onClick={nextStep}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700"
            >
              Complete Entry
              <Check className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};