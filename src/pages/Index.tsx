import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoodEntryForm } from "@/components/MoodEntryForm";
import { MoodHistory } from "@/components/MoodHistory";
import { MoodAnalytics } from "@/components/MoodAnalytics";
import { useMoodEntries } from "@/hooks/use-mood-entries";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Sparkles, LogOut, Loader2 } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const { entries, addEntry, deleteEntry, loading: entriesLoading } = useMoodEntries();
  const { signOut, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    async function checkOnboarding() {
      if (!user) return;
      
      const { data, error } = await supabase
        .from("profiles")
        .select("onboarding_completed")
        .eq("id", user.id)
        .single();

      if (!error && data && data.onboarding_completed === false) {
        navigate("/onboarding", { replace: true });
      }
      setProfileLoading(false);
    }

    if (!authLoading && user) {
      checkOnboarding();
    }
  }, [user, authLoading, navigate]);

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] selection:bg-indigo-100">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-50 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex justify-end mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={signOut}
            className="text-gray-500 hover:text-indigo-600 gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>

        <header className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center p-2 px-4 rounded-full bg-white shadow-sm border border-gray-100 text-indigo-600 text-sm font-medium gap-2">
            <Sparkles className="w-4 h-4" />
            Welcome back, {user?.email?.split('@')[0]}
          </div>
          <h1 className="text-5xl font-black tracking-tight text-gray-900">
            Mood <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Journal</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-md mx-auto">
            Take a moment to check in with yourself. Every feeling matters.
          </p>
        </header>

        <main className="space-y-12">
          <section>
            <MoodEntryForm onAdd={addEntry} />
          </section>

          {!entriesLoading && entries.length > 0 && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                Insights
              </h2>
              <MoodAnalytics entries={entries} />
              <MoodHistory entries={entries} onDelete={deleteEntry} />
            </section>
          )}

          {!entriesLoading && entries.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No entries yet. Start by logging your mood above!
            </div>
          )}
        </main>

        <footer className="mt-20 pt-8 border-t border-gray-100">
          <MadeWithDyad />
        </footer>
      </div>
    </div>
  );
};

export default Index;