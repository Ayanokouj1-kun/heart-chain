import { useRef, useState, useCallback, useEffect } from "react";

// Local HeartChain OST
const ROMANTIC_MUSIC_URL = "/heartchainOST.mp3";

// Create a simple unwrap sound using Web Audio API
const createUnwrapSound = (audioContext: AudioContext) => {
  const duration = 0.8;
  const sampleRate = audioContext.sampleRate;
  const length = duration * sampleRate;
  const buffer = audioContext.createBuffer(2, length, sampleRate);

  for (let channel = 0; channel < 2; channel++) {
    const data = buffer.getChannelData(channel);
    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      // Paper crinkle: white noise with envelope and filtering simulation
      const noise = Math.random() * 2 - 1;
      // Envelope: quick attack, medium decay
      const envelope = Math.exp(-t * 4) * Math.sin(t * Math.PI / duration);
      // Add some low-frequency modulation for "rustling" feel
      const modulation = 1 + 0.3 * Math.sin(t * 30);
      data[i] = noise * envelope * modulation * 0.15;
    }
  }

  return buffer;
};

export const useUnwrapSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const bufferRef = useRef<AudioBuffer | null>(null);

  const play = useCallback(() => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }

      const ctx = audioContextRef.current;

      if (!bufferRef.current) {
        bufferRef.current = createUnwrapSound(ctx);
      }

      const source = ctx.createBufferSource();
      source.buffer = bufferRef.current;

      // Add filter for more realistic paper sound
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 2000;
      filter.Q.value = 0.5;

      source.connect(filter);
      filter.connect(ctx.destination);
      source.start();
    } catch (error) {
      console.log("Audio playback failed:", error);
    }
  }, []);

  return { play };
};

export const useBackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element on mount
    const audio = new Audio(ROMANTIC_MUSIC_URL);
    audio.loop = true;
    audio.volume = volume;
    audio.preload = "metadata";
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || isPlaying) return;

    try {
      setIsLoading(true);
      await audio.play();
      setIsPlaying(true);
      setIsLoading(false);
    } catch (error) {
      console.log("Music playback failed:", error);
      setIsLoading(false);
    }
  }, [isPlaying]);

  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      await play();
    }
  }, [isPlaying, play]);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    }
  }, []);

  return { isPlaying, isLoading, volume, setVolume, toggle, play, stop };
};
