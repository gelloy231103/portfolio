/** Theme store. Backed by <html data-theme> and the OS preference. */
export type Theme = "light" | "dark";

const query = "(prefers-color-scheme: dark)";

export function getTheme(): Theme {
  const explicit = document.documentElement.getAttribute("data-theme");
  if (explicit === "light" || explicit === "dark") return explicit;
  return window.matchMedia(query).matches ? "dark" : "light";
}

/** On the server the theme is unknown; the toggle renders with no pressed state until hydration. */
export function getServerTheme(): Theme | null {
  return null;
}

export function subscribeTheme(onChange: () => void): () => void {
  const media = window.matchMedia(query);
  const observer = new MutationObserver(onChange);
  media.addEventListener("change", onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => {
    media.removeEventListener("change", onChange);
    observer.disconnect();
  };
}

export function setTheme(theme: Theme): void {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* storage can be unavailable (private mode); the choice still applies to this visit */
  }
}
