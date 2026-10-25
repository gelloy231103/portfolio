export type ProjectKind = "Web" | "Mobile" | "Game";
export type MockKind = "invite" | "flash" | "market" | "sign" | "worlds";

export type Project = {
  slug: string;
  name: string;
  year: number;
  month: number; // 1-12, used for ordering the timeline
  kind: ProjectKind;
  hue: number; // drives the card's tinted stage
  context: "Personal project" | "Team project" | "Capstone project";
  status: "In progress" | "Built";
  featured?: boolean;
  award?: string;
  summary: string;
  story: string[];
  features: string[];
  stack: string[];
  role: string;
  repo?: string;
  live?: string;
  mock: MockKind;
  /** Demo video stored in the Supabase "media" bucket. */
  video?: { file: string; poster: string; note?: string };
};

export const projects: Project[] = [
  {
    slug: "vow-and-verse",
    name: "Vow & Verse",
    year: 2026,
    month: 10,
    kind: "Web",
    hue: 345,
    context: "Personal project",
    status: "In progress",
    featured: true,
    summary:
      "A small business in a box: couples browse invitation designs, pick a package, pay by GCash or Maya, and get their own wedding website with a working RSVP.",
    story: [
      "Vow & Verse sells invitation websites instead of printed cards. Each one is a scrolling page with the couple's story, the venue and map, the programme, entourage, dress code and an RSVP form, made for guests on their phones.",
      "I built both sides: the public shop where customers order and pay, and a private studio where every invitation can get its own colours, lettering, opening screen and section order.",
    ],
    features: [
      "Owner studio for designing each invitation",
      "Checkout with GCash, Maya, GoTyme or bank transfer",
      "Guest RSVP with a private guest-list link for the couple",
      "E-mail receipts and order alerts",
      "Runs on free tiers with zero npm dependencies",
    ],
    stack: ["Node.js", "Supabase", "Vercel", "HTML/CSS"],
    role: "Solo: design, front end, back end, deployment",
    mock: "invite",
  },
  {
    slug: "civiq",
    name: "CivIQ",
    year: 2026,
    month: 8,
    kind: "Web",
    hue: 178,
    context: "Personal project",
    status: "Built",
    summary:
      "A flashcard app for laptop and phone where you highlight the answer inside a sentence, track what you've mastered, and share decks with friends.",
    story: [
      "CivIQ is a login-based study app. Users write their own decks using cloze cards, where the answer is hidden inside a sentence, and the app tracks every card as New, Learning, Master or Retry.",
      "Privacy was a priority: private profile details are encrypted with AES-256 in the database, and screens read them only through controlled functions.",
    ],
    features: [
      "Cloze (highlight-the-answer) flashcards",
      "Per-user mastery tracking with four stages",
      "Public and friends-only decks with a follow system",
      "AES-256 encryption for private profile details",
      "Preview mode that runs without a backend",
    ],
    stack: ["React", "TypeScript", "Vite", "Tailwind", "Supabase"],
    role: "Solo: product, UI, database and security",
    mock: "flash",
  },
  {
    slug: "nutriventure",
    name: "NutriVenture",
    year: 2026,
    month: 4,
    kind: "Game",
    hue: 262,
    context: "Capstone project",
    status: "Built",
    award: "Top 8 · Young Creative Challenges Season 2",
    summary:
      "Our capstone, and a Top 8 finisher in Young Creative Challenges Season 2: a Unity adventure about nutrition across themed kingdoms. I built Kingdom 4, Allergia.",
    story: [
      "NutriVenture is our college capstone: a 3D adventure that takes the player through themed kingdoms, each teaching something about food and nutrition.",
      "We built it as a team, with each member owning a kingdom. My part was Kingdom 4, Allergia, a world about food allergies, from its terrain and story cutscenes to its gameplay.",
    ],
    features: [
      "Placed Top 8 in Young Creative Challenges Season 2",
      "Built Kingdom 4, Allergia, end to end",
      "Custom terrain and story cutscenes made with Unity Timeline",
      "Allergen hunt, rock-path puzzle and a wagon ride",
      "Team capstone, each member owning one kingdom",
    ],
    stack: ["Unity", "C#", "Timeline"],
    role: "Developer of Kingdom 4: Allergia",
    repo: "https://github.com/Sidyei/NutriventureV2",
    mock: "worlds",
    video: { file: "nutriventure-allergia.mp4", poster: "/posters/nutriventure.jpg" },
  },
  {
    slug: "suki",
    name: "Suki",
    year: 2025,
    month: 5,
    kind: "Mobile",
    hue: 132,
    context: "Team project",
    status: "Built",
    summary:
      "A mobile marketplace that connects farms with buyers, with farm dashboards, carts, a wallet, chat and order tracking.",
    story: [
      "Suki links local farms with customers. Farmers set up a profile, list products and manage orders from a dashboard; buyers browse, add to cart, pay and follow their delivery.",
      "Suki started as my idea, and I built it together with my group. The app covers the full flow from sign-up to checkout, messaging, a wallet and transaction history.",
    ],
    features: [
      "Separate farm and customer experiences",
      "Cart grouped by farm, checkout, wallet and saved cards",
      "In-app chat between buyers and farms",
      "Farm dashboard for products, orders and income",
      "E-mail verification on sign-up",
    ],
    stack: ["React Native", "Expo", "Firebase"],
    role: "Came up with the idea; developer in a team",
    repo: "https://github.com/gelloy231103/suki",
    mock: "market",
    video: { file: "suki-demo.mp4", poster: "/posters/suki.jpg", note: "Recorded on the web build with demo data." },
  },
  {
    slug: "sensai",
    name: "SensAi",
    year: 2025,
    month: 5,
    kind: "Mobile",
    hue: 205,
    context: "Team project",
    status: "Built",
    summary:
      "A Flutter app that helps deaf learners pick up American Sign Language, with alphabet lessons, a word library, practice rounds and an AI conversation partner.",
    story: [
      "SensAi teaches American Sign Language one step at a time. Learners work through the ASL alphabet with active recall, look up signs in a word library sorted by category, and chat with Handy, an AI partner, about school, travel, hobbies or a mock job interview.",
      "We built it as a team of three, and I made the most commits. My part covered sign-in with e-mail verification, password reset and Google or Facebook accounts, the splash screen, the practice screen and its confetti finish, the profile module, and the subscription, plan and payment screens.",
    ],
    features: [
      "ASL alphabet lessons with an active-recall quiz",
      "Word library sorted by category",
      "Talk to Handy: practise conversations with an AI partner",
      "Sign-in with e-mail, Google or Facebook",
      "Free, Standard and Premium plans with card, GCash or bank payment",
    ],
    stack: ["Flutter", "Dart", "Firebase"],
    role: "Developer in a team of three: sign-in, practice, profile and subscription screens",
    mock: "sign",
    video: {
      file: "sensai-demo.mp4",
      poster: "/posters/sensai.jpg",
      note: "Recorded on the web build with demo data. Word clips are fingerspelled demos.",
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const projectKinds: ProjectKind[] = Array.from(new Set(projects.map((p) => p.kind)));
