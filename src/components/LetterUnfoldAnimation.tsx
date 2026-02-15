import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Wand2 } from "lucide-react";

interface LetterUnfoldAnimationProps {
    onComplete: () => void;
}

const LetterUnfoldAnimation = ({ onComplete }: LetterUnfoldAnimationProps) => {
    return (
        <div className="relative w-full h-[450px] flex items-center justify-center overflow-visible select-none pointer-events-none">
            {/* Magical Aura */}
            <motion.div
                className="absolute inset-0 z-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 0.2, 0], scale: [0.5, 1.5, 2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
            >
                <div className="w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
            </motion.div>

            {/* Floating Magic Elements */}
            <AnimatePresence>
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-primary/40"
                        initial={{ opacity: 0, scale: 0, y: 0 }}
                        animate={{
                            opacity: [0, 1, 1, 0],
                            scale: [0.5, 1, 1, 0.5],
                            y: [-20, -180],
                            x: Math.sin(i) * 100,
                            rotate: i * 45
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: "easeOut"
                        }}
                        style={{ left: "50%", top: "60%" }}
                    >
                        {i % 2 === 0 ? <Heart className="w-4 h-4 fill-current" /> : <Sparkles className="w-3 h-3 text-yellow-500/50" />}
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Realistic Unfolding Letter Container */}
            <motion.div
                className="relative z-10 w-48 h-20 flex flex-col items-center justify-center"
                style={{ perspective: "1500px" }}
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                {/* The Base Layer (Middle section) */}
                <div className="absolute inset-0 bg-card border border-border/40 rounded shadow-lg overflow-hidden">
                    {/* Realistic Paper Texture */}
                    <div className="absolute inset-0 opacity-[0.06] brightness-95"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

                    {/* Hint of Handwriting */}
                    <div className="absolute inset-0 flex flex-col gap-2 p-4 opacity-10">
                        <div className="h-1 bg-foreground/30 w-3/4 rounded-full" />
                        <div className="h-1 bg-foreground/20 w-1/2 rounded-full" />
                    </div>
                </div>

                {/* Wax Seal - Breaking Animation */}
                <motion.div
                    className="absolute z-50 pointer-events-none"
                    animate={{
                        scale: [1, 1, 0],
                        opacity: [1, 1, 0],
                        y: [0, 0, 20]
                    }}
                    transition={{ duration: 7, times: [0, 0.1, 0.15] }}
                >
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg border border-primary-foreground/20">
                        <Heart className="w-6 h-6 text-white fill-current" />
                    </div>
                </motion.div>

                {/* Side Folds - Opening Outward First */}
                <motion.div
                    className="absolute inset-y-0 left-0 w-1/2 bg-card border-l border-border/30 rounded-l-sm origin-right z-40"
                    animate={{ rotateY: [0, 180, 180], x: [0, 0, 0] }}
                    transition={{ duration: 7, times: [0, 0.25, 1], ease: "easeInOut" }}
                    style={{ transformStyle: "preserve-3d" }}
                />
                <motion.div
                    className="absolute inset-y-0 right-0 w-1/2 bg-card border-r border-border/30 rounded-r-sm origin-left z-40"
                    animate={{ rotateY: [0, -180, -180], x: [0, 0, 0] }}
                    transition={{ duration: 7, times: [0, 0.25, 1], ease: "easeInOut" }}
                    style={{ transformStyle: "preserve-3d" }}
                />

                {/* Top Fold - Opening Upwards */}
                <motion.div
                    className="absolute top-0 left-0 right-0 h-full bg-card border-t border-border/30 rounded-t-sm origin-bottom z-30 shadow-sm"
                    animate={{ rotateX: [0, 0, 180, 180], y: [0, 0, 0, 0] }}
                    transition={{ duration: 7, times: [0, 0.25, 0.5, 1], ease: "easeInOut" }}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <div className="absolute inset-0 bg-card opacity-[0.05]"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
                </motion.div>

                {/* Bottom Fold - Opening Downwards */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-full bg-card border-b border-border/30 rounded-b-sm origin-top z-30 shadow-sm"
                    animate={{ rotateX: [0, 0, 0, -180], y: [0, 0, 0, 0] }}
                    transition={{ duration: 7, times: [0, 0.5, 0.75, 1], ease: "easeInOut" }}
                    onAnimationComplete={onComplete}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <div className="absolute inset-0 bg-card opacity-[0.05]"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
                </motion.div>
            </motion.div>

            {/* Floating Magic Wand - Visual Cue */}
            <motion.div
                className="absolute top-1/4 right-1/4 z-50 text-primary"
                animate={{
                    rotate: [0, 15, -15, 0],
                    y: [-10, 10, -10],
                    x: [0, 10, -10, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
            >
                <Wand2 className="w-6 h-6 drop-shadow-glow" />
            </motion.div>

            {/* Cute Status Text */}
            <motion.div
                className="absolute bottom-4 text-center z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 7, times: [0, 0.2, 0.8, 1] }}
            >
                <p className="font-typewriter text-base text-primary/80 animate-pulse italic">
                    Unfolding a world of love for you...
                </p>
            </motion.div>
        </div>
    );
};

export default LetterUnfoldAnimation;
