import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="wrap grid min-h-[60vh] content-center justify-items-start gap-6 py-20">
      <p className="kicker m-0 text-ink-3">Error 404</p>
      <h1 className="m-0 max-w-[14ch] text-[clamp(2.8rem,8vw,5.2rem)] leading-[0.95] tracking-[-0.045em]">This page doesn&apos;t exist.</h1>
      <p className="m-0 max-w-[32em] text-lg text-ink-2">The link may be old or mistyped. Every project is on the home page.</p>
      <Link href="/#work" className="pill pill-dark">
        See my work <ArrowRight />
      </Link>
    </section>
  );
}
