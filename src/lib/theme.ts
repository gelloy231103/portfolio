/** Theme store. Backed by <html data-theme> and the OS preference. */
export type Theme = "light" | "dark";

export function getTheme(): Theme {
  const explicit = document.documentElement.getAttribute("data-theme");
  if (explicit === "light" || explicit === "dark") return explicit;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function setTheme(theme: Theme): void {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* storage can be unavailable (private mode); the choice still applies to this visit */
  }
}
