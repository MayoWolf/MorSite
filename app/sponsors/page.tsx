import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, ExternalLink, Mail } from "lucide-react";
import { SiteFooter, SiteHeader } from "../SiteChrome";

export const metadata: Metadata = {
  title: "Sponsors",
  description:
    "Meet the current sponsors supporting MorTorq FRC Team 1515 and hands-on robotics at Beverly Hills High School.",
  alternates: { canonical: "/sponsors" },
  openGraph: {
    title: "Sponsors | MorTorq",
    description: "The community helping Team 1515 build what’s next.",
    url: "/sponsors",
  },
};

const sponsors = [
  { name: "Beverly Hills Education Foundation", mark: "bhef", href: "https://www.bhef.org/", width: 1000, height: 190 },
  { name: "Gene Haas Foundation", mark: "gene-haas", href: "https://www.ghaasfoundation.org/", width: 496, height: 500, dark: true },
  { name: "Ohana & Co", mark: "ohana", href: "https://www.ohanaco.com/", width: 744, height: 248, dark: true },
  { name: "Optimus Properties, LLC", mark: "optimus", href: "https://optimuspropertiesllc.com/", width: 1000, height: 250 },
  { name: "Rubel + Hartley", mark: "rubel-hartley", href: "https://latopalmspringsrealestate.com/", width: 390, height: 193 },
  { name: "EndTest Pro Psychology", mark: "endtest-pro", href: "https://www.endtestpro.com/", width: 263, height: 179 },
  { name: "Fabworks", mark: "fabworks", href: "https://www.fabworks.com/", width: 1000, height: 158 },
];

export default function Sponsors() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader activePage="sponsors" />
      <main id="main">
        <section className="sponsors-hero" aria-labelledby="sponsors-title" data-analytics-section="sponsors_hero">
          <div className="sponsors-hero-inner">
            <p className="eyebrow">Our sponsors · FRC Team 1515</p>
            <h1 id="sponsors-title">Built together.<br /><span>Powered by you.</span></h1>
            <p>Behind every robot is a community that believes in its builders. Thank you to the sponsors helping MorTorq turn student ideas into real-world experience.</p>
            <a className="text-link" href="#current-sponsors">Meet our sponsors <ArrowRight aria-hidden="true" size={18} /></a>
          </div>
        </section>
        <section className="section sponsors-directory" id="current-sponsors" aria-labelledby="current-sponsors-title" data-analytics-section="current_sponsors">
          <div className="sponsors-heading">
            <div><p className="eyebrow">The community behind the build</p><h2 id="current-sponsors-title">Our current sponsors.</h2></div>
            <p>Their support helps make hands-on learning, teamwork, and competition possible. Explore the organizations supporting Team 1515.</p>
          </div>
          <div className="sponsors-grid">
            {sponsors.map((sponsor) => (
              <a key={sponsor.mark} className="sponsor-card" href={sponsor.href} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${sponsor.name} (opens in a new tab)`} data-analytics-action="outbound_link" data-analytics-label={sponsor.mark} data-analytics-location="sponsors_directory">
                <div className={`sponsor-logo${sponsor.dark ? " sponsor-logo-dark" : ""}`}>
                  <Image src={`/images/sponsors/${sponsor.mark}.png`} alt={`${sponsor.name} logo`} width={sponsor.width} height={sponsor.height} />
                </div>
                <div className="sponsor-caption"><h3>{sponsor.name}</h3><span>Visit website <ExternalLink aria-hidden="true" size={15} /></span></div>
              </a>
            ))}
          </div>
        </section>
        <section className="join-section" aria-labelledby="sponsor-join-title" data-analytics-section="sponsor_join">
          <div className="join-copy"><p className="eyebrow">Build the next chapter with us</p><h2 id="sponsor-join-title">Support the<br />next generation.</h2><p>Help our students design, build, and compete. Get in touch to learn about sponsoring MorTorq.</p></div>
          <div className="join-actions"><a className="button button-dark" href="mailto:1515mortorq@gmail.com?subject=I%27d%20like%20to%20sponsor%20MorTorq" data-analytics-action="sponsor_interest" data-analytics-label="become_a_sponsor" data-analytics-location="sponsors"><Mail aria-hidden="true" size={18} />Become a sponsor<ArrowRight aria-hidden="true" size={18} /></a></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
