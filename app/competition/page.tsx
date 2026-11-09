import type { Metadata } from "next";
import { CalendarDays, ExternalLink, MapPin } from "lucide-react";
import { SiteFooter, SiteHeader } from "../SiteChrome";
import styles from "./competition.module.css";

const description =
  "Follow MorTorq Team 1515 at the 2027 Aerospace Valley and San Gabriel Valley FIRST California district qualifiers.";

export const metadata: Metadata = {
  title: "Competition",
  description,
  alternates: { canonical: "/competition" },
  openGraph: {
    title: "Competition | MorTorq",
    description,
    url: "/competition",
  },
};

const events = [
  {
    code: "CAASV",
    week: 4,
    name: "Aerospace Valley",
    dates: "March 25–27, 2027",
    days: "Thursday–Saturday",
    venue: "Eastside High School",
    street: "3200 E Ave J 8",
    city: "Lancaster, CA",
  },
  {
    code: "CASGV",
    week: 5,
    name: "San Gabriel Valley",
    dates: "April 2–4, 2027",
    days: "Friday–Sunday",
    venue: "Don Bosco Technical Institute",
    street: "1151 San Gabriel Blvd",
    city: "Rosemead, CA",
  },
];

export default function Competition() {
  return (
    <div className="site-page">
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader activePage="competition" />
      <main id="main">
        <section className="interior-hero" aria-labelledby="competition-title" data-analytics-section="competition_hero">
          <div className="interior-hero-inner">
            <p className="eyebrow">2027 BIOCORE · FRC Team 1515</p>
            <h1 id="competition-title">On the <span>field.</span></h1>
            <p>MorTorq is competing at two FIRST California district qualifiers. Find out where to cheer us on and follow our matches throughout the season.</p>
          </div>
        </section>
        <section className="section" aria-labelledby="district-events" data-analytics-section="district_events">
          <div className={styles.heading}>
            <h2 id="district-events">2027 district events</h2>
            <p>Check FIRST for official schedules and team rosters. Follow The Blue Alliance for match scores, rankings, and video as they become available.</p>
          </div>
          <div className={styles.grid}>
            {events.map(({ code, week, name, dates, days, venue, street, city }) => {
              const location = encodeURIComponent(`${venue}, ${street}, ${city}`);
              return (
                <article className={styles.event} key={code} aria-labelledby={code}>
                  <p className="eyebrow">Week {week} · {code}</p>
                  <h3 id={code}>{name}</h3>
                  <div className={styles.detail}>
                    <CalendarDays size={20} aria-hidden="true" />
                    <p><strong>{dates}</strong><br />{days} · Pacific time</p>
                  </div>
                  <div className={styles.detail}>
                    <MapPin size={20} aria-hidden="true" />
                    <p>
                      <a className="text-link" href={`https://maps.apple.com/?q=${location}`} target="_blank" rel="noopener noreferrer">
                        {venue} <ExternalLink size={14} aria-hidden="true" />
                      </a>
                      <br />{street}<br />{city}
                    </p>
                  </div>
                  <div className={styles.links}>
                    <a
                      className="button button-small button-dark"
                      href={`https://frc-events.firstinspires.org/2027/${code}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`FIRST event details for ${name}`}
                    >
                      FIRST event details <ExternalLink size={15} aria-hidden="true" />
                    </a>
                    <a
                      className="button button-small button-outline-dark"
                      href={`https://www.thebluealliance.com/event/2027${code.toLowerCase()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${name} on The Blue Alliance`}
                    >
                      The Blue Alliance <ExternalLink size={15} aria-hidden="true" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
