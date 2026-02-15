import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

interface PaperFoldAnimationProps {
  onComplete: () => void;
}

const PaperFoldAnimation = ({ onComplete }: PaperFoldAnimationProps) => {
  const [phase, setPhase] = useState<"show" | "fold-top" | "fold-bottom" | "fold-sides" | "seal">("show");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("fold-top"), 800),
      setTimeout(() => setPhase("fold-bottom"), 1800),
      setTimeout(() => setPhase("fold-sides"), 2800),
      setTimeout(() => setPhase("seal"), 3800),
      setTimeout(() => onComplete(), 5000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const phaseLabel = {
    show: "Preparing your letter...",
    "fold-top": "Folding your heart into every corner...",
    "fold-bottom": "Keeping your secrets safe...",
    "fold-sides": "Wrapping it with care...",
    seal: "Sealing with a kiss of love ♥",
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative w-48 h-64 mb-12" style={{ perspective: "1000px" }}>
        {/* Base layer (Back of paper) */}
        <div className="absolute inset-0 bg-card border border-border/40 rounded-sm shadow-sm" />

        {/* Paper texture base */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none rounded-sm z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Top Fold */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1/3 bg-card border border-border/40 rounded-t-sm origin-bottom z-10"
          initial={{ rotateX: 0 }}
          animate={{
            rotateX: phase !== "show" ? -180 : 0,
            y: phase !== "show" ? 0 : 0,
            boxShadow: phase !== "show" ? "0 4px 6px -1px rgb(0 0 0 / 0.1)" : "none"
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Texture on fold back */}
          <div className="absolute inset-0 bg-card/80 opacity-[0.05]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        </motion.div>

        {/* Bottom Fold */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1/3 bg-card border border-border/40 rounded-b-sm origin-top z-20"
          initial={{ rotateX: 0 }}
          animate={{
            rotateX: (phase === "fold-bottom" || phase === "fold-sides" || phase === "seal") ? 180 : 0,
            boxShadow: (phase === "fold-bottom" || phase === "fold-sides" || phase === "seal") ? "0 -4px 6px -1px rgb(0 0 0 / 0.1)" : "none"
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="absolute inset-0 bg-card/80 opacity-[0.05]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        </motion.div>

        {/* Side Folds (Left and Right folding in) */}
        <div className="absolute inset-x-0 top-1/3 bottom-1/3 z-30 pointer-events-none overflow-visible">
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-1/2 bg-card border border-border/30 rounded-l-sm origin-right shadow-sm"
            animate={{ rotateY: (phase === "fold-sides" || phase === "seal") ? 179 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-0 top-0 bottom-0 w-1/2 bg-card border border-border/30 rounded-r-sm origin-left shadow-sm"
            animate={{ rotateY: (phase === "fold-sides" || phase === "seal") ? -179 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </div>

        {/* Wax seal */}
        <AnimatePresence>
          {phase === "seal" && (
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
              initial={{ scale: 3, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.4 }}
            >
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-primary/95 flex items-center justify-center shadow-lg border border-primary-foreground/20">
                  <Heart className="w-7 h-7 text-white fill-current" />
                </div>
                {/* Seal wax drips simplified */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-2 bg-primary/90 rounded-full blur-[1px]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.p
        key={phase}
        className="font-typewriter text-base text-muted-foreground/80 mt-4 text-center px-4"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {phaseLabel[phase]}
      </motion.p>

      <div className="flex gap-1.5 mt-6">
        {Object.keys(phaseLabel).map((key, i) => (
          <motion.div
            key={key}
            className="h-1 rounded-full bg-primary"
            animate={{
              width: phase === key ? 24 : 8,
              opacity: Object.keys(phaseLabel).indexOf(phase) >= i ? 0.6 : 0.2
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default PaperFoldAnimation;
