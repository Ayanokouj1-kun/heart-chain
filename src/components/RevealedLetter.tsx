import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import HeartEnvelope from "./HeartEnvelope";

interface RevealedLetterProps {
  to: string;
  from: string;
  message: string;
  photos?: string[];
}

const RevealedLetter = ({ to, from, message, photos }: RevealedLetterProps) => {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      className="w-full max-w-lg mx-auto"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="relative">
        {/* Decorative hearts background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-primary/10"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                fontSize: `${20 + Math.random() * 30}px`,
              }}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              ♥
            </motion.div>
          ))}
        </div>

        {/* Letter card */}
        <div className="bg-card rounded-[20px] p-8 sm:p-10 shadow-card border border-border/50 relative overflow-hidden">
          {/* Paper texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Corner flourishes */}
          <div className="absolute top-3 left-4 text-primary/20 text-xl">❦</div>
          <div className="absolute top-3 right-4 text-primary/20 text-xl rotate-180">❦</div>

          {/* Heart envelope header */}
          <motion.div
            className="w-20 h-20 mx-auto mb-4"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            <HeartEnvelope isOpen />
          </motion.div>

          {/* Date */}
          <motion.p
            className="font-body text-xs text-muted-foreground text-right mb-4 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            {today}
          </motion.p>

          {/* To field */}
          <motion.div
            className="mb-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="font-body text-sm text-muted-foreground italic">My Dearest,</span>
            <h2 className="font-display text-3xl sm:text-4xl text-foreground mt-1 text-gradient-romantic">
              {to}
            </h2>
          </motion.div>

          {/* Decorative divider */}
          <motion.div
            className="flex items-center gap-3 mb-5"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="h-px bg-border flex-1" />
            <Heart className="w-3 h-3 text-primary/50" fill="currentColor" />
            <div className="h-px bg-border flex-1" />
          </motion.div>

          {/* Message — justified like a real letter */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="font-body text-foreground leading-[1.9] whitespace-pre-wrap text-justify text-base">
              {message}
            </p>
          </motion.div>

          {/* Photos */}
          {photos && photos.length > 0 && (
            <motion.div
              className="flex gap-3 justify-center mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
            >
              {photos.map((photo, i) => (
                <motion.div
                  key={i}
                  className="relative"
                  initial={{ rotate: i === 0 ? -3 : 3 }}
                  animate={{ rotate: i === 0 ? -3 : 3 }}
                >
                  <img
                    src={photo}
                    alt={`Memory ${i + 1}`}
                    className="w-32 h-32 sm:w-36 sm:h-36 object-cover rounded-xl border-2 border-border shadow-card"
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Divider */}
          <motion.div
            className="flex items-center gap-3 mb-5"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="h-px bg-border flex-1" />
            <Heart className="w-3 h-3 text-primary/50" fill="currentColor" />
            <div className="h-px bg-border flex-1" />
          </motion.div>

          {/* From field — signature style */}
          <motion.div
            className="text-right"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
          >
            <span className="font-body text-sm text-muted-foreground italic">Forever yours,</span>
            <p className="font-display text-2xl sm:text-3xl text-foreground mt-1">
              {from}
            </p>
          </motion.div>

          {/* Bottom flourishes */}
          <div className="absolute bottom-3 left-4 text-primary/20 text-xl rotate-180">❦</div>
          <div className="absolute bottom-3 right-4 text-primary/20 text-xl">❦</div>
        </div>
      </div>

      {/* Footer note */}
      <motion.p
        className="text-center text-xs text-muted-foreground mt-6 font-body"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        This letter was sealed with love through HeartChain ♥
      </motion.p>
    </motion.div>
  );
};

export default RevealedLetter;
