import { motion, AnimatePresence } from "framer-motion";
import { Music, Volume2, VolumeX, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface MusicToggleProps {
  isPlaying: boolean;
  isLoading: boolean;
  volume: number;
  onToggle: () => void;
  onVolumeChange: (volume: number) => void;
}

const MusicToggle = ({
  isPlaying,
  isLoading,
  volume,
  onToggle,
  onVolumeChange,
}: MusicToggleProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="flex items-center bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-lg border border-pink-100"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ width: 48 }}
      animate={{ width: isHovered ? 180 : 48 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <Button
        variant="ghost"
        size="icon"
        className="relative rounded-full hover:bg-pink-50 w-10 h-10 shrink-0"
        onClick={onToggle}
        disabled={isLoading}
      >
        <motion.div
          animate={isPlaying ? {
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5 text-pink-500 fill-current" />
          ) : (
            <Play className="h-5 w-5 text-pink-400 fill-current ml-0.5" />
          )}
        </motion.div>

        {/* Floating notes animation when playing */}
        <AnimatePresence>
          {isPlaying && (
            <>
              <motion.div
                className="absolute -top-1 -right-1 text-pink-400"
                initial={{ opacity: 0, y: 0, x: 0 }}
                animate={{ opacity: [0, 1, 0], y: -15, x: 5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
              >
                <Music className="w-3 h-3" />
              </motion.div>
              <motion.div
                className="absolute -top-2 -left-1 text-pink-300"
                initial={{ opacity: 0, y: 0, x: 0 }}
                animate={{ opacity: [0, 1, 0], y: -10, x: -5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              >
                <Music className="w-2 h-2" />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </Button>

      {/* Volume Slider (Revealed on hover) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="flex items-center gap-2 px-2 flex-1 overflow-hidden"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Volume2 className="w-4 h-4 text-pink-400 shrink-0" />
            <Slider
              value={[volume * 100]}
              onValueChange={([v]) => onVolumeChange(v / 100)}
              max={100}
              step={1}
              className="w-24 bg-pink-200"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MusicToggle;
