import { useState, useEffect } from "react";
import { MoodEntry, MoodType } from "@/types/mood";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { showError } from "@/utils/toast";

export function useMoodEntries() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from("mood_entries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      showError("Failed to fetch entries");
      return;
    }

    const formattedEntries: MoodEntry[] = data.map(e => ({
      id: e.id,
      date: e.created_at,
      mood_score: e.mood_score,
      energy_level: e.energy_level,
      life_area: e.life_area,
      body_scan: e.body_scan,
      small_win: e.small_win,
      reframe_note: e.reframe_note,
      seed_task: e.seed_task,
      visual_metaphor: e.visual_metaphor,
      hex_color: e.hex_color,
      achievement_badge: e.achievement_badge,
      mood: e.mood as MoodType,
      note: e.note || ""
    }));

    setEntries(formattedEntries);
    setLoading(false);
  };

  useEffect(() => {
    fetchEntries();
  }, [user]);

  const addEntry = async (entry: Omit<MoodEntry, "id" | "date">) => {
    if (!user) return;

    const { data, error } = await supabase
      .from("mood_entries")
      .insert({
        user_id: user.id,
        mood: entry.mood,
        mood_score: entry.mood_score,
        energy_level: entry.energy_level,
        life_area: entry.life_area,
        body_scan: entry.body_scan,
        small_win: entry.small_win,
        reframe_note: entry.reframe_note,
        seed_task: entry.seed_task,
        achievement_badge: entry.achievement_badge,
        hex_color: entry.hex_color,
        visual_metaphor: entry.visual_metaphor,
        note: entry.note
      })
      .select()
      .single();

    if (error) {
      showError("Failed to save entry");
      return;
    }

    const newEntry: MoodEntry = {
      id: data.id,
      date: data.created_at,
      mood_score: data.mood_score,
      energy_level: data.energy_level,
      life_area: data.life_area,
      body_scan: data.body_scan,
      small_win: data.small_win,
      reframe_note: data.reframe_note,
      seed_task: data.seed_task,
      visual_metaphor: data.visual_metaphor,
      hex_color: data.hex_color,
      achievement_badge: data.achievement_badge,
      mood: data.mood as MoodType,
      note: data.note || ""
    };

    setEntries([newEntry, ...entries]);
  };

  const deleteEntry = async (id: string) => {
    const { error } = await supabase
      .from("mood_entries")
      .delete()
      .eq("id", id);

    if (error) {
      showError("Failed to delete entry");
      return;
    }

    setEntries(entries.filter((e) => e.id !== id));
  };

  return { entries, addEntry, deleteEntry, loading };
}