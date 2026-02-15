import { supabase } from "@/integrations/supabase/client";

export async function shortenUrl(longUrl: string): Promise<string> {
  try {
    // Add a client-side timeout of 10 seconds to ensure the UI never hangs
    const timeoutPromise = new Promise<null>((_, reject) =>
      setTimeout(() => reject(new Error('Shortening timeout')), 10000)
    );

    const shorteningPromise = supabase.functions.invoke('shorten-url', {
      body: { url: longUrl },
    });

    const result = await Promise.race([shorteningPromise, timeoutPromise]);

    if (!result || result instanceof Error) return longUrl;

    const { data, error } = result;

    if (error) {
      console.error('Shorten URL error:', error);
      return longUrl;
    }

    return data?.short_url || longUrl;
  } catch (err) {
    console.warn('Shortening failed or timed out:', err);
    return longUrl;
  }
}
