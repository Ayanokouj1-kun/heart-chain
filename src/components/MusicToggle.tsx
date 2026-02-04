import { motion } from "framer-motion";
import { Music, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            disabled={isLoading}
          >
            <motion.div
              animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {isPlaying ? (
                <Volume2 className="h-5 w-5 text-primary" />
              ) : (
                <VolumeX className="h-5 w-5 text-muted-foreground" />
              )}
            </motion.div>
            {isPlaying && (
              <motion.div
                className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48" align="end">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Music</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : isPlaying ? "Pause" : "Play"}
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <Music className="h-4 w-4 text-muted-foreground" />
              <Slider
                value={[volume * 100]}
                onValueChange={([v]) => onVolumeChange(v / 100)}
                max={100}
                step={1}
                className="flex-1"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MusicToggle;
