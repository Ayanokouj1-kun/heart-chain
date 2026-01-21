import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ConfettiPiece {
  id: number;
  x: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
  rotation: number;
}

interface ConfettiProps {
  isActive: boolean;
}

const colors = [
  "hsl(350, 70%, 50%)", // Rose
  "hsl(350, 60%, 65%)", // Light rose
  "hsl(40, 70%, 55%)",  // Gold
  "hsl(40, 60%, 70%)",  // Light gold
  "hsl(350, 50%, 80%)", // Blush
  "hsl(30, 40%, 95%)",  // Cream
];

const Confetti = ({ isActive }: ConfettiProps) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (isActive) {
      const newPieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 8 + Math.random() * 8,
        rotation: Math.random() * 360,
      }));
      setPieces(newPieces);

      // Clear after animation
      const timer = setTimeout(() => setPieces([]), 4000);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  if (!isActive || pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          }}
          initial={{
            y: -20,
            rotate: piece.rotation,
            opacity: 1,
          }}
          animate={{
            y: "100vh",
            rotate: piece.rotation + 720,
            opacity: 0,
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
