import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import LetterForm from "@/components/LetterForm";
import ShareLink from "@/components/ShareLink";
import { generateShareLink, LetterData } from "@/lib/letterEncoder";
import { shortenUrl } from "@/lib/urlShortener";

type Step = "write" | "share" | "shortening";

const Index = () => {
  const [step, setStep] = useState<Step>("write");
  const [shareLink, setShareLink] = useState("");

  const handleSubmit = async (data: { to: string; from: string; message: string }) => {
    const letterData: LetterData = { ...data, unwrapped: false };
    const link = generateShareLink(letterData);
    
    // Show loading state while shortening
    setStep("shortening");
    
    // Shorten the URL
    const shortLink = await shortenUrl(link);
    setShareLink(shortLink);
    setStep("share");
  };

  const handleCreateAnother = () => {
    setStep("write");
    setShareLink("");
  };

  return (
    <div className="min-h-screen bg-gradient-blush relative overflow-hidden">
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/[0.08]"
            style={{
              left: `${5 + (i * 8) % 90}%`,
              top: `${10 + (i * 15) % 80}%`,
              fontSize: `${30 + (i % 4) * 20}px`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          >
            ♥
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 py-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-flex items-center justify-center gap-2 mb-2"
            whileHover={{ scale: 1.05 }}
          >
            <Heart className="w-8 h-8 text-primary animate-heartbeat" fill="currentColor" />
            <h1 className="font-display text-4xl md:text-5xl text-foreground">
              HeartChain
            </h1>
            <Heart className="w-8 h-8 text-primary animate-heartbeat" fill="currentColor" />
          </motion.div>
          <p className="font-body text-muted-foreground">
            Send love, wrapped with care
          </p>
        </motion.div>
      </header>

      {/* Main content */}
      <main className="relative z-10 container mx-auto px-4 py-8 pb-16">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: step === "write" ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: step === "write" ? 20 : -20 }}
          transition={{ duration: 0.3 }}
        >
          {step === "write" && <LetterForm onSubmit={handleSubmit} />}
          {step === "shortening" && (
            <motion.div
              className="flex flex-col items-center justify-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="text-primary mb-4"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-12 h-12" fill="currentColor" />
              </motion.div>
              <p className="text-muted-foreground font-body">Creating your short link...</p>
            </motion.div>
          )}
          {step === "share" && (
            <ShareLink link={shareLink} onCreateAnother={handleCreateAnother} />
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center">
        <p className="text-sm text-muted-foreground font-body">
          Made with <span className="text-primary">♥</span> for your Valentine
        </p>
      </footer>

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z"
            fill="hsl(var(--primary) / 0.05)"
          />
        </svg>
      </div>
    </div>
  );
};

export default Index;
