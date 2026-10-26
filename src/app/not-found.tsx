import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap min-h-[50vh] pt-16 sm:pt-24">
      <p className="meta m-0">404</p>
      <h1 className="mt-4 mb-0 text-[clamp(1.7rem,3.6vw,2.3rem)]">There&apos;s nothing at this address.</h1>
      <p className="mt-4 mb-0 max-w-[34em] text-ink-2">
        The link may be old or mistyped. All my projects are on the <Link href="/#work" className="a">home page</Link>.
      </p>
    </section>
  );
}
