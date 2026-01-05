export type MoodType = "great" | "good" | "neutral" | "bad" | "terrible";

export interface MoodEntry {
  id: string;
  date: string;
  mood: MoodType;
  note?: string;
  body_scan?: string;
  coping_strategy?: string;
  gratitude_items?: string[];
  small_win?: string;
  reframe_note?: string;
  seed_task?: string;
  achievement_badge?: string;
  hex_color?: string;
  visual_metaphor?: string;
}

export const MOOD_CONFIG: Record<MoodType, { 
  emoji: string; 
  label: string; 
  color: string; 
  bg: string;
}> = {
  great: { emoji: "🤩", label: "Great", color: "text-emerald-600", bg: "bg-emerald-50" },
  good: { emoji: "😊", label: "Good", color: "text-blue-600", bg: "bg-blue-50" },
  neutral: { emoji: "😐", label: "Neutral", color: "text-gray-600", bg: "bg-gray-50" },
  bad: { emoji: "😔", label: "Bad", color: "text-orange-500", bg: "bg-orange-50" },
  terrible: { emoji: "😭", label: "Terrible", color: "text-red-600", bg: "bg-red-50" },
};