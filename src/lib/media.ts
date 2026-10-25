const BUCKET = "media";

/** Public URL of a file in the Supabase Storage "media" bucket, or null when Supabase isn't configured. */
export function mediaUrl(file: string): string | null {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return null;
  return `${base.replace(/\/$/, "")}/storage/v1/object/public/${BUCKET}/${encodeURIComponent(file)}`;
}
