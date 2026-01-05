import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "@/hooks/use-profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, ArrowRight, Heart, Brain, Moon } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";

const steps = [
  {
    title: "Welcome to Mood Journal",
    description: "Your safe space for emotional reflection and growth.",
    icon: <Sparkles className="w-12 h-12 text-indigo-500" />,
  },
  {
    title: "What's your name?",
    description: "We'd love to know what to call you.",
    icon: <Heart className="w-12 h-12 text-pink-500" />,
  },
  {
    title: "Ready to start?",
    description: "Checking in daily helps you understand your patterns.",
    icon: <Brain className="w-12 h-12 text-purple-500" />,
  }
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [firstName, setFirstName] = useState("");
  const { updateProfile } = useProfile();
  const navigate = useNavigate();

  const handleNext = async () => {
    if (currentStep === 1 && !firstName.trim()) {
      showError("Please enter your name");
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      const { error } = await updateProfile({ 
        first_name: firstName, 
        onboarding_completed: true 
      });
      
      if (!error) {
        showSuccess(`Welcome, ${firstName}!`);
        navigate("/");
      } else {
        showError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-50 rounded-full blur-[120px] animate-pulse" />

      <Card className="w-full max-w-lg relative z-10 border-none shadow-2xl bg-white/90 backdrop-blur-md">
        <CardHeader className="text-center pt-10">
          <div className="flex justify-center mb-6 animate-bounce">
            {steps[currentStep].icon}
          </div>
          <CardTitle className="text-3xl font-black text-gray-900">
            {steps[currentStep].title}
          </CardTitle>
          <CardDescription className="text-lg text-gray-500">
            {steps[currentStep].description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-10 pt-6">
          {currentStep === 1 && (
            <div className="mb-8 animate-in fade-in slide-in-from-bottom-2">
              <Input
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="text-lg py-6 border-indigo-100 focus:ring-indigo-200"
                autoFocus
              />
            </div>
          )}

          <div className="flex flex-col gap-4">
            <Button 
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-6 rounded-xl transition-all hover:scale-[1.02]"
            >
              {currentStep === steps.length - 1 ? "Get Started" : "Continue"}
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
        </CardContent>
      </Card>
    </div>
  );
}