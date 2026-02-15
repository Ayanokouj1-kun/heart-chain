import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ArrowLeft } from "lucide-react";
import GiftBox from "@/components/GiftBox";
import RevealedLetter from "@/components/RevealedLetter";
import Confetti from "@/components/Confetti";
import MusicToggle from "@/components/MusicToggle";
import LetterUnfoldAnimation from "@/components/LetterUnfoldAnimation";
import { Button } from "@/components/ui/button";
import { decodeLetter, LetterData } from "@/lib/letterEncoder";
import { useUnwrapSound, useBackgroundMusic } from "@/hooks/useAudio";

const GiftPage = () => {
  const { encoded } = useParams<{ encoded: string }>();
  const [letterData, setLetterData] = useState<LetterData | null>(null);
  const [isUnwrapped, setIsUnwrapped] = useState(false);
  const [isUnwrapping, setIsUnwrapping] = useState(false);
  const [isImpacted, setIsImpacted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [error, setError] = useState(false);

  const unwrapSound = useUnwrapSound();
  const backgroundMusic = useBackgroundMusic();

  useEffect(() => {
    if (encoded) {
      const data = decodeLetter(encoded);
      if (data) {
        setLetterData(data);
        // Check localStorage for unwrap status
        const storageKey = `heartchain_${encoded}`;
        const wasUnwrapped = localStorage.getItem(storageKey) === "true";
        if (wasUnwrapped) {
          setIsUnwrapped(true);
        }
      } else {
        setError(true);
      }
    }
  }, [encoded]);

  const handleUnwrap = () => {
    if (isUnwrapped || isUnwrapping) return;

    setIsUnwrapping(true);
    setShowConfetti(true);

    // Play unwrap sound
    unwrapSound.play();

    // Save unwrap status to localStorage
    const storageKey = `heartchain_${encoded}`;
    localStorage.setItem(storageKey, "true");

    // Letter animation takes about 7 seconds
    setTimeout(() => {
      setIsUnwrapped(true);
      setIsUnwrapping(false);
    }, 7000);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-blush flex items-center justify-center px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
            <Heart className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="font-display text-2xl text-foreground mb-2">
            Letter Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            This love letter seems to have gotten lost...
          </p>
          <Button asChild variant="romantic">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Create Your Own
            </Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  if (!letterData) {
    return (
      <div className="min-h-screen bg-gradient-blush flex items-center justify-center">
        <motion.div
          className="text-primary"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <Heart className="w-12 h-12" fill="currentColor" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-blush relative overflow-hidden">
      <Confetti isActive={showConfetti} />

      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/[0.06]"
            style={{
              left: `${10 + (i * 12) % 80}%`,
              top: `${15 + (i * 20) % 70}%`,
              fontSize: `${25 + (i % 3) * 15}px`,
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 8, -8, 0],
            }}
            transition={{
              duration: 3 + (i % 2),
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          >
            ♥
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 py-6 px-4">
        <motion.div
          className="flex items-center justify-between max-w-4xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link to="/" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Heart className="w-6 h-6 text-primary" fill="currentColor" />
            <span className="font-display text-2xl text-foreground">HeartChain</span>
          </Link>
          <MusicToggle
            isPlaying={backgroundMusic.isPlaying}
            isLoading={backgroundMusic.isLoading}
            onToggle={backgroundMusic.toggle}
          />
        </motion.div>
      </header>

      {/* Main content */}
      <main className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[60vh]">
        {!isUnwrapped ? (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.h1
              className="font-display text-3xl md:text-4xl text-foreground mb-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              A Gift For You
            </motion.h1>
            <motion.p
              className="text-muted-foreground font-body mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Someone special sent you a love letter ♥
            </motion.p>

            <div className="relative w-full max-w-md h-[450px] mx-auto flex items-center justify-center">
              {isUnwrapping ? (
                <div className="absolute inset-0 z-40 flex items-center justify-center">
                  <LetterUnfoldAnimation onComplete={() => { }} />
                </div>
              ) : (
                <div className="w-64 h-72 mx-auto">
                  <GiftBox
                    isUnwrapping={isUnwrapping}
                    onUnwrap={handleUnwrap}
                  />
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <RevealedLetter
            to={letterData.to}
            from={letterData.from}
            message={letterData.message}
            photos={letterData.photos}
          />
        )}
      </main>

      {/* Create your own CTA */}
      {isUnwrapped && (
        <motion.div
          className="relative z-10 text-center pb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Button asChild variant="outline">
            <Link to="/">
              <Heart className="w-4 h-4 mr-2" />
              Create Your Own Love Letter
            </Link>
          </Button>
        </motion.div>
      )}

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none">
        <svg
          viewBox="0 0 1440 100"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 C320,100 640,0 960,50 C1200,85 1360,70 1440,50 L1440,100 L0,100 Z"
            fill="hsl(var(--primary) / 0.05)"
          />
        </svg>
      </div>
    </div>
  );
};

export default GiftPage;
