import "server-only";
import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * URL of a demo video stored in /public/videos, or null when the file isn't there yet.
 * Checked when pages are built, so a missing video hides its "Watch demo" button instead of breaking.
 */
export function videoUrl(file: string): string | null {
  return existsSync(join(process.cwd(), "public", "videos", file)) ? `/videos/${encodeURIComponent(file)}` : null;
}
