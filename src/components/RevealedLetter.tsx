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
        <div className="bg-card rounded-sm p-8 sm:p-10 shadow-card border-2 border-border relative overflow-hidden">
          {/* Aged paper texture */}
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
          {/* Vintage edge stain */}
          <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 60px hsl(30 40% 60% / 0.2)' }} />

          {/* Corner ornaments */}
          <div className="absolute top-2 left-3 text-primary/30 text-lg">✦</div>
          <div className="absolute top-2 right-3 text-primary/30 text-lg">✦</div>

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
            className="font-typewriter text-[10px] text-muted-foreground text-right mb-4 opacity-70"
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
            <span className="font-typewriter text-xs text-muted-foreground uppercase tracking-widest">My Dearest,</span>
            <h2 className="font-typewriter text-2xl sm:text-3xl text-foreground mt-1">
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
            <p className="font-typewriter text-foreground leading-[1.7] whitespace-pre-wrap text-justify text-sm sm:text-base">
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
                    className="max-w-[180px] max-h-[180px] w-auto h-auto rounded-sm border border-border/40 shadow-md"
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
            <span className="font-typewriter text-xs text-muted-foreground uppercase tracking-widest">Forever yours,</span>
            <p className="font-typewriter text-xl sm:text-2xl text-foreground mt-1">
              {from}
            </p>
          </motion.div>

          {/* Bottom ornaments */}
          <div className="absolute bottom-2 left-3 text-primary/30 text-lg">✦</div>
          <div className="absolute bottom-2 right-3 text-primary/30 text-lg">✦</div>
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
