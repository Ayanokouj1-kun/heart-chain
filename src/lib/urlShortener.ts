// URL shortener - currently returns original URL
// Note: External URL shorteners require a backend proxy due to CORS
// Enable Lovable Cloud for truly short database-backed links

export async function shortenUrl(longUrl: string): Promise<string> {
  // Return original URL - external shorteners don't support browser CORS
  // For short links, enable Lovable Cloud to store letters in a database
  return longUrl;
}
