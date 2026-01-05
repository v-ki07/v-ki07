import { EnhancedMoodEntryForm } from "@/components/EnhancedMoodEntryForm";
import { EnhancedMoodHistory } from "@/components/EnhancedMoodHistory";
import { EnhancedMoodAnalytics } from "@/components/EnhancedMoodAnalytics";
import { InspirationalQuote } from "@/components/InspirationalQuote";
import { useMoodEntries } from "@/hooks/use-mood-entries";
import { Sparkles } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Index = () => {
  const { entries, addEntry, deleteEntry, loading } = useMoodEntries();
  const { profile } = useAuth();

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-zinc-950 selection:bg-indigo-100 dark:selection:bg-indigo-900/30">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 dark:bg-indigo-950/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-50 dark:bg-purple-950/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <SidebarTrigger />
        </div>

        <header className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center p-2 px-4 rounded-full bg-white dark:bg-zinc-900 shadow-sm border border-gray-100 dark:border-zinc-800 text-indigo-600 dark:text-indigo-400 text-sm font-medium gap-2">
            <Sparkles className="w-4 h-4" />
            Welcome back, {profile?.first_name || "Journaler"}
          </div>
          <h1 className="text-5xl font-black tracking-tight text-gray-900 dark:text-white">
            Mood <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Journal</span>
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 text-lg max-w-md mx-auto mb-8">
            Take a moment to check in with yourself. Every feeling matters.
          </p>
          
          <InspirationalQuote />
        </header>

        <main className="space-y-12">
          <section>
            <EnhancedMoodEntryForm onAdd={addEntry} />
          </section>

          {!loading && entries.length > 0 && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                Insights
              </h2>
              <EnhancedMoodAnalytics entries={entries} />
              <EnhancedMoodHistory entries={entries} onDelete={deleteEntry} />
            </section>
          )}

          {!loading && entries.length === 0 && (
            <div className="text-center py-12 text-gray-400 dark:text-zinc-500">
              No entries yet. Start by logging your mood above!
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;