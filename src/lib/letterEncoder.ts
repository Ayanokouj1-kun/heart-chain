// Simple encoding/decoding for letter data in URL
// Note: For production with "unwrap once" feature, use a database

export interface LetterData {
  to: string;
  from: string;
  message: string;
  unwrapped?: boolean;
}

export function encodeLetter(data: LetterData): string {
  const json = JSON.stringify(data);
  // Use base64 encoding (URL-safe)
  const encoded = btoa(encodeURIComponent(json));
  return encoded;
}

export function decodeLetter(encoded: string): LetterData | null {
  try {
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
