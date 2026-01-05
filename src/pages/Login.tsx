import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth } from "@/components/AuthProvider";
import { Navigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { useTheme } from "next-themes";

export default function Login() {
  const { session, loading } = useAuth();
  const { theme } = useTheme();

  if (loading) return null;
  if (session) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] dark:bg-zinc-950 p-4 transition-colors duration-500">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 dark:bg-indigo-950/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-50 dark:bg-purple-950/20 rounded-full blur-[120px]" />
      </div>

      <Card className="w-full max-w-md relative z-10 border-none shadow-2xl dark:bg-zinc-900">
        <CardHeader className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-2 px-4 rounded-full bg-white dark:bg-zinc-800 shadow-sm border border-gray-100 dark:border-zinc-700 text-indigo-600 dark:text-indigo-400 text-sm font-medium gap-2 mx-auto">
            <Sparkles className="w-4 h-4" />
            Mood Journal
          </div>
          <CardTitle className="text-3xl font-black dark:text-white">Welcome Back</CardTitle>
          <CardDescription className="dark:text-zinc-400">Sign in to continue your reflection journey</CardDescription>
        </CardHeader>
        <CardContent>
          <Auth
            supabaseClient={supabase}
            appearance={{ 
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#6366f1',
                    brandAccent: '#4f46e5',
                  }
                }
              }
            }}
            providers={[]}
            theme={theme === 'dark' ? 'dark' : 'light'}
          />
        </CardContent>
      </Card>
    </div>
  );
}