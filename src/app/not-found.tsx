import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="relative isolate grid min-h-[78vh] place-items-center overflow-hidden pt-32 pb-20">
      <div className="dot-grid absolute inset-0 -z-10" aria-hidden="true" />
      <div className="glow absolute top-0 left-1/2 -z-10 h-[520px] w-[min(900px,140vw)] -translate-x-1/2" aria-hidden="true" />
      <div className="container-x grid justify-items-center gap-6 text-center">
        <span className="eyebrow">Error 404</span>
        <h1 className="m-0 text-[clamp(2.6rem,7vw,4.8rem)] leading-none font-semibold tracking-[-0.04em]">
          This page <span className="serif text-accent-ink">wandered off.</span>
        </h1>
        <p className="lead m-0 max-w-[46ch]">The link may be old or mistyped. Every project is listed on the home page.</p>
        <Link href="/#work" className="btn btn-primary">
          View my work <ArrowRight className="arrow" />
        </Link>
      </div>
    </section>
  );
}
