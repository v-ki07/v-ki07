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
  Sparkles,
  Brain,
  Trophy,
  Palette
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  const stepIcons = {
    1: <Sparkles className="w-6 h-6" />,
    2: <Brain className="w-6 h-6" />,
    3: <Trophy className="w-6 h-6" />,
    4: <Palette className="w-6 h-6" />
  };

  const stepTitles = {
    1: "How are you feeling today?",
    2: "The Deep Reflection",
    3: "The Small Wins & Gratitude",
    4: "Visual Metaphor"
  };

  const stepDescriptions = {
    1: "Start by selecting your current mood",
    2: "Explore your inner experience",
    3: "List 3 tiny wins or things you're grateful for today",
    4: "Describe a vivid image that represents your emotional state"
  };

  const stepColors = {
    1: "from-indigo-500 to-purple-500",
    2: "from-blue-500 to-cyan-500",
    3: "from-emerald-500 to-teal-500",
    4: "from-purple-500 to-pink-500"
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white mb-4">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                How are you feeling today?
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                Start by selecting your current mood
              </p>
            </div>
            
            <MoodSelector selected={selectedMood} onSelect={setSelectedMood} />
            
            {selectedMood && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="pt-4"
              >
                <label htmlFor="note" className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 block">
                  What's on your mind?
                </label>
                <Textarea
                  id="note"
                  placeholder="Describe your thoughts and feelings..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="rounded-2xl border-zinc-100 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 py-6 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 min-h-[120px] focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </motion.div>
            )}
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white mb-4">
                <Brain className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                The Deep Reflection
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
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
                    className="rounded-2xl border-zinc-100 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 py-4 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="rounded-2xl border-zinc-100 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 py-4 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white mb-4">
                <Trophy className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                The Small Wins & Gratitude
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                List 3 tiny wins or things you're grateful for today
              </p>
            </div>
            
            <div className="space-y-4">
              {[0, 1, 2].map((index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">{index + 1}</span>
                  </div>
                  <Input
                    placeholder={`Win or gratitude item #${index + 1}`}
                    value={gratitudeItems[index]}
                    onChange={(e) => handleGratitudeChange(index, e.target.value)}
                    className="rounded-2xl border-zinc-100 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 py-6 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white mb-4">
                <Palette className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                Visual Metaphor
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                Describe a vivid image that represents your emotional state
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Textarea
                  placeholder="e.g., 'A quiet library in the rain' or 'A bubbling neon fountain'..."
                  value={visualMetaphor}
                  onChange={(e) => setVisualMetaphor(e.target.value)}
                  className="rounded-2xl border-zinc-100 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 py-6 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 min-h-[150px] focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-2xl p-6 border border-purple-100 dark:border-purple-900/30">
                <h4 className="font-bold text-purple-800 dark:text-purple-200 flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5" />
                  Your Pixel Tag
                </h4>
                
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-20 h-20 rounded-2xl border-4 border-white shadow-lg"
                      style={{ 
                        backgroundColor: selectedMood 
                          ? MOOD_CONFIG[selectedMood].bg.replace('bg-', '') 
                          : '#f3f4f6'
                      }}
                    />
                    <span className="mt-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Color
                    </span>
                  </div>
                  
                  <div className="text-center sm:text-left">
                    <div className="text-2xl font-bold text-zinc-900 dark:text-white capitalize">
                      {selectedMood || 'Select mood'}
                    </div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                      {selectedMood ? MOOD_CONFIG[selectedMood].label : 'No mood selected'}
                    </div>
                  </div>
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
    <Card className="w-full max-w-2xl mx-auto border-none bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden">
      <CardHeader className="text-center pb-6 border-b dark:border-zinc-800 relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-r ${stepColors[step as keyof typeof stepColors]} opacity-10`} />
        <CardTitle className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 relative">
          Mood Journal
        </CardTitle>
        <CardDescription className="text-zinc-500 dark:text-zinc-400 relative">
          A mindful journey through your emotions
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-8 relative">
        {/* Progress indicator */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold shadow-md ${
                  step === s 
                    ? `bg-gradient-to-r ${stepColors[s as keyof typeof stepColors]} text-white shadow-lg` 
                    : step > s 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'
                }`}
              >
                {step > s ? '✓' : s}
              </motion.div>
              {s < 4 && (
                <div className={`w-16 h-1 ${step > s ? 'bg-emerald-500' : 'bg-zinc-200 dark:bg-zinc-800'}`} />
              )}
            </div>
          ))}
        </div>
        
        {/* Step header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-600 dark:text-indigo-400 mb-3">
            {stepIcons[step as keyof typeof stepIcons]}
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            {stepTitles[step as keyof typeof stepTitles]}
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">
            {stepDescriptions[step as keyof typeof stepDescriptions]}
          </p>
        </div>
        
        {/* Step content */}
        <div className="min-h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-between pt-8">
          <Button
            onClick={prevStep}
            disabled={step === 1}
            variant="outline"
            className="flex items-center gap-2 rounded-xl px-6 py-3 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          
          {step < 4 ? (
            <Button
              onClick={nextStep}
              className="flex items-center gap-2 rounded-xl px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="flex items-center gap-2 rounded-xl px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all"
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