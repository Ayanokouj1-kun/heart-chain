import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Heart, Send, ImagePlus, X } from "lucide-react";
import { resizeImageToBase64 } from "@/lib/imageUtils";
import { toast } from "sonner";

interface LetterFormProps {
  onSubmit: (data: { to: string; from: string; message: string; photos?: string[] }) => void;
}

const LetterForm = ({ onSubmit }: LetterFormProps) => {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (to.trim() && from.trim() && message.trim()) {
      onSubmit({
        to: to.trim(),
        from: from.trim(),
        message: message.trim(),
        photos: photos.length > 0 ? photos : undefined,
      });
    }
  };

  const handlePhotoAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const remaining = 2 - photos.length;
    if (remaining <= 0) {
      toast.error("You can only add up to 2 photos");
      return;
    }

    const toProcess = Array.from(files).slice(0, remaining);
    try {
      const newPhotos = await Promise.all(
        toProcess.map((f) => resizeImageToBase64(f, 280, 280, 0.55))
      );
      setPhotos((prev) => [...prev, ...newPhotos].slice(0, 2));
    } catch {
      toast.error("Failed to process image");
    }

    if (fileRef.current) fileRef.current.value = "";
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const isValid = to.trim() && from.trim() && message.trim();

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full max-w-lg mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Letter-style card */}
      <div className="bg-card rounded-sm p-8 sm:p-10 shadow-card border-2 border-border relative overflow-hidden" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, hsl(30 30% 78% / 0.3) 31px, hsl(30 30% 78% / 0.3) 32px)' }}>
        {/* Aged paper texture */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Vintage edge stain */}
        <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 60px hsl(30 40% 60% / 0.2)' }} />

        {/* Corner ornaments */}
        <div className="absolute top-2 left-3 text-primary/30 text-lg">✦</div>
        <div className="absolute top-2 right-3 text-primary/30 text-lg">✦</div>

        {/* Date */}
        <motion.p
          className="font-body text-xs text-muted-foreground text-right mb-6 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {today}
        </motion.p>

        {/* To field — letter style */}
        <motion.div
          className="mb-5"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Label htmlFor="to" className="font-body text-base sm:text-lg text-foreground/70 mb-1.5 block italic">
            My Dearest,
          </Label>
          <Input
            id="to"
            type="text"
            placeholder="the one who holds my heart..."
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="bg-transparent border-0 border-b border-border rounded-none px-0 font-display text-3xl sm:text-4xl text-primary focus:text-primary placeholder:text-muted-foreground/40 placeholder:font-body placeholder:text-base focus-visible:ring-0 focus-visible:border-primary transition-colors"
            maxLength={50}
          />
        </motion.div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="h-px bg-border/60 flex-1" />
          <Heart className="w-3 h-3 text-primary/40" fill="currentColor" />
          <div className="h-px bg-border/60 flex-1" />
        </div>

        {/* Message — letter style */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Textarea
            id="message"
            placeholder="I have been wanting to tell you something for the longest time. Every moment with you feels like a dream I never want to wake from. Your smile lights up even my darkest days, and your laughter is the sweetest melody I have ever heard..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-transparent border-0 rounded-none px-0 font-body text-foreground text-base leading-relaxed placeholder:text-muted-foreground/35 placeholder:leading-relaxed focus-visible:ring-0 transition-colors min-h-[180px] resize-none text-justify"
            maxLength={1000}
          />
          <p className="text-xs text-muted-foreground/60 mt-1 text-right font-body">
            {message.length}/1000
          </p>
        </motion.div>

        {/* Photos section */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Label className="font-body text-xs text-muted-foreground mb-3 block italic">
            Attach memories (up to 2 photos)
          </Label>
          <div className="flex gap-3 items-start">
            {photos.map((photo, i) => (
              <div key={i} className="relative group">
                <img
                  src={photo}
                  alt={`Memory ${i + 1}`}
                  className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl border-2 border-border/60 shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(i)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            {photos.length < 2 && (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center gap-1.5 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                <ImagePlus className="w-5 h-5" />
                <span className="text-[10px] font-body">Add Photo</span>
              </button>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoAdd}
            className="hidden"
          />
        </motion.div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="h-px bg-border/60 flex-1" />
          <Heart className="w-3 h-3 text-primary/40" fill="currentColor" />
          <div className="h-px bg-border/60 flex-1" />
        </div>

        {/* From field — signature style */}
        <motion.div
          className="text-right mb-6"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Label htmlFor="from" className="font-body text-base sm:text-lg text-foreground/70 mb-1.5 block italic">
            Forever yours,
          </Label>
          <Input
            id="from"
            type="text"
            placeholder="your secret admirer"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="bg-transparent border-0 border-b border-border rounded-none px-0 font-display text-3xl sm:text-4xl text-primary focus:text-primary text-right placeholder:text-muted-foreground/40 placeholder:font-body placeholder:text-base focus-visible:ring-0 focus-visible:border-primary transition-colors"
            maxLength={50}
          />
        </motion.div>

        {/* Bottom ornaments */}
        <div className="absolute bottom-2 left-3 text-primary/30 text-lg">✦</div>
        <div className="absolute bottom-2 right-3 text-primary/30 text-lg">✦</div>
      </div>

      {/* Submit */}
      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <Button
          type="submit"
          variant="romantic"
          size="lg"
          className="w-full rounded-[20px]"
          disabled={!isValid}
        >
          <Send className="w-4 h-4 mr-2" />
          Seal & Send with Love
        </Button>
      </motion.div>

      <p className="text-center text-xs text-muted-foreground mt-4 font-body">
        Your letter will be sealed and a unique link will be created
      </p>
    </motion.form>
  );
};

export default LetterForm;
