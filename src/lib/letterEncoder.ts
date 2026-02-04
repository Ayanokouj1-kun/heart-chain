// Compressed encoding/decoding for letter data in URL
// Uses LZString for ~50% shorter URLs
import LZString from 'lz-string';

export interface LetterData {
  to: string;
  from: string;
  message: string;
  unwrapped?: boolean;
}

export function encodeLetter(data: LetterData): string {
  const json = JSON.stringify(data);
  // Use LZString's URI-safe compression
  const compressed = LZString.compressToEncodedURIComponent(json);
  return compressed;
}

export function decodeLetter(encoded: string): LetterData | null {
  try {
    // Try new compressed format first
    const decompressed = LZString.decompressFromEncodedURIComponent(encoded);
    if (decompressed) {
      return JSON.parse(decompressed) as LetterData;
    }
    // Fallback to old base64 format for existing links
    const json = decodeURIComponent(atob(encoded));
    return JSON.parse(json) as LetterData;
  } catch {
    return null;
  }
}

export function generateShareLink(data: LetterData): string {
  const encoded = encodeLetter(data);
  const baseUrl = window.location.origin;
  return `${baseUrl}/gift/${encoded}`;
}
