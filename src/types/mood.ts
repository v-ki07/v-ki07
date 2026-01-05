export type MoodType = "great" | "good" | "neutral" | "bad" | "terrible";

export interface MoodEntry {
  id: string;
  date: string;
  mood_score: number;
  energy_level: string;
  life_area: string;
  body_scan: string;
  small_win: string;
  reframe_note?: string;
  seed_task: string;
  visual_metaphor: string;
  hex_color: string;
  achievement_badge: string;
  mood: MoodType; // Kept for legacy compatibility
  note?: string;
}

export const MOOD_CONFIG: Record<string, { 
  emoji: string; 
  label: string; 
  color: string; 
  bg: string;
  pixelColor: string;
  pixelLabel: string;
}> = {
  "10": { emoji: "🤩", label: "Radiant", color: "text-emerald-600", bg: "bg-emerald-50", pixelColor: "#10b981", pixelLabel: "Radiant" },
  "9": { emoji: "✨", label: "Inspired", color: "text-emerald-500", bg: "bg-emerald-50", pixelColor: "#34d399", pixelLabel: "Luminous" },
  "8": { emoji: "😊", label: "Content", color: "text-blue-600", bg: "bg-blue-50", pixelColor: "#3b82f6", pixelLabel: "Serene" },
  "7": { emoji: "🙂", label: "Stable", color: "text-blue-400", bg: "bg-blue-50", pixelColor: "#60a5fa", pixelLabel: "Calm" },
  "6": { emoji: "😐", label: "Neutral", color: "text-gray-600", bg: "bg-gray-50", pixelColor: "#9ca3af", pixelLabel: "Balanced" },
  "5": { emoji: "😶", label: "Quiet", color: "text-gray-400", bg: "bg-gray-50", pixelColor: "#d1d5db", pixelLabel: "Still" },
  "4": { emoji: "😔", label: "Low", color: "text-orange-500", bg: "bg-orange-50", pixelColor: "#f97316", pixelLabel: "Unsettled" },
  "3": { emoji: "😟", label: "Heavier", color: "text-orange-700", bg: "bg-orange-50", pixelColor: "#c2410c", pixelLabel: "Strained" },
  "2": { emoji: "😫", label: "Overwhelmed", color: "text-red-600", bg: "bg-red-50", pixelColor: "#ef4444", pixelLabel: "Stormy" },
  "1": { emoji: "😭", label: "Crisis", color: "text-red-800", bg: "bg-red-50", pixelColor: "#991b1b", pixelLabel: "Dark" },
};