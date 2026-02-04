// URL shortener using is.gd free API (no API key required)

export async function shortenUrl(longUrl: string): Promise<string> {
  try {
    const response = await fetch(
      `https://is.gd/create.php?format=simple&url=${encodeURIComponent(longUrl)}`
    );
    
    if (!response.ok) {
      throw new Error('Shortening failed');
    }
    
    const shortUrl = await response.text();
    return shortUrl.trim();
  } catch (error) {
    console.warn('URL shortening failed, using original:', error);
    // Fallback to original URL if shortening fails
    return longUrl;
  }
}
