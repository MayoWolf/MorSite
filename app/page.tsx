import type { Metadata } from "next";
import { MorTorqSite } from "./MorTorqSite";

export const metadata: Metadata = {
  title: "MorTorq — FRC Team 1515",
  description:
    "Beverly Hills High School's student-led FIRST Robotics Competition team. Meet MorTorq, celebrate our 2026 finalist season, and follow the road to BIOCORE 2027.",
};

export default function Home() {
  return <MorTorqSite />;
}
