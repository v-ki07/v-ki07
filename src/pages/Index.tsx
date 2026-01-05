import { MoodEntryForm } from "@/components/MoodEntryForm";
import { MoodHistory } from "@/components/MoodHistory";
import { MoodAnalytics } from "@/components/MoodAnalytics";
import { InspirationalQuote } from "@/components/InspirationalQuote";
import { useMoodEntries } from "@/hooks/use-mood-entries";
import { Sparkles, LogOut, Trash2, AlertTriangle } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError } from "@/utils/toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Index = () => {
  const { entries, addEntry, deleteEntry, loading } = useMoodEntries();
  const { signOut, user } = useAuth();

  const handleDeleteAccount = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await fetch(
        "https://qlcjjmtjocsauszbkyrx.supabase.co/functions/v1/delete-account",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete account");
      }

      showSuccess("Account deleted successfully");
      await signOut();
    } catch (error: any) {
      showError(error.message || "An error occurred during deletion");
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] selection:bg-indigo-100">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-50 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex justify-end items-center gap-4 mb-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 hover:text-red-600 gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="text-red-500 w-5 h-5" />
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  account and remove all your journaling data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDeleteAccount}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Yes, Delete My Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

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
          <p className="text-gray-500 text-lg max-w-md mx-auto mb-8">
            Take a moment to check in with yourself. Every feeling matters.
          </p>
          
          <InspirationalQuote />
        </header>

        <main className="space-y-12">
          <section>
            <MoodEntryForm onAdd={addEntry} />
          </section>

          {!loading && entries.length > 0 && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                Insights
              </h2>
              <MoodAnalytics entries={entries} />
              <MoodHistory entries={entries} onDelete={deleteEntry} />
            </section>
          )}

          {!loading && entries.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No entries yet. Start by logging your mood above!
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;