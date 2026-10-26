export type ProjectKind = "Web" | "Mobile" | "Game";

/** One column of a system block diagram, read left to right. */
export type DiagramStage = { label: string; blocks: string[] };

export type Project = {
  slug: string;
  /** Application-note number, assigned in the order the projects were built. */
  code: string;
  name: string;
  tagline: string;
  year: number;
  month: number; // 1-12
  kind: ProjectKind;
  context: "Personal project" | "Team project" | "Capstone project";
  team: string;
  status: "In progress" | "Shipped" | "Completed";
  award?: string;
  summary: string;
  story: string[];
  features: string[];
  stack: string[];
  role: string;
  contribution: string[];
  diagram: DiagramStage[];
  repo?: string;
  live?: string;
  /** Colours for this project's showcase panel and case-study header. */
  panel: { bg: string; fg: string };
  /**
   * Extra screenshots shown on the case study, stored under /public/screenshots/<slug>/.
   * The first one is also used as the cover when the project has no demo poster.
   */
  gallery?: { src: string; alt: string }[];
  /** Demo video stored in the Supabase "media" bucket, with a poster in /public/posters. */
  video?: { file: string; poster: string; note?: string };
};

export const projects: Project[] = [
  {
    slug: "sensai",
    panel: { bg: "#e4f0fa", fg: "#0d2233" },
    code: "AN-01",
    name: "SensAi",
    tagline: "Learn American Sign Language with an AI conversation partner",
    year: 2025,
    month: 5,
    kind: "Mobile",
    context: "Team project",
    team: "3 developers",
    status: "Completed",
    summary:
      "A Flutter app that helps deaf learners and the people around them pick up American Sign Language: alphabet lessons, a word library, quizzes and an AI conversation partner called Handy.",
    story: [
      "SensAi teaches American Sign Language one step at a time. Learners work through the ASL alphabet with an active-recall quiz, look up signs in a word library sorted by category, and practise conversations with Handy about school, travel, hobbies or a mock job interview.",
      "We built it as a team of three. I made the most commits and owned the account and money side of the app.",
    ],
    features: [
      "ASL alphabet lessons with an active-recall quiz",
      "Word library sorted by category",
      "Conversation practice with an AI partner, with feedback on each sign",
      "Free, Standard and Premium plans with card, GCash or bank payment",
    ],
    contribution: [
      "Sign-in with e-mail verification, password reset, and Google or Facebook accounts",
      "Splash screen, and the practice screen with its confetti finish",
      "Profile module for editing name, e-mail and password",
      "Subscription, plan selection and payment screens",
    ],
    stack: ["Flutter", "Dart", "Firebase"],
    role: "Developer: sign-in, practice, profile and subscription screens",
    diagram: [
      { label: "Client", blocks: ["Flutter app (Android, iOS)"] },
      { label: "Identity", blocks: ["Firebase Auth", "Google / Facebook sign-in"] },
      { label: "Data", blocks: ["Cloud Firestore", "Firebase Storage"] },
      { label: "Services", blocks: ["AI chat API"] },
    ],
    video: {
      file: "sensai-demo.mp4",
      poster: "/posters/sensai.jpg",
      note: "Recorded on the web build with demo data. Word clips are fingerspelled demos.",
    },
  },
  {
    slug: "suki",
    panel: { bg: "#e8f1e1", fg: "#17301a" },
    code: "AN-02",
    name: "Suki",
    tagline: "A farmer-to-consumer marketplace",
    year: 2025,
    month: 5,
    kind: "Mobile",
    context: "Team project",
    team: "Group project",
    status: "Completed",
    summary:
      "A mobile marketplace that connects local farms with buyers, with farm dashboards, a cart grouped by farm, a wallet, chat and order tracking.",
    story: [
      "Suki links local farms with customers. Farmers set up a profile, list products and manage orders from a dashboard; buyers browse, add to cart, pay and follow their delivery.",
      "Suki was my idea, and I built it with my group. It covers the full flow from sign-up to checkout, messaging, a wallet and transaction history.",
    ],
    features: [
      "Separate experiences for farms and customers",
      "Cart grouped by farm, checkout, wallet and saved cards",
      "In-app chat between buyers and farms",
      "Farm dashboard for products, orders and income",
    ],
    contribution: ["Came up with the product idea", "Developer across the app as part of the team"],
    stack: ["React Native", "Expo", "Firebase"],
    role: "Product idea; developer in the team",
    diagram: [
      { label: "Client", blocks: ["React Native app (Expo)"] },
      { label: "Identity", blocks: ["Firebase Auth", "E-mail verification"] },
      { label: "Data", blocks: ["Firestore: products, farms, carts", "Firestore: orders, wallet"] },
    ],
    repo: "https://github.com/gelloy231103/suki",
    video: { file: "suki-demo.mp4", poster: "/posters/suki.jpg", note: "Recorded on the web build with demo data." },
  },
  {
    slug: "nutriventure",
    panel: { bg: "#2b2a22", fg: "#f3efe2" },
    code: "AN-03",
    name: "NutriVenture",
    tagline: "A Unity adventure about nutrition. I built Kingdom 4, Allergia",
    year: 2026,
    month: 4,
    kind: "Game",
    context: "Capstone project",
    team: "Capstone team, one kingdom per member",
    status: "Completed",
    award: "Top 8, Young Creative Challenges Season 2",
    summary:
      "Our college capstone and a Top 8 finalist in Young Creative Challenges Season 2: a 3D adventure through themed kingdoms, each teaching something about food. I built Kingdom 4, Allergia, a world about food allergies.",
    story: [
      "NutriVenture takes the player through themed kingdoms, each built by one member of the team. Mine, Allergia, teaches food allergies through a story told in cutscenes and a chain of gameplay phases.",
      "The player finds the Scroll of Alerthia, hunts down the Big 9 allergens, crosses the Milky Lake by stepping only on safe foods, rides the Wagon of Alerthia and delivers the scroll to Queen Alergia.",
    ],
    features: [
      "Top 8, Young Creative Challenges Season 2",
      "Story cutscenes built with Unity Timeline",
      "Phase-based game manager: scroll, allergen hunt, wagon, platforms, castle",
      "Allergen hunt, safe-food rock path and a steerable wagon ride",
    ],
    contribution: [
      "Kingdom 4, Allergia, end to end: terrain, story, cutscenes and gameplay",
      "Game flow and scoring for every phase of the kingdom",
    ],
    stack: ["Unity", "C#", "Timeline"],
    role: "Developer of Kingdom 4: Allergia",
    diagram: [
      { label: "Input", blocks: ["Touch / keyboard controls"] },
      { label: "Gameplay", blocks: ["Phase manager", "Allergen hunt & rock path", "Wagon controller"] },
      { label: "Presentation", blocks: ["Timeline cutscenes", "Cinemachine cameras"] },
      { label: "Progress", blocks: ["Score & timer", "Saved game state"] },
    ],
    repo: "https://github.com/Sidyei/NutriventureV2",
    video: { file: "nutriventure-allergia.mp4", poster: "/posters/nutriventure.jpg" },
  },
  {
    slug: "civiq",
    panel: { bg: "#ebe7fa", fg: "#221a44" },
    code: "AN-04",
    name: "CivIQ",
    tagline: "Flashcards where you highlight the answer inside a sentence",
    year: 2026,
    month: 8,
    kind: "Web",
    context: "Personal project",
    team: "Solo",
    status: "Completed",
    summary:
      "A study app for laptop and phone with cloze flashcards, per-card mastery tracking and shareable decks, with private profile details encrypted in the database.",
    story: [
      "CivIQ is a login-based study app. Users write decks of cloze cards, where the answer is hidden inside a sentence, and the app tracks every card as New, Learning, Master or Retry.",
      "Privacy was a priority: private profile details are encrypted with AES-256 in the database, and screens read them only through controlled functions.",
    ],
    features: [
      "Cloze (highlight-the-answer) flashcards",
      "Per-user mastery tracking in four stages",
      "Public and friends-only decks with a follow system",
      "AES-256 encryption for private profile details",
    ],
    contribution: ["Product, interface, database design and security"],
    stack: ["React", "TypeScript", "Vite", "Tailwind", "Supabase"],
    role: "Solo: product, interface, database and security",
    diagram: [
      { label: "Client", blocks: ["React + TypeScript (Vite)"] },
      { label: "Identity", blocks: ["Supabase Auth"] },
      { label: "Data", blocks: ["Postgres with Row Level Security", "Encrypted profile fields"] },
    ],
  },
  {
    slug: "vow-and-verse",
    panel: { bg: "#f7e8e8", fg: "#3d1219" },
    code: "AN-05",
    name: "Vow & Verse",
    tagline: "Invitation websites with checkout and RSVPs",
    year: 2026,
    month: 10,
    kind: "Web",
    context: "Personal project",
    team: "Solo",
    status: "In progress",
    summary:
      "A small business in a box: couples pick an invitation design, pay by GCash or Maya, and get their own wedding website with a working RSVP.",
    story: [
      "Vow & Verse sells invitation websites instead of printed cards. Each one is a scrolling page with the couple's story, venue and map, programme, entourage, dress code and an RSVP form, made for guests on their phones.",
      "I built both sides: the public shop where customers order and pay, and a private studio where every invitation gets its own colours, lettering, opening screen and section order.",
    ],
    features: [
      "Owner studio for designing each invitation",
      "Checkout with GCash, Maya, GoTyme or bank transfer",
      "Guest RSVP with a private guest-list link for the couple",
      "E-mail receipts and order alerts",
    ],
    contribution: ["Design, front end, back end and deployment"],
    stack: ["Node.js", "Supabase", "Vercel", "HTML/CSS"],
    role: "Solo: design, front end, back end, deployment",
    diagram: [
      { label: "Client", blocks: ["Shop & invitation pages", "Owner studio"] },
      { label: "Server", blocks: ["Node.js API on Vercel"] },
      { label: "Data", blocks: ["Supabase: orders, RSVPs", "E-mail receipts"] },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Order for the home page showcase: strongest and most visual work first. */
const SHOWCASE = ["nutriventure", "sensai", "vow-and-verse", "suki", "civiq"];
export const projectsShowcase = [...projects].sort((a, b) => rank(a.slug) - rank(b.slug));
function rank(slug: string): number {
  const i = SHOWCASE.indexOf(slug);
  return i === -1 ? SHOWCASE.length : i;
}

/** The image that represents a project: its demo poster, else its first screenshot. */
export function coverImage(p: Project): { src: string; alt: string } | undefined {
  if (p.video?.poster) return { src: p.video.poster, alt: `${p.name} demo` };
  return p.gallery?.[0];
}

/** Newest first, for listings. */
export const projectsNewestFirst = [...projects].sort((a, b) => b.year - a.year || b.month - a.month);
