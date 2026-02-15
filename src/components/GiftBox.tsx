import { motion } from "framer-motion";

interface GiftBoxProps {
  isUnwrapping?: boolean;
  onUnwrap?: () => void;
  className?: string;
}

const GiftBox = ({ isUnwrapping = false, onUnwrap, className = "" }: GiftBoxProps) => {
  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      onClick={onUnwrap}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.svg
        viewBox="0 0 200 220"
        className="w-full h-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{
          scale: isUnwrapping ? 0 : 1,
          opacity: isUnwrapping ? 0 : 1,
          rotate: isUnwrapping ? -15 : 0
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="boxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(350, 100%, 88%)" /> {/* Rose 200 */}
            <stop offset="100%" stopColor="hsl(350, 100%, 80%)" /> {/* Rose 300 */}
          </linearGradient>
          <linearGradient id="lidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(350, 100%, 92%)" /> {/* Rose 100 */}
            <stop offset="100%" stopColor="hsl(350, 100%, 85%)" /> {/* Rose 200 */}
          </linearGradient>
          <linearGradient id="ribbonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(330, 100%, 90%)" /> {/* Pink 100 */}
            <stop offset="50%" stopColor="hsl(330, 100%, 80%)" /> {/* Pink 300 */}
            <stop offset="100%" stopColor="hsl(330, 100%, 70%)" /> {/* Pink 400 */}
          </linearGradient>
          <filter id="boxShadow" x="-20%" y="-10%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="hsl(350, 50%, 60%)" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Box body */}
        <motion.rect
          x="40"
          y="80"
          width="120"
          height="100"
          rx="12"
          fill="url(#boxGradient)"
          filter="url(#boxShadow)"
          whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
          transition={{ duration: 0.3 }}
        />

        {/* Box lid */}
        <motion.g
          animate={isUnwrapping ? { y: -50, rotate: -20, opacity: 0 } : { y: 0, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <rect
            x="30"
            y="60"
            width="140"
            height="30"
            rx="8"
            fill="url(#lidGradient)"
            stroke="white"
            strokeWidth="2"
            strokeOpacity="0.5"
          />
        </motion.g>

        {/* Vertical ribbon */}
        <rect
          x="90"
          y="60"
          width="20"
          height="120"
          fill="url(#ribbonGradient)"
        />

        {/* Bow */}
        <motion.g
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx="100" cy="60" r="16" fill="hsl(330, 90%, 80%)" stroke="white" strokeWidth="2" />
          <path d="M85 60 Q70 40 85 30 Q100 40 90 60" fill="hsl(330, 80%, 85%)" stroke="white" strokeWidth="1" />
          <path d="M115 60 Q130 40 115 30 Q100 40 110 60" fill="hsl(330, 80%, 85%)" stroke="white" strokeWidth="1" />
        </motion.g>

        {/* Floating Hearts Cue */}
        {!isUnwrapping && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <motion.path d="M160 50 L165 45 L170 50 L165 55 Z" fill="pink"
              animate={{ y: -20, opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity }} />
            <motion.path d="M30 50 L35 45 L40 50 L35 55 Z" fill="pink"
              animate={{ y: -30, opacity: [0, 1, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} />
          </motion.g>
        )}
      </motion.svg>

      {/* Click hint */}
      {!isUnwrapping && (
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.span
            className="text-muted-foreground text-sm font-body"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Click to unwrap
          </motion.span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default GiftBox;
