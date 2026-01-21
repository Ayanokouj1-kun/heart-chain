import { motion } from "framer-motion";
import HeartEnvelope from "./HeartEnvelope";

interface RevealedLetterProps {
  to: string;
  from: string;
  message: string;
}

const RevealedLetter = ({ to, from, message }: RevealedLetterProps) => {
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
        <div className="bg-card rounded-3xl p-8 shadow-card border border-border/50 relative overflow-hidden">
          {/* Paper texture overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Heart envelope header */}
          <motion.div
            className="w-24 h-24 mx-auto mb-6"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            <HeartEnvelope isOpen />
          </motion.div>

          {/* To field */}
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-sm text-muted-foreground font-body">To</span>
            <h2 className="font-display text-3xl text-foreground mt-1 text-gradient-romantic">
              {to}
            </h2>
          </motion.div>

          {/* Decorative divider */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="h-px bg-border flex-1" />
            <span className="text-primary animate-heartbeat">♥</span>
            <div className="h-px bg-border flex-1" />
          </motion.div>

          {/* Message */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="font-body text-foreground leading-relaxed whitespace-pre-wrap text-center text-lg italic">
              "{message}"
            </p>
          </motion.div>

          {/* From field */}
          <motion.div
            className="text-right"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <span className="text-sm text-muted-foreground font-body">With love,</span>
            <p className="font-display text-2xl text-foreground mt-1">
              {from}
            </p>
          </motion.div>

          {/* Corner decorations */}
          <div className="absolute top-4 left-4 text-gold/30 text-2xl">❦</div>
          <div className="absolute bottom-4 right-4 text-gold/30 text-2xl rotate-180">❦</div>
        </div>
      </div>

      {/* Footer note */}
      <motion.p
        className="text-center text-sm text-muted-foreground mt-6"
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
