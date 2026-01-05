import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Heart, LineChart, ShieldCheck, ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { showSuccess } from "@/utils/toast";

const STEPS = [
  {
    title: "Welcome to Mood Journal",
    description: "Your safe space for emotional growth and self-reflection. Let's get you settled in.",
    icon: <Sparkles className="w-12 h-12 text-indigo-500" />,
    color: "bg-indigo-50",
  },
  {
    title: "Track Your Feelings",
    description: "Log your mood daily with simple emojis. It only takes 10 seconds to check in with yourself.",
    icon: <Heart className="w-12 h-12 text-red-500" />,
    color: "bg-red-50",
  },
  {
    title: "See Your Progress",
    description: "Visualize your emotional trends over time and gain deep insights into your mental well-being.",
    icon: <LineChart className="w-12 h-12 text-blue-500" />,
    color: "bg-blue-50",
  },
  {
    title: "Private & Secure",
    description: "Your entries are encrypted and only accessible by you. Your privacy is our top priority.",
    icon: <ShieldCheck className="w-12 h-12 text-emerald-500" />,
    color: "bg-emerald-50",
  },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isFinishing, setIsFinishing] = useState(false);

  const handleNext = async () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsFinishing(true);
      if (user) {
        await supabase
          .from("profiles")
          .update({ onboarding_completed: true })
          .eq("id", user.id);
      }
      showSuccess("Welcome aboard!");
      navigate("/", { replace: true });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={cn(
          "absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] transition-colors duration-1000 opacity-20",
          STEPS[currentStep].color.replace('bg-', 'bg-')
        )} />
      </div>

      <div className="w-full max-w-xl relative z-10">
        <div className="flex justify-center gap-2 mb-8">
          {STEPS.map((_, idx) => (
            <div 
              key={idx}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                idx === currentStep ? "w-8 bg-indigo-600" : "w-2 bg-gray-200"
              )}
            />
          ))}
        </div>

        <Card className="border-none shadow-2xl overflow-hidden bg-white/90 backdrop-blur-md">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className={cn(
                "p-6 rounded-3xl transition-all duration-500 transform hover:scale-110",
                STEPS[currentStep].color
              )}>
                {STEPS[currentStep].icon}
              </div>
              
              <div className="space-y-3">
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                  {STEPS[currentStep].title}
                </h1>
                <p className="text-gray-500 text-lg leading-relaxed max-w-sm mx-auto">
                  {STEPS[currentStep].description}
                </p>
              </div>

              <div className="flex items-center gap-4 w-full pt-8">
                {currentStep > 0 && (
                  <Button
                    variant="ghost"
                    onClick={handleBack}
                    className="flex-1 py-6 rounded-2xl text-gray-500"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  disabled={isFinishing}
                  className={cn(
                    "flex-1 py-6 rounded-2xl font-bold transition-all shadow-lg hover:shadow-indigo-200",
                    "bg-indigo-600 hover:bg-indigo-700 text-white"
                  )}
                >
                  {currentStep === STEPS.length - 1 ? "Get Started" : "Continue"}
                  {currentStep !== STEPS.length - 1 && <ChevronRight className="w-4 h-4 ml-2" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}