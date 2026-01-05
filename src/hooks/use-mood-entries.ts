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
      .select("id, created_at, mood, note") // Select only relevant fields
      .order("created_at", { ascending: false });

    if (error) {
      showError("Failed to fetch entries");
      return;
    }

    const formattedEntries: MoodEntry[] = data.map(e => ({
      id: e.id,
      date: e.created_at,
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
        note: entry.note
      })
      .select("id, created_at, mood, note") // Select only relevant fields
      .single();

    if (error) {
      showError("Failed to save entry");
      return;
    }

    const newEntry: MoodEntry = {
      id: data.id,
      date: data.created_at,
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