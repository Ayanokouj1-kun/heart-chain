import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import LetterForm from "@/components/LetterForm";
import ShareLink from "@/components/ShareLink";
import { generateShareLink, LetterData } from "@/lib/letterEncoder";
import { shortenUrl } from "@/lib/urlShortener";

type Step = "landing" | "write" | "share" | "shortening";

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

const Index = () => {
  const [step, setStep] = useState<Step>("landing");
  const [shareLink, setShareLink] = useState("");
  const letterRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (data: { to: string; from: string; message: string; photos?: string[] }) => {
    const letterData: LetterData = { ...data, unwrapped: false };
    const link = generateShareLink(letterData);
    setStep("shortening");
    const shortLink = await shortenUrl(link);
    setShareLink(shortLink);
    setStep("share");
  };

  const handleCreateAnother = () => {
    setStep("landing");
    setShareLink("");
  };

  const scrollToLetter = () => {
    setStep("write");
    setTimeout(() => {
      letterRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-blush relative overflow-hidden">
      <FloatingHearts />

      {/* Hero Section */}
      <section className="relative z-10 min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl mx-auto"
        >
          <motion.div
            className="inline-block mb-6"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart className="w-12 h-12 text-primary mx-auto" fill="currentColor" />
          </motion.div>

          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl text-foreground mb-4 leading-tight">
            To My Love
          </h1>

          <motion.p
            className="font-body text-lg sm:text-xl text-muted-foreground mb-10 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Every word is written from the heart.
          </motion.p>

          <motion.button
            onClick={scrollToLetter}
            className="font-body px-10 py-4 rounded-[20px] bg-primary text-primary-foreground text-lg shadow-romantic hover:shadow-glow transition-all duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
          >
            Read My Letter
          </motion.button>
        </motion.div>
      </section>

      {/* Letter Section */}
      <section ref={letterRef} className="relative z-10 py-16 px-4">
        <div className="max-w-xl mx-auto">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {(step === "landing" || step === "write") && (
              <LetterForm onSubmit={handleSubmit} />
            )}

            {step === "shortening" && (
              <motion.div
                className="flex flex-col items-center justify-center py-20 bg-card rounded-[20px] shadow-card border border-border"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="text-primary mb-5"
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  <Heart className="w-14 h-14" fill="currentColor" />
                </motion.div>
                <p className="text-muted-foreground font-body text-lg">
                  Sealing your letter with love...
                </p>
              </motion.div>
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
