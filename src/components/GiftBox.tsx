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
            <stop offset="0%" stopColor="hsl(350, 70%, 50%)" />
            <stop offset="100%" stopColor="hsl(350, 65%, 40%)" />
          </linearGradient>
          <linearGradient id="lidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(350, 70%, 55%)" />
            <stop offset="100%" stopColor="hsl(350, 65%, 45%)" />
          </linearGradient>
          <linearGradient id="ribbonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(40, 75%, 55%)" />
            <stop offset="50%" stopColor="hsl(40, 70%, 65%)" />
            <stop offset="100%" stopColor="hsl(40, 75%, 55%)" />
          </linearGradient>
          <filter id="boxShadow" x="-20%" y="-10%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="hsl(350, 50%, 30%)" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Box body */}
        <rect
          x="25"
          y="80"
          width="150"
          height="120"
          rx="8"
          fill="url(#boxGradient)"
          filter="url(#boxShadow)"
        />

        {/* Box lid */}
        <motion.g
          animate={isUnwrapping ? { y: -30, rotate: -20, opacity: 0 } : { y: 0, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <rect
            x="15"
            y="60"
            width="170"
            height="30"
            rx="6"
            fill="url(#lidGradient)"
          />
        </motion.g>

        {/* Vertical ribbon */}
        <rect
          x="90"
          y="60"
          width="20"
          height="140"
          fill="url(#ribbonGradient)"
        />

        {/* Horizontal ribbon */}
        <rect
          x="25"
          y="130"
          width="150"
          height="20"
          fill="url(#ribbonGradient)"
        />

        {/* Bow - Left loop */}
        <motion.ellipse
          cx="75"
          cy="50"
          rx="25"
          ry="18"
          fill="url(#ribbonGradient)"
          className="animate-ribbon"
          style={{ transformOrigin: "100px 50px" }}
        />

        {/* Bow - Right loop */}
        <motion.ellipse
          cx="125"
          cy="50"
          rx="25"
          ry="18"
          fill="url(#ribbonGradient)"
          className="animate-ribbon"
          style={{ transformOrigin: "100px 50px", animationDelay: "0.5s" }}
        />

        {/* Bow - Center knot */}
        <circle
          cx="100"
          cy="50"
          r="12"
          fill="hsl(40, 70%, 45%)"
        />

        {/* Bow - Ribbon tails */}
        <path
          d="M95 62 Q85 85 75 100 Q80 90 88 65"
          fill="url(#ribbonGradient)"
        />
        <path
          d="M105 62 Q115 85 125 100 Q120 90 112 65"
          fill="url(#ribbonGradient)"
        />

        {/* Decorative pattern on box */}
        <g opacity="0.1">
          {[...Array(5)].map((_, i) => (
            <circle
              key={i}
              cx={40 + i * 30}
              cy={170}
              r="8"
              fill="white"
            />
          ))}
        </g>
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
