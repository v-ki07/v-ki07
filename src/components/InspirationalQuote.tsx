import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const QUOTES = [
  { text: "The only journey is the one within.", author: "Rainer Maria Rilke" },
  { text: "What you feel, you can heal.", author: "Unknown" },
  { text: "Your feelings are valid, and you are enough.", author: "Unknown" },
  { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "Peace comes from within. Do not seek it without.", author: "Buddha" },
  { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Every day is a new beginning.", author: "Unknown" },
];

const IMAGES = [
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=1000",
];

export const InspirationalQuote = () => {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [imageIdx, setImageIdx] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setQuoteIdx(Math.floor(Math.random() * QUOTES.length));
      setImageIdx(Math.floor(Math.random() * IMAGES.length));
      setIsRefreshing(false);
    }, 500);
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <Card className="relative w-full max-w-2xl mx-auto overflow-hidden border-none shadow-xl h-64 group">
      <AnimatePresence mode="wait">
        <motion.div
          key={imageIdx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img
            src={IMAGES[imageIdx]}
            className="w-full h-full object-cover brightness-[0.4]"
            alt="Inspirational background"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center text-white">
        <Quote className="w-8 h-8 mb-4 opacity-50" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={quoteIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-2"
          >
            <p className="text-xl md:text-2xl font-medium italic leading-relaxed">
              "{QUOTES[quoteIdx].text}"
            </p>
            <p className="text-sm opacity-80">— {QUOTES[quoteIdx].author}</p>
          </motion.div>
        </AnimatePresence>

        <Button
          variant="ghost"
          size="icon"
          onClick={refresh}
          disabled={isRefreshing}
          className="absolute bottom-4 right-4 text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
        </Button>
      </div>
    </Card>
  );
};