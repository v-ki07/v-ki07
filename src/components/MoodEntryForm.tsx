import { useState } from "react";
import { MoodEntry, MOOD_CONFIG } from "@/types/mood";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { showSuccess } from "@/utils/toast";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Sparkles, Brain, Heart, Target } from "lucide-react";

interface MoodEntryFormProps {
  onAdd: (entry: Omit<MoodEntry, "id" | "date">) => void;
}

type Step = "vitals" | "physical" | "reframe" | "seed" | "summary";

export const MoodEntryForm = ({ onAdd }: MoodEntryFormProps) => {
  const [step, setStep] = useState<Step>("vitals");
  const [moodScore, setMoodScore] = useState(6);
  const [energyLevel, setEnergyLevel] = useState("");
  const [lifeArea, setLifeArea] = useState("");
  const [bodyScan, setBodyScan] = useState("");
  const [smallWin, setSmallWin] = useState("");
  const [reframe, setReframe] = useState("");
  const [seedTask, setSeedTask] = useState("");

  const isDown = moodScore <= 4;

  const getVisualMetaphor = (score: number) => {
    if (score >= 9) return "A field of sunflowers turning toward a golden sun.";
    if (score >= 7) return "A calm lake reflecting a clear blue sky.";
    if (score >= 5) return "A quiet path through a misty morning forest.";
    if (score >= 3) return "A lone candle flickering in a gentle breeze.";
    return "A rugged cliff standing strong against a crashing ocean.";
  };

  const getBadge = (score: number) => {
    if (score >= 9) return "Radiant";
    if (score >= 7) return "Grounded";
    if (score >= 5) return "Balanced";
    if (score >= 3) return "Resilient";
    return "Brave";
  };

  const handleSubmit = () => {
    const scoreStr = moodScore.toString();
    const config = MOOD_CONFIG[scoreStr] || MOOD_CONFIG["6"];
    
    onAdd({
      mood_score: moodScore,
      energy_level: energyLevel,
      life_area: lifeArea,
      body_scan: bodyScan,
      small_win: smallWin,
      reframe_note: isDown ? reframe : undefined,
      seed_task: seedTask,
      visual_metaphor: getVisualMetaphor(moodScore),
      hex_color: config.pixelColor,
      achievement_badge: getBadge(moodScore),
      mood: "neutral", // Legacy
      note: ""
    });
    
    setStep("vitals");
    setMoodScore(6);
    setEnergyLevel("");
    setLifeArea("");
    setBodyScan("");
    setSmallWin("");
    setReframe("");
    setSeedTask("");
    showSuccess("Reflection complete.");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-none bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
      <CardHeader className="text-center pb-8 border-b dark:border-zinc-800">
        <CardTitle className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          {step === "vitals" && "1. Mood, Energy & Area"}
          {step === "physical" && "2. Physical & Small Win"}
          {step === "reframe" && "3. Perspective Shift"}
          {step === "seed" && "4. Seed for Tomorrow"}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-10">
        <AnimatePresence mode="wait">
          {step === "vitals" && (
            <motion.div key="vitals" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
              <div className="space-y-4">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Mood Score (1-10): {moodScore}</label>
                <Slider value={[moodScore]} onValueChange={(v) => setMoodScore(v[0])} max={10} min={1} step={1} className="py-4" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Energy Level</label>
                  <Select onValueChange={setEnergyLevel} value={energyLevel}>
                    <SelectTrigger className="rounded-xl border-zinc-100 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-100">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-zinc-800 dark:border-zinc-700">
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Life Area</label>
                  <Select onValueChange={setLifeArea} value={lifeArea}>
                    <SelectTrigger className="rounded-xl border-zinc-100 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-100">
                      <SelectValue placeholder="Select area" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-zinc-800 dark:border-zinc-700">
                      <SelectItem value="Work">Work</SelectItem>
                      <SelectItem value="Health">Health</SelectItem>
                      <SelectItem value="Social">Social</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button disabled={!energyLevel || !lifeArea} onClick={() => setStep("physical")} className="w-full rounded-xl py-6 bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900">
                Continue <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          )}

          {step === "physical" && (
            <motion.div key="physical" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
              <div className="space-y-4">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Where do you feel your emotions physically?</label>
                <Input placeholder="Describe the physical sensation..." value={bodyScan} onChange={(e) => setBodyScan(e.target.value)} className="rounded-xl border-zinc-100 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 py-6 placeholder:text-zinc-400 dark:placeholder:text-zinc-500" />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Name one Small Win from today.</label>
                <Input placeholder="Something you're proud of..." value={smallWin} onChange={(e) => setSmallWin(e.target.value)} className="rounded-xl border-zinc-100 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 py-6 placeholder:text-zinc-400 dark:placeholder:text-zinc-500" />
              </div>
              <div className="flex gap-4">
                <Button variant="ghost" onClick={() => setStep("vitals")} className="flex-1 dark:text-zinc-300 dark:hover:bg-zinc-800">Back</Button>
                <Button onClick={() => setStep(isDown ? "reframe" : "seed")} className="flex-1 bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900">Next</Button>
              </div>
            </motion.div>
          )}

          {step === "reframe" && (
            <motion.div key="reframe" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
              <div className="space-y-4">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Reframe one negative thought into a growth lesson.</label>
                <Input placeholder="I learned that..." value={reframe} onChange={(e) => setReframe(e.target.value)} className="rounded-xl border-zinc-100 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 py-6 placeholder:text-zinc-400 dark:placeholder:text-zinc-500" />
              </div>
              <div className="flex gap-4">
                <Button variant="ghost" onClick={() => setStep("physical")} className="flex-1 dark:text-zinc-300 dark:hover:bg-zinc-800">Back</Button>
                <Button onClick={() => setStep("seed")} className="flex-1 bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900">Next</Button>
              </div>
            </motion.div>
          )}

          {step === "seed" && (
            <motion.div key="seed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
              <div className="space-y-4">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">One tiny 2-minute Seed task for tomorrow?</label>
                <Input placeholder="e.g., Water one plant, open one email..." value={seedTask} onChange={(e) => setSeedTask(e.target.value)} className="rounded-xl border-zinc-100 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 py-6 placeholder:text-zinc-400 dark:placeholder:text-zinc-500" />
              </div>
              <div className="flex gap-4">
                <Button variant="ghost" onClick={() => setStep(isDown ? "reframe" : "physical")} className="flex-1 dark:text-zinc-300 dark:hover:bg-zinc-800">Back</Button>
                <Button onClick={handleSubmit} className="flex-1 bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 font-bold">Complete <Check className="ml-2 w-4 h-4" /></Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};