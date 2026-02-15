// Compressed encoding/decoding for letter data in URL
// Uses LZString for ~50% shorter URLs
import LZString from 'lz-string';

export interface LetterData {
  to: string;
  from: string;
  message: string;
  photos?: string[];
  unwrapped?: boolean;
}

export function encodeLetter(data: LetterData): string {
  // Use short keys to minimize URL length
  const compact: Record<string, unknown> = {
    t: data.to,
    f: data.from,
    m: data.message,
  };
  if (data.photos && data.photos.length > 0) compact.p = data.photos;
  if (data.unwrapped) compact.u = 1;
  const json = JSON.stringify(compact);
  const compressed = LZString.compressToEncodedURIComponent(json);
  return compressed;
}

export function decodeLetter(encoded: string): LetterData | null {
  try {
    const decompressed = LZString.decompressFromEncodedURIComponent(encoded);
    if (decompressed) {
      const parsed = JSON.parse(decompressed);
      // Support both compact and legacy format
      if (parsed.t !== undefined) {
        return {
          to: parsed.t,
          from: parsed.f,
          message: parsed.m,
          photos: parsed.p,
          unwrapped: !!parsed.u,
        };
      }
      return parsed as LetterData;
    }
    // Fallback to old base64 format
    const json = decodeURIComponent(atob(encoded));
    return JSON.parse(json) as LetterData;
  } catch {
    return null;
  }
}

export function generateShareLink(data: LetterData): string {
  const encoded = encodeLetter(data);
  const baseUrl = window.location.origin;
  return `${baseUrl}/g/${encoded}`;
}
