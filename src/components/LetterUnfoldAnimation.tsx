import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

interface LetterUnfoldAnimationProps {
    onComplete: () => void;
}

const LetterUnfoldAnimation = ({ onComplete }: LetterUnfoldAnimationProps) => {
    return (
        <div className="relative w-full h-[400px] flex items-center justify-center overflow-visible">
            {/* Floating hearts around */}
            <AnimatePresence>
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0, 1, 1, 0],
                            scale: [0, 1, 1, 0],
                            x: [0, (i % 2 === 0 ? 50 : -50) * Math.random()],
                            y: [0, -100 - Math.random() * 50],
                        }}
                        transition={{
                            duration: 2,
                            delay: 3 + i * 0.2,
                            ease: "easeOut",
                        }}
                        style={{
                            left: `${20 + i * 10}%`,
                            top: "50%",
                        }}
                    >
                        <Heart className="w-4 h-4 text-primary fill-current" />
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Sparkles */}
            <AnimatePresence>
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={`sparkle-${i}`}
                        className="absolute text-yellow-400"
                        initial={{ opacity: 0, scale: 0, rotate: 0 }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0],
                            rotate: [0, 180, 360],
                        }}
                        transition={{
                            duration: 1.5,
                            delay: 4 + i * 0.15,
                            ease: "easeOut",
                        }}
                        style={{
                            left: `${15 + i * 7}%`,
                            top: `${30 + (i % 3) * 20}%`,
                        }}
                    >
                        <Sparkles className="w-3 h-3" />
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* The folded letter envelope */}
            <motion.div
                className="relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Envelope back */}
                <motion.div
                    className="absolute inset-0 w-64 h-40 bg-gradient-to-br from-rose-100 to-rose-200 rounded-lg shadow-lg"
                    initial={{ rotateX: 0 }}
                    animate={{ rotateX: [0, 0, 0, -180] }}
                    transition={{ duration: 7, times: [0, 0.3, 0.5, 1] }}
                    style={{ transformStyle: "preserve-3d", transformOrigin: "center bottom" }}
                />

                {/* Envelope flap */}
                <motion.div
                    className="absolute top-0 left-0 w-64 h-40"
                    initial={{ rotateX: 0 }}
                    animate={{ rotateX: [0, 0, 0, -180] }}
                    transition={{ duration: 7, times: [0, 0.3, 0.5, 1] }}
                    style={{ transformStyle: "preserve-3d", transformOrigin: "center top" }}
                >
                    <div className="w-full h-full bg-gradient-to-br from-rose-200 to-rose-300 rounded-t-lg shadow-md relative overflow-hidden">
                        {/* Heart seal */}
                        <motion.div
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            initial={{ scale: 1 }}
                            animate={{ scale: [1, 1, 1, 0] }}
                            transition={{ duration: 7, times: [0, 0.4, 0.45, 0.5] }}
                        >
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
                                <Heart className="w-6 h-6 text-white fill-current" />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Letter paper sliding out */}
                <motion.div
                    className="absolute top-0 left-0 w-64 h-80 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg shadow-xl border-2 border-amber-200"
                    initial={{ y: 0, scale: 0.9, opacity: 0 }}
                    animate={{
                        y: [0, 0, 0, -100],
                        scale: [0.9, 0.9, 1, 1.1],
                        opacity: [0, 1, 1, 1],
                    }}
                    transition={{ duration: 7, times: [0, 0.5, 0.7, 1] }}
                    onAnimationComplete={onComplete}
                >
                    {/* Vintage paper texture */}
                    <div
                        className="absolute inset-0 opacity-[0.08] pointer-events-none rounded-lg"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                        }}
                    />

                    {/* Decorative elements on paper */}
                    <div className="absolute top-4 left-4 text-primary/20 text-2xl">✦</div>
                    <div className="absolute top-4 right-4 text-primary/20 text-2xl">✦</div>
                    <div className="absolute bottom-4 left-4 text-primary/20 text-2xl">✦</div>
                    <div className="absolute bottom-4 right-4 text-primary/20 text-2xl">✦</div>

                    {/* Heart in center */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        initial={{ scale: 0, rotate: 0 }}
                        animate={{ scale: [0, 0, 1.2, 1], rotate: [0, 0, 360, 360] }}
                        transition={{ duration: 7, times: [0, 0.6, 0.85, 1] }}
                    >
                        <Heart className="w-16 h-16 text-primary/30 fill-current" />
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Cute message */}
            <motion.div
                className="absolute bottom-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: [0, 0, 1], y: [20, 20, 0] }}
                transition={{ duration: 7, times: [0, 0.7, 1] }}
            >
                <p className="font-typewriter text-sm text-muted-foreground">
                    Opening your letter with love...
                </p>
            </motion.div>
        </div>
    );
};

export default LetterUnfoldAnimation;
