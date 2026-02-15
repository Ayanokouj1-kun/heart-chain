import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

interface PaperFoldAnimationProps {
  onComplete: () => void;
}

const PaperFoldAnimation = ({ onComplete }: PaperFoldAnimationProps) => {
  const [phase, setPhase] = useState<"fold1" | "fold2" | "fold3" | "seal">("fold1");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("fold2"), 1200),
      setTimeout(() => setPhase("fold3"), 2400),
      setTimeout(() => setPhase("seal"), 3600),
      setTimeout(() => onComplete(), 5000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const phaseLabel = {
    fold1: "Folding your letter...",
    fold2: "Folding once more...",
    fold3: "Almost there...",
    seal: "Sealing with love ♥",
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
    >
      {/* Paper container */}
      <div className="relative w-48 h-64 mb-8" style={{ perspective: "600px" }}>
        {/* Back of paper */}
        <div className="absolute inset-0 bg-card border-2 border-border rounded-sm shadow-card" />

        {/* Top fold */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1/2 bg-card border-2 border-border rounded-t-sm origin-bottom overflow-hidden"
          animate={{
            rotateX: phase === "fold1" ? 0 : -180,
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d", zIndex: 3 }}
        >
          {/* Lines on paper */}
          <div className="absolute inset-0 p-3 flex flex-col gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-px bg-border/60 w-full" />
            ))}
          </div>
        </motion.div>

        {/* Bottom fold */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1/2 bg-card border-2 border-border rounded-b-sm origin-top"
          animate={{
            rotateX: phase === "fold1" || phase === "fold2" ? 0 : 180,
          }}
          transition={{ duration: 1, ease: "easeInOut", delay: phase === "fold3" ? 0 : 0 }}
          style={{ transformStyle: "preserve-3d", zIndex: 2 }}
        />

        {/* Left fold */}
        <motion.div
          className="absolute top-0 left-0 w-1/2 h-full bg-card border-2 border-border rounded-l-sm origin-right"
          animate={{
            rotateY: phase === "fold1" || phase === "fold2" || phase === "fold3" ? 0 : 90,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d", zIndex: 4 }}
        />

        {/* Wax seal */}
        <AnimatePresence>
          {phase === "seal" && (
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
            >
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-romantic">
                <Heart className="w-7 h-7 text-primary-foreground" fill="currentColor" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Status text */}
      <motion.p
        key={phase}
        className="font-body text-lg text-muted-foreground italic"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {phaseLabel[phase]}
      </motion.p>

      {/* Progress dots */}
      <div className="flex gap-2 mt-4">
        {["fold1", "fold2", "fold3", "seal"].map((p, i) => (
          <motion.div
            key={p}
            className="w-2 h-2 rounded-full"
            animate={{
              backgroundColor:
                ["fold1", "fold2", "fold3", "seal"].indexOf(phase) >= i
                  ? "hsl(350 50% 45%)"
                  : "hsl(30 30% 78%)",
              scale: phase === p ? 1.3 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default PaperFoldAnimation;
