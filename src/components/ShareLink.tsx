import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Copy, Heart, Link2 } from "lucide-react";
import { toast } from "sonner";
import HeartEnvelope from "./HeartEnvelope";

interface ShareLinkProps {
  link: string;
  onCreateAnother: () => void;
}

const ShareLink = ({ link, onCreateAnother }: ShareLinkProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      toast.success("Link copied to clipboard!", {
        icon: "💝",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <motion.div
      className="w-full max-w-lg mx-auto text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-card rounded-2xl p-8 shadow-card border border-border/50">
        {/* Success animation */}
        <motion.div
          className="w-32 h-32 mx-auto mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
        >
          <HeartEnvelope />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-display text-3xl text-foreground mb-2">
            Your Gift is Ready!
          </h2>
          <p className="text-muted-foreground font-body mb-6">
            Share this magical link with your special someone
          </p>
        </motion.div>

        <motion.div
          className="flex gap-2 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Input
            value={link}
            readOnly
            className="bg-background text-sm"
          />
          <Button
            onClick={handleCopy}
            variant={copied ? "default" : "outline"}
            size="icon"
            className="shrink-0"
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </motion.div>

        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={handleCopy}
            variant="romantic"
            size="lg"
            className="w-full"
          >
            <Link2 className="w-4 h-4 mr-2" />
            {copied ? "Copied!" : "Copy Link"}
          </Button>

          <Button
            onClick={onCreateAnother}
            variant="ghost"
            className="w-full"
          >
            <Heart className="w-4 h-4 mr-2" />
            Create Another Letter
          </Button>
        </motion.div>
      </div>

      <motion.p
        className="text-sm text-muted-foreground mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        The recipient can only unwrap this gift once ✨
      </motion.p>
    </motion.div>
  );
};

export default ShareLink;
