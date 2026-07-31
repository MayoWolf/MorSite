import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="not-found-mark">1515</div>
      <p className="eyebrow">Error 404</p>
      <h1>Wrong turn in the pits.</h1>
      <p>
        That page has moved or no longer exists. The robot is fine. Probably.
      </p>
      <Link className="button button-primary" href="/">
        <ArrowLeft aria-hidden="true" size={17} />
        Return home
      </Link>
    </main>
  );
}
