import { useState } from "react";
import { MoodType, MOOD_CONFIG } from "@/types/mood";
import { MoodSelector } from "./MoodSelector";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { showSuccess, showError } from "@/utils/toast";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Sparkles, Brain, Heart } from "lucide-react";

interface MoodEntryFormProps {
  onAdd: (entry: { 
    mood: MoodType; 
    note: string;
    body_scan: string;
    coping_strategy: string;
    gratitude_items: string[];
  }) => void;
}

type Step = "mood" | "reflection" | "gratitude";

export const MoodEntryForm = ({ onAdd }: MoodEntryFormProps) => {
  const [step, setStep] = useState<Step>("mood");
  const [mood, setMood] = useState<MoodType | null>(null);
  const [note, setNote] = useState("");
  const [bodyScan, setBodyScan] = useState("");
  const [copingStrategy, setCopingStrategy] = useState("");
  const [gratitude, setGratitude] = useState(["", "", ""]);

  const handleGratitudeChange = (index: number, value: string) => {
    const newGratitude = [...gratitude];
    newGratitude[index] = value;
    setGratitude(newGratitude);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mood) return;
    
    onAdd({ 
      mood, 
      note, 
      body_scan: bodyScan,
      coping_strategy: copingStrategy,
      gratitude_items: gratitude.filter(g => g.trim() !== "")
    });
    
    // Reset form
    setStep("mood");
    setMood(null);
    setNote("");
    setBodyScan("");
    setCopingStrategy("");
    setGratitude(["", "", ""]);
    showSuccess("Reflection saved successfully!");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl border-none bg-white/90 backdrop-blur-md overflow-hidden">
      <CardHeader className="text-center border-b border-gray-50 pb-6">
        <div className="flex justify-center mb-2">
          <div className="p-2 rounded-full bg-indigo-50 text-indigo-600">
            {step === "mood" && <Heart className="w-5 h-5" />}
            {step === "reflection" && <Brain className="w-5 h-5" />}
            {step === "gratitude" && <Sparkles className="w-5 h-5" />}
          </div>
        </div>
        <CardTitle className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {step === "mood" && "How are you feeling?"}
          {step === "reflection" && "Deep Reflection"}
          {step === "gratitude" && "Small Wins & Gratitude"}
        </CardTitle>
        <CardDescription>
          {step === "mood" && "Select your current mood to begin your check-in."}
          {step === "reflection" && "Let's check in with your body and mind."}
          {step === "gratitude" && "Even on tough days, there is light to be found."}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-8">
        <AnimatePresence mode="wait">
          {step === "mood" && (
            <motion.div 
              key="step-mood"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <MoodSelector selected={mood} onSelect={(m) => {
                setMood(m);
                setTimeout(() => setStep("reflection"), 400);
              }} />
              <Textarea
                placeholder="Briefly, what's happening? (Optional)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="min-h-[100px] border-gray-100 focus:ring-indigo-100 rounded-xl"
              />
            </motion.div>
          )}

          {step === "reflection" && (
            <motion.div 
              key="step-reflection"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  Body Scan: Where do you feel this in your body?
                </label>
                <Input
                  placeholder="e.g., tightness in chest, warmth in hands..."
                  value={bodyScan}
                  onChange={(e) => setBodyScan(e.target.value)}
                  className="border-gray-100 focus:ring-indigo-100 rounded-xl py-6"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  Coping Strategy: What helps you manage this?
                </label>
                <Input
                  placeholder="e.g., deep breathing, taking a walk, calling a friend..."
                  value={copingStrategy}
                  onChange={(e) => setCopingStrategy(e.target.value)}
                  className="border-gray-100 focus:ring-indigo-100 rounded-xl py-6"
                />
              </div>
              <div className="flex gap-4">
                <Button variant="ghost" onClick={() => setStep("mood")} className="flex-1 rounded-xl py-6">
                  <ArrowLeft className="mr-2 w-4 h-4" /> Back
                </Button>
                <Button onClick={() => setStep("gratitude")} className="flex-1 bg-indigo-600 hover:bg-indigo-700 rounded-xl py-6">
                  Next <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === "gratitude" && (
            <motion.div 
              key="step-gratitude"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 mb-2 block">
                  List 3 tiny wins or things you're grateful for:
                </label>
                {gratitude.map((item, i) => (
                  <div key={i} className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300 font-bold">{i + 1}.</span>
                    <Input
                      placeholder={`Something I'm thankful for...`}
                      value={item}
                      onChange={(e) => handleGratitudeChange(i, e.target.value)}
                      className="pl-10 border-gray-100 focus:ring-indigo-100 rounded-xl py-6"
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <Button variant="ghost" onClick={() => setStep("reflection")} className="flex-1 rounded-xl py-6">
                  <ArrowLeft className="mr-2 w-4 h-4" /> Back
                </Button>
                <Button onClick={handleSubmit} className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl py-6 font-bold shadow-lg shadow-indigo-100">
                  Complete Session <Check className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};