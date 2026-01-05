import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, Heart } from "lucide-react";

export default function Onboarding() {
  const { user, profile, refreshProfile, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (profile?.onboarding_completed) return <Navigate to="/" replace />;

  const handleGetStarted = async () => {
    const { error } = await supabase
      .from("profiles")
      .update({ onboarding_completed: true })
      .eq("id", user.id);

    if (!error) {
      await refreshProfile();
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-50 rounded-full blur-[120px]" />
      </div>

      <Card className="w-full max-w-md relative z-10 border-none shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mx-auto mb-2">
            <Heart className="w-10 h-10 text-indigo-600" />
          </div>
          <CardTitle className="text-3xl font-black">Welcome to Mood Journal</CardTitle>
          <CardDescription className="text-lg">
            A simple space to track your feelings and reflect on your day.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
              <Sparkles className="w-5 h-5 text-indigo-500 mt-1" />
              <p className="text-sm text-gray-600">Log your mood in seconds with just a few taps.</p>
            </div>
          </div>

          <Button 
            onClick={handleGetStarted}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-indigo-100"
          >
            Start Your Journey
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}