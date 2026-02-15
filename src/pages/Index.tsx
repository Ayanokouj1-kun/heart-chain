import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import LetterForm from "@/components/LetterForm";
import ShareLink from "@/components/ShareLink";
import PaperFoldAnimation from "@/components/PaperFoldAnimation";
import { generateShareLink, LetterData } from "@/lib/letterEncoder";

type Step = "write" | "folding" | "share";

const FloatingHearts = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(18)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute text-primary/10"
        style={{
          left: `${3 + (i * 5.5) % 92}%`,
          top: `${5 + (i * 12) % 85}%`,
          fontSize: `${18 + (i % 5) * 12}px`,
        }}
        animate={{
          y: [0, -30, 0],
          x: [0, (i % 2 === 0 ? 8 : -8), 0],
          rotate: [0, 15, -15, 0],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 5 + (i % 4),
          repeat: Infinity,
          delay: i * 0.4,
          ease: "easeInOut",
        }}
      >
        ♥
      </motion.div>
    ))}
  </div>
);

/* Pink glow that follows the cursor */
const CursorGlow = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-50 rounded-full"
      style={{
        left: pos.x - 100,
        top: pos.y - 100,
        width: 200,
        height: 200,
        background: "radial-gradient(circle, hsl(350 60% 65% / 0.18) 0%, transparent 70%)",
        transition: "left 0.08s ease-out, top 0.08s ease-out",
      }}
    />
  );
};

const Index = () => {
  const [step, setStep] = useState<Step>("write");
  const [shareLink, setShareLink] = useState("");
  const letterRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (data: { to: string; from: string; message: string; photos?: string[] }) => {
    const letterData: LetterData = { ...data, unwrapped: false };
    const link = generateShareLink(letterData);
    setShareLink(link);
    setStep("folding");
  };

  const handleFoldComplete = () => {
    setStep("share");
  };

  const handleCreateAnother = () => {
    setStep("write");
    setShareLink("");
  };

  return (
    <div className="min-h-screen bg-gradient-blush relative overflow-hidden">
      <FloatingHearts />
      <CursorGlow />

      {/* Cute Header */}
      <header className="relative z-10 pt-10 pb-6 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-xl mx-auto"
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-3"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-5 h-5 text-accent" />
            <Heart className="w-8 h-8 text-primary" fill="currentColor" />
            <Sparkles className="w-5 h-5 text-accent" />
          </motion.div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-foreground mb-2 leading-tight">
            Create a Letter
          </h1>

          <motion.p
            className="font-body text-base sm:text-lg text-muted-foreground italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Write from the heart, seal it with love ♥
          </motion.p>
        </motion.div>
      </header>

      {/* Letter Section */}
      <section ref={letterRef} className="relative z-10 pb-16 px-4">
        <div className="max-w-xl mx-auto">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {step === "write" && (
              <LetterForm onSubmit={handleSubmit} />
            )}

            {step === "folding" && (
              <PaperFoldAnimation onComplete={handleFoldComplete} />
            )}

            {step === "share" && (
              <ShareLink link={shareLink} onCreateAnother={handleCreateAnother} />
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-10">
        <div className="bg-gradient-romantic rounded-t-[20px] max-w-4xl mx-auto px-6 py-8 text-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="mb-3"
          >
            <Heart className="w-5 h-5 text-primary-foreground mx-auto" fill="currentColor" />
          </motion.div>
          <p className="font-display text-2xl text-primary-foreground mb-1">
            HeartChain
          </p>
          <p className="font-body text-sm text-primary-foreground/80">
            Made with love, sealed with care
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
