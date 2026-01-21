import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Heart, Send } from "lucide-react";

interface LetterFormProps {
  onSubmit: (data: { to: string; from: string; message: string }) => void;
}

const LetterForm = ({ onSubmit }: LetterFormProps) => {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (to.trim() && from.trim() && message.trim()) {
      onSubmit({ to: to.trim(), from: from.trim(), message: message.trim() });
    }
  };

  const isValid = to.trim() && from.trim() && message.trim();

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full max-w-lg mx-auto space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-card rounded-2xl p-8 shadow-card border border-border/50">
        <motion.div
          className="flex items-center justify-center mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Heart className="w-6 h-6 text-primary" />
          </div>
        </motion.div>

        <h2 className="font-display text-2xl text-center text-foreground mb-6">
          Write Your Love Letter
        </h2>

        <div className="space-y-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Label htmlFor="to" className="text-sm font-medium text-foreground mb-2 block">
              To Whom
            </Label>
            <Input
              id="to"
              type="text"
              placeholder="My Dearest..."
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="bg-background border-border focus:border-primary focus:ring-primary/20 transition-all"
              maxLength={50}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Label htmlFor="from" className="text-sm font-medium text-foreground mb-2 block">
              From
            </Label>
            <Input
              id="from"
              type="text"
              placeholder="Your Secret Admirer"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="bg-background border-border focus:border-primary focus:ring-primary/20 transition-all"
              maxLength={50}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Label htmlFor="message" className="text-sm font-medium text-foreground mb-2 block">
              Your Message
            </Label>
            <Textarea
              id="message"
              placeholder="Pour your heart out..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-background border-border focus:border-primary focus:ring-primary/20 transition-all min-h-[150px] resize-none"
              maxLength={1000}
            />
            <p className="text-xs text-muted-foreground mt-1 text-right">
              {message.length}/1000
            </p>
          </motion.div>
        </div>

        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            type="submit"
            variant="romantic"
            size="lg"
            className="w-full"
            disabled={!isValid}
          >
            <Send className="w-4 h-4 mr-2" />
            Wrap as Gift
          </Button>
        </motion.div>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Your letter will be wrapped and a unique link will be generated
      </p>
    </motion.form>
  );
};

export default LetterForm;
