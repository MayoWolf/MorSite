import type { Metadata } from "next";
import { LeadershipPage } from "./LeadershipPage";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "Meet the 2026–2027 student leaders coordinating operations, mechanical, electrical, and programming for MorTorq FRC Team 1515.",
  alternates: {
    canonical: "/leadership",
  },
  openGraph: {
    title: "Leadership | MorTorq",
    description:
      "Meet the student leaders behind MorTorq FRC Team 1515.",
    url: "/leadership",
  },
};

export default function Leadership() {
  return <LeadershipPage />;
}
