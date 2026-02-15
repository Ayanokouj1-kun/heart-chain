import { motion } from "framer-motion";
import { Play, Pause, Music } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MusicToggleProps {
  isPlaying: boolean;
  isLoading: boolean;
  onToggle: () => void;
}

const MusicToggle = ({ isPlaying, isLoading, onToggle }: MusicToggleProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative hover:bg-primary/10 rounded-full w-10 h-10"
      onClick={onToggle}
      disabled={isLoading}
      title={isPlaying ? "Pause Music" : "Play Music"}
    >
      <motion.div
        animate={isPlaying ? { scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center justify-center"
      >
        {isPlaying ? (
          <Pause className="h-5 w-5 text-primary" fill="currentColor" />
        ) : (
          <Play className="h-5 w-5 text-muted-foreground" fill="currentColor" />
        )}
      </motion.div>

      {isPlaying && (
        <motion.div
          className="absolute -top-1 -right-1"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0], y: [-5, -15, -20], x: [0, 5, 10] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Music className="w-3 h-3 text-primary/60" />
        </motion.div>
      )}
    </Button>
  );
};

export default MusicToggle;
