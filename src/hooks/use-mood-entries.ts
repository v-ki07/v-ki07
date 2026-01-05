import { useState, useEffect } from "react";
import { MoodEntry } from "@/types/mood";

export function useMoodEntries() {
  const [entries, setEntries] = useState<MoodEntry[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("mood_entries");
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  const addEntry = (entry: Omit<MoodEntry, "id" | "date">) => {
    const newEntry: MoodEntry = {
      ...entry,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };
    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem("mood_entries", JSON.stringify(updated));
  };

  const deleteEntry = (id: string) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    localStorage.setItem("mood_entries", JSON.stringify(updated));
  };

  return { entries, addEntry, deleteEntry };
}