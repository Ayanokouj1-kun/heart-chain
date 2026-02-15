import { supabase } from "@/integrations/supabase/client";

export async function shortenUrl(longUrl: string): Promise<string> {
  try {
    const { data, error } = await supabase.functions.invoke('shorten-url', {
      body: { url: longUrl },
    });

    if (error) {
      console.error('Shorten URL error:', error);
      return longUrl;
    }

    return data?.short_url || longUrl;
  } catch {
    return longUrl;
  }
}
