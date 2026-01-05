import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, Brain, TrendingUp, ArrowRight, Heart, MessageCircle, BarChart3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    title: "Welcome to Mood Journal",
    description: "Your safe space for emotional reflection and self-discovery.",
    icon: <Heart className="w-12 h-12 text-pink-500" />,
    color: "bg-pink-50",
  },
  {
    title: "Express Yourself",
    description: "Log your mood in seconds and add personal notes to capture your thoughts and feelings.",
    icon: <MessageCircle className="w-12 h-12 text-blue-500" />,
    color: "bg-blue-50",
  },
  {
    title: "Visualize Your Journey",
    description: "See your emotional trends over time with beautiful, easy-to-read charts and insights.",
    icon: <BarChart3 className="w-12 h-12 text-indigo-500" />,
    color: "bg-indigo-50",
  },
  {
    title: "Build Self-Awareness",
    description: "Understand patterns in your well-being and grow through consistent daily reflection.",
    icon: <Sparkles className="w-12 h-12 text-purple-500" />,
    color: "bg-purple-50",
  },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const { user, profile, refreshProfile, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (profile?.onboarding_completed) return <Navigate to="/" replace />;

  const nextStep = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const { error } = await supabase
        .from("profiles")
        .update({ onboarding_completed: true })
        .eq("id", user.id);

      if (!error) {
        await refreshProfile();
        navigate("/", { replace: true });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-50 rounded-full blur-[120px]" />
      </div>

      <Card className="w-full max-w-lg relative z-10 border-none shadow-2xl overflow-hidden">
        <CardContent className="p-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-12 text-center"
            >
              <div className={`w-24 h-24 ${steps[currentStep].color} rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner transition-colors duration-500`}>
                {steps[currentStep].icon}
              </div>
              
              <h1 className="text-3xl font-black mb-4 text-gray-900">
                {steps[currentStep].title}
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed mb-12">
                {steps[currentStep].description}
              </p>

              <div className="flex flex-col gap-6">
                <Button 
                  onClick={nextStep}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-8 rounded-2xl text-lg shadow-lg shadow-indigo-100 transition-all hover:scale-[1.02]"
                >
                  {currentStep === steps.length - 1 ? "Start Journaling" : "Continue"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>

                <div className="flex justify-center gap-2">
                  {steps.map((_, i) => (
                    <div 
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === currentStep ? "w-8 bg-indigo-600" : "w-2 bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}