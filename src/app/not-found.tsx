import Link from "next/link";

export default function NotFound() {
  return (
    <section className="pad grid-bg grid min-h-[60vh] content-center gap-5 py-20">
      <p className="mono-label m-0 text-mark">Error 404 · Page not found</p>
      <h1 className="m-0 font-cond text-[clamp(2.4rem,7vw,4.6rem)] leading-none font-bold uppercase">This page isn&apos;t in the datasheet.</h1>
      <p className="m-0 max-w-[50ch] text-ink-2">The link may be old or mistyped. Every project is listed on the home page.</p>
      <Link href="/#projects" className="btn btn-solid w-fit">View projects</Link>
    </section>
  );
}
