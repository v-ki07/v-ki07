export type MoodType = "great" | "good" | "neutral" | "bad" | "terrible";

export interface MoodEntry {
  id: string;
  date: string;
  mood: MoodType;
  note: string;
  body_scan?: string;
  coping_strategy?: string;
  gratitude_items?: string[];
}

export const MOOD_CONFIG: Record<MoodType, { 
  emoji: string; 
  label: string; 
  color: string; 
  bg: string;
  pixelColor: string;
  pixelLabel: string;
  visualMetaphor: string;
}> = {
  great: { 
    emoji: "🤩", 
    label: "Great", 
    color: "text-emerald-600", 
    bg: "bg-emerald-50",
    pixelColor: "#10b981",
    pixelLabel: "Radiant",
    visualMetaphor: "A field of sunflowers turning toward a golden sun."
  },
  good: { 
    emoji: "😊", 
    label: "Good", 
    color: "text-blue-600", 
    bg: "bg-blue-50",
    pixelColor: "#3b82f6",
    pixelLabel: "Serene",
    visualMetaphor: "A calm lake reflecting a clear blue sky."
  },
  neutral: { 
    emoji: "😐", 
    label: "Neutral", 
    color: "text-gray-600", 
    bg: "bg-gray-50",
    pixelColor: "#9ca3af",
    pixelLabel: "Balanced",
    visualMetaphor: "A quiet path through a misty morning forest."
  },
  bad: { 
    emoji: "😔", 
    label: "Bad", 
    color: "text-orange-600", 
    bg: "bg-orange-50",
    pixelColor: "#f97316",
    pixelLabel: "Unsettled",
    visualMetaphor: "A lone candle flickering in a gentle breeze."
  },
  terrible: { 
    emoji: "😫", 
    label: "Terrible", 
    color: "text-red-600", 
    bg: "bg-red-50",
    pixelColor: "#ef4444",
    pixelLabel: "Stormy",
    visualMetaphor: "A rugged cliff standing strong against a crashing ocean."
  },
};