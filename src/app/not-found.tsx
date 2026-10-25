import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap grid min-h-[60vh] content-center gap-5 py-20">
      <p className="label">404</p>
      <h1 className="text-[clamp(2.4rem,7vw,4.8rem)] font-extrabold tracking-[-0.04em]">This page doesn&apos;t exist.</h1>
      <p className="m-0 max-w-[50ch] text-muted">The link may be old or mistyped. My projects are all on the home page.</p>
      <Link href="/#work" className="btn btn-primary w-fit">See my work</Link>
    </section>
  );
}
