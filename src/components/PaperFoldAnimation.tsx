import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Heart, Star, Sparkles, Mail } from "lucide-react";
import { useUnwrapSound } from "@/hooks/useAudio"; // Re-using sound hook for crinkle

interface PaperFoldAnimationProps {
  onComplete: () => void;
}

const PaperFoldAnimation = ({ onComplete }: PaperFoldAnimationProps) => {
  // Phases: folding -> sliding -> sealed
  const [phase, setPhase] = useState<"folding" | "sliding" | "sealed">("folding");
  const { play: playCrinkle } = useUnwrapSound();

  useEffect(() => {
    // Play sound initially
    playCrinkle();

    const timers = [
      setTimeout(() => setPhase("sliding"), 3500), // Start sliding into envelope at 3.5s
      setTimeout(() => playCrinkle(), 3600), // Another sound for sliding
      setTimeout(() => setPhase("sealed"), 5500),  // Sealed and waiting
      setTimeout(() => onComplete(), 7000),      // Complete at 7s
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete, playCrinkle]);

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-12 relative overflow-visible"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      {/* Floating Magic Elements */}
      <AnimatePresence>
        {phase === "folding" && [...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/30"
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: (Math.random() - 0.5) * 100,
              y: -50 - Math.random() * 50,
            }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
            style={{ top: "40%", left: "50%" }}
          >
            {i % 2 === 0 ? <Heart className="w-4 h-4 fill-current" /> : <Star className="w-3 h-3 fill-current" />}
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="relative w-64 h-48 flex items-center justify-center" style={{ perspective: "1000px" }}>

        {/* The Envelope (Visible during sliding and sealed) */}
        <motion.div
          className="absolute z-20 w-64 h-40 bg-rose-100 border-2 border-rose-200 rounded-lg shadow-xl flex items-end justify-center overflow-hidden"
          initial={{ y: 100, opacity: 0 }}
          animate={{
            y: phase === "folding" ? 100 : 0,
            opacity: phase === "folding" ? 0 : 1
          }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Envelope Front Details */}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-rose-200" style={{ clipPath: "polygon(0 0, 50% 100%, 100% 0, 100% 100%, 0 100%)" }} />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-rose-300 opacity-50" style={{ clipPath: "polygon(0 0, 50% 80%, 100% 0)" }} />
        </motion.div>

        {/* The Folding Paper */}
        <motion.div
          className="relative z-10 w-48 h-60 bg-white shadow-sm border border-gray-100"
          animate={
            phase === "folding" ? {
              scale: [1, 0.8, 0.4],
              rotateX: [0, 60, 0],
              y: [0, 0, 0]
            } : phase === "sliding" ? {
              scale: 0.4,
              y: 80, // Slide down
              opacity: 1
            } : {
              scale: 0.4,
              y: 150, // Hidden inside
              opacity: 0
            }
          }
          transition={{ duration: 3, times: [0, 0.5, 1] }}
        >
          {/* Paper Texture */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>
          {/* Lines */}
          <div className="w-full h-full p-4 flex flex-col gap-3">
            <div className="w-3/4 h-2 bg-gray-100 rounded" />
            <div className="w-full h-2 bg-gray-100 rounded" />
            <div className="w-5/6 h-2 bg-gray-100 rounded" />
          </div>
        </motion.div>

        {/* Envelope Flap (Closing Animation) */}
        <motion.div
          className="absolute z-30 top-4 w-64 h-32 bg-rose-200 origin-top rounded-t-lg shadow-sm"
          style={{ clipPath: "polygon(0 0, 50% 50%, 100% 0)" }}
          initial={{ rotateX: 180 }}
          animate={{ rotateX: phase === "sealed" ? 0 : 180 }}
          transition={{ duration: 0.6, type: "spring" }}
        />

        {/* Heart Seal */}
        <AnimatePresence>
          {phase === "sealed" && (
            <motion.div
              className="absolute z-40 top-16"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
            >
              <div className="w-10 h-10 bg-red-400 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                <Heart className="w-5 h-5 text-white fill-current" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Text Status */}
      <motion.p
        key={phase}
        className="mt-8 font-typewriter text-primary/80"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        {phase === "folding" && "Folding your words with care..."}
        {phase === "sliding" && "Tucking them into the envelope..."}
        {phase === "sealed" && "Sealed with a magical touch ✨"}
      </motion.p>
    </motion.div>
  );
};

export default PaperFoldAnimation;
