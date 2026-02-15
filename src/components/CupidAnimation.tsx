import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const CupidAnimation = () => {
    return (
        <div className="relative w-full h-[300px] flex items-center justify-center overflow-visible select-none pointer-events-none">
            {/* Cupid SVG */}
            <motion.div
                className="absolute left-[-25%] sm:left-[-15%] z-20"
                initial={{ opacity: 0, x: -50, scale: 0.8 }}
                animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    y: [0, -15, 15, 0]
                }}
                transition={{
                    opacity: { duration: 1 },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
            >
                <svg width="140" height="140" viewBox="0 0 200 200">
                    <defs>
                        <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#ffe4e1" />
                            <stop offset="100%" stopColor="#ffdad9" />
                        </linearGradient>
                        <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="100%" stopColor="#fff5f5" />
                        </linearGradient>
                    </defs>

                    {/* Wings */}
                    <motion.path
                        d="M80,80 C50,30 20,50 30,80 C40,110 80,100 80,80Z"
                        fill="url(#wingGradient)"
                        stroke="#ffc0cb"
                        strokeWidth="2"
                        animate={{ rotate: [-20, 0, -20], x: [0, -5, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        style={{ transformOrigin: "80px 80px" }}
                    />
                    <motion.path
                        d="M120,80 C150,30 180,50 170,80 C160,110 120,100 120,80Z"
                        fill="url(#wingGradient)"
                        stroke="#ffc0cb"
                        strokeWidth="2"
                        animate={{ rotate: [20, 0, 20], x: [0, 5, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        style={{ transformOrigin: "120px 80px" }}
                    />

                    {/* Body */}
                    <ellipse cx="100" cy="115" rx="35" ry="45" fill="url(#bodyGradient)" />

                    {/* Diaper/Cloth */}
                    <path d="M65,130 Q100,165 135,130 Q135,150 100,160 Q65,150 65,130" fill="white" />

                    {/* Head */}
                    <circle cx="100" cy="70" r="30" fill="url(#bodyGradient)" />

                    {/* Blonde Hair/Curls */}
                    <g fill="#ffd700">
                        <circle cx="85" cy="50" r="10" />
                        <circle cx="100" cy="45" r="12" />
                        <circle cx="115" cy="50" r="10" />
                        <circle cx="75" cy="65" r="8" />
                        <circle cx="125" cy="65" r="8" />
                    </g>

                    {/* Face */}
                    <circle cx="90" cy="70" r="2.5" fill="#333" />
                    <circle cx="110" cy="70" r="2.5" fill="#333" />
                    <path d="M92,82 Q100,90 108,82" fill="none" stroke="#ff69b4" strokeWidth="2" strokeLinecap="round" />

                    {/* Rosy Cheeks */}
                    <circle cx="80" cy="78" r="5" fill="#ffb6c1" opacity="0.4" />
                    <circle cx="120" cy="78" r="5" fill="#ffb6c1" opacity="0.4" />

                    {/* Bow & Arrow (ready position) */}
                    <path d="M130,50 Q165,100 130,150" fill="none" stroke="#daa520" strokeWidth="5" />
                    <line x1="130" y1="50" x2="130" y2="150" stroke="#fdf5e6" strokeWidth="1" />
                </svg>
            </motion.div>

            {/* The Arrow */}
            <motion.div
                className="absolute left-[0px] z-30"
                initial={{ opacity: 0, x: 0, y: 0, rotate: 0 }}
                animate={{
                    opacity: [0, 1, 1, 0],
                    x: [0, 150, 300, 450], // Journey across to hit the center
                    y: [0, -80, 40, 0],    // The "lil journey" curve
                    rotate: [0, -30, 30, 0],
                    scale: [0.8, 1.2, 1, 1],
                }}
                transition={{
                    duration: 5.5,
                    times: [0, 0.3, 0.8, 1],
                    delay: 1.0,
                    ease: "easeInOut",
                }}
            >
                <div className="relative">
                    {/* Arrow Head */}
                    <div className="absolute right-[-10px] top-[-5px] w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[10px] border-l-primary" />
                    {/* Arrow Body */}
                    <div className="w-12 h-1 bg-primary rounded-full shadow-glow" />
                    {/* Arrow Tail */}
                    <div className="absolute left-[-5px] top-[-5px]">
                        <Heart className="w-4 h-4 text-primary fill-current" />
                    </div>
                    {/* Sparkles trailing */}
                    <div className="absolute -left-4 top-0">
                        <motion.span
                            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                        >
                            ✨
                        </motion.span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default CupidAnimation;
