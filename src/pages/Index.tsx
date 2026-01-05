import { MoodEntryForm } from "@/components/MoodEntryForm";
import { MoodHistory } from "@/components/MoodHistory";
import { MoodAnalytics } from "@/components/MoodAnalytics";
import { useMoodEntries } from "@/hooks/use-mood-entries";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Sparkles } from "lucide-react";

const Index = () => {
  const { entries, addEntry, deleteEntry } = useMoodEntries();

  return (
    <div className="min-h-screen bg-[#fafafa] selection:bg-indigo-100">
      {/* Decorative background blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-50 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        <header className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center p-2 px-4 rounded-full bg-white shadow-sm border border-gray-100 text-indigo-600 text-sm font-medium gap-2">
            <Sparkles className="w-4 h-4" />
            Your Daily Emotional Companion
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

          {entries.length > 0 && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                Insights
              </h2>
              <MoodAnalytics entries={entries} />
              <MoodHistory entries={entries} onDelete={deleteEntry} />
            </section>
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