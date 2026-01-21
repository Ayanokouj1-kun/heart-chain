import { motion } from "framer-motion";

interface HeartEnvelopeProps {
  isOpen?: boolean;
  className?: string;
}

const HeartEnvelope = ({ isOpen = false, className = "" }: HeartEnvelopeProps) => {
  return (
    <motion.svg
      viewBox="0 0 200 180"
      className={`w-full h-full ${className}`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Heart shape */}
      <defs>
        <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(350, 70%, 45%)" />
          <stop offset="50%" stopColor="hsl(350, 60%, 55%)" />
          <stop offset="100%" stopColor="hsl(350, 50%, 65%)" />
        </linearGradient>
        <linearGradient id="sealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(40, 70%, 50%)" />
          <stop offset="100%" stopColor="hsl(40, 60%, 40%)" />
        </linearGradient>
        <filter id="heartShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="hsl(350, 70%, 45%)" floodOpacity="0.3" />
        </filter>
        <filter id="sealShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="hsl(40, 60%, 30%)" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Main heart body */}
      <motion.path
        d="M100 170 
           C40 130 10 90 10 60 
           C10 30 35 10 65 10 
           C85 10 100 25 100 40 
           C100 25 115 10 135 10 
           C165 10 190 30 190 60 
           C190 90 160 130 100 170Z"
        fill="url(#heartGradient)"
        filter="url(#heartShadow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />

      {/* Envelope flap (top) */}
      <motion.path
        d="M30 55 L100 100 L170 55"
        fill="none"
        stroke="hsl(350, 40%, 35%)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity={0.3}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isOpen ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      />

      {/* Wax seal */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.4, delay: 0.8 }}
      >
        <circle
          cx="100"
          cy="95"
          r="18"
          fill="url(#sealGradient)"
          filter="url(#sealShadow)"
        />
        {/* Heart on seal */}
        <path
          d="M100 105 C95 100 88 95 88 90 C88 86 91 84 95 84 C98 84 100 86 100 88 C100 86 102 84 105 84 C109 84 112 86 112 90 C112 95 105 100 100 105Z"
          fill="hsl(350, 70%, 35%)"
        />
      </motion.g>

      {/* Decorative lines on heart */}
      <motion.path
        d="M60 70 Q80 85 100 75 Q120 65 140 80"
        fill="none"
        stroke="hsl(350, 40%, 55%)"
        strokeWidth="1"
        opacity={0.2}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
    </motion.svg>
  );
};

export default HeartEnvelope;
