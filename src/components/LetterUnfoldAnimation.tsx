import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Star } from "lucide-react";
import { useState, useEffect } from "react";

interface LetterUnfoldAnimationProps {
    onComplete: () => void;
}

const LetterUnfoldAnimation = ({ onComplete }: LetterUnfoldAnimationProps) => {
    const [phase, setPhase] = useState<"peek" | "open" | "reveal">("peek");

    useEffect(() => {
        const timers = [
            setTimeout(() => setPhase("open"), 2000), // Peek for 2s
            setTimeout(() => setPhase("reveal"), 4500), // Fully open at 4.5s
            setTimeout(() => onComplete(), 7000),     // Complete at 7s
        ];
        return () => timers.forEach(clearTimeout);
    }, [onComplete]);

    return (
        <div className="relative w-full h-[500px] flex items-center justify-center overflow-visible select-none pointer-events-none perspective-1000">

            {/* Background Glow */}
            <motion.div
                className="absolute inset-0 z-0 flex items-center justify-center opacity-50"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
            >
                <div className="w-80 h-80 bg-rose-100/30 rounded-full blur-3xl" />
            </motion.div>

            {/* Floating Elements (Sparkles/Hearts) */}
            <AnimatePresence>
                {phase !== "peek" && [...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute z-10"
                        initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0.5, 1.5, 0],
                            y: -100 - Math.random() * 100,
                            x: (Math.random() - 0.5) * 150,
                            rotate: Math.random() * 360,
                        }}
                        transition={{ duration: 3, delay: i * 0.2, ease: "easeOut" }}
                        style={{ top: "60%", left: "50%" }}
                    >
                        {i % 3 === 0 ? (
                            <Heart className="w-5 h-5 text-rose-400 fill-current" />
                        ) : i % 3 === 1 ? (
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        ) : (
                            <Sparkles className="w-4 h-4 text-amber-300" />
                        )}
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Envelope Container */}
            <div className="relative z-20 w-72 h-48 flex items-end justify-center transform-style-3d">

                {/* Envelope Back */}
                <div className="absolute inset-0 bg-rose-100 rounded-lg shadow-2xl border border-rose-200" />

                {/* The Letter Inside (Sliding Up) */}
                <motion.div
                    className="absolute w-64 h-[350px] bg-white rounded shadow-lg overflow-hidden origin-bottom"
                    initial={{ y: 20, scale: 0.95, opacity: 0 }}
                    animate={{
                        y: phase === "peek" ? -40 : phase === "open" ? -100 : -200, // Peek vs Full slide
                        scale: phase === "reveal" ? 1 : 0.95,
                        opacity: 1,
                        rotateX: phase === "reveal" ? 0 : 5 // Slight tilt inside
                    }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                >
                    {/* Letter Content Simulation */}
                    <div className="p-6 space-y-4 opacity-50">
                        <div className="h-4 bg-gray-100 rounded w-1/3" />
                        <div className="h-4 bg-gray-100 rounded w-full" />
                        <div className="h-4 bg-gray-100 rounded w-5/6" />
                        <div className="h-4 bg-gray-100 rounded w-full" />
                        <div className="h-20 bg-gray-50 rounded w-full mt-4 border border-dashed border-gray-200" /> {/* Photo placeholder */}
                    </div>
                    {/* Shiny overlay for magical feel */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-50" />
                </motion.div>

                {/* Envelope Front (Pocket) */}
                <div className="absolute bottom-0 w-full h-3/4 bg-rose-200 rounded-b-lg overflow-hidden z-30 shadow-md">
                    <div className="absolute inset-0 bg-gradient-to-t from-rose-300/20 to-transparent" />
                    {/* Fold shadow */}
                    <div className="absolute top-0 w-full h-4 bg-gradient-to-b from-black/5 to-transparent" />
                </div>

                {/* Envelope Triangle Flap (Opening) */}
                <motion.div
                    className="absolute z-40 top-0 w-full h-1/2 bg-rose-300 origin-top rounded-t-lg shadow-md flex items-center justify-center p-0"
                    style={{ clipPath: "polygon(0 0, 50% 100%, 100% 0)" }} // Triangle shape
                    initial={{ rotateX: 0 }}
                    animate={{
                        rotateX: phase === "peek" ? -30 : -180, // Peek slightly open, then fully open
                        zIndex: phase === "peek" ? 40 : 10 // Move behind when fully open
                    }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                    {/* Wax Seal on the tip */}
                    <motion.div
                        className="mt-8"
                        animate={{ opacity: phase === "peek" ? 1 : 0 }}
                    >
                        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/20">
                            <Heart className="w-6 h-6 text-white fill-current" />
                        </div>
                    </motion.div>
                </motion.div>

                {/* Front Left/Right Flaps (Visual Detail) */}
                <div className="absolute bottom-0 left-0 w-1/2 h-3/4 bg-rose-200 z-30 origin-bottom-left skew-y-12 shadow-inner opacity-80 rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-1/2 h-3/4 bg-rose-200 z-30 origin-bottom-right -skew-y-12 shadow-inner opacity-80 rounded-br-lg" />

            </div>

            {/* Cute Status Text */}
            <motion.p
                className="absolute bottom-10 font-handwriting text-xl text-rose-500/80"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                {phase === "peek" ? "Wait for it..." : "Here comes the love! ♥"}
            </motion.p>

        </div>
    );
};

export default LetterUnfoldAnimation;
