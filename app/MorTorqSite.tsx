"use client";

import {
  ArrowDown,
  ArrowRight,
  Clock3,
  ExternalLink,
  HeartHandshake,
  Mail,
  Play,
  Trophy,
  Users,
  Wrench,
  X,
  Video,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  type CSSProperties,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SiteFooter, SiteHeader } from "./SiteChrome";

const gallery = [
  {
    src: "/images/team-2026.webp",
    alt: "MorTorq students, mentors, and the 2026 robot together after the Aerospace Valley event",
    label: "The 2026 team",
    width: 1600,
    height: 1200,
    credit: "BHUSD",
    creditUrl:
      "https://www.bhusd.org/news/2026-04-05/bhhs-mortorq-robotics-takes-2nd-place-at-aerospace-valley-reaches-finals-for-first-time-in-16-years",
  },
  {
    src: "/images/field-action-2026.webp",
    alt: "MorTorq robot 1515 launching yellow game pieces during the 2026 Aerospace Valley event",
    label: "Robot 1515 in action",
    width: 1600,
    height: 1066,
    credit: "MorTorq 2026 media",
    creditUrl:
      "https://drive.google.com/drive/folders/1OFhDUXirWz6g80URFSUERwTmma8bHMDJ",
  },
  {
    src: "/images/pit-repair-2026.webp",
    alt: "MorTorq students repairing robot 1515 together in the competition pit",
    label: "Between-match repairs",
    width: 1600,
    height: 1200,
    credit: "MorTorq 2026 media",
    creditUrl:
      "https://drive.google.com/drive/folders/1OFhDUXirWz6g80URFSUERwTmma8bHMDJ",
  },
  {
    src: "/images/team-2023.webp",
    alt: "MorTorq team members wearing orange team shirts outside Beverly Hills High School in 2023",
    label: "MorTorq through the years",
    width: 1800,
    height: 1200,
    credit: "MorTorq archive",
    creditUrl: "https://www.instagram.com/frc1515/",
  },
];

const kickoff = new Date("2027-01-09T09:00:00-08:00");

function getCountdown() {
  const difference = Math.max(0, kickoff.getTime() - Date.now());
  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
  };
}

export function MorTorqSite() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const initialTimer = window.setTimeout(
      () => setCountdown(getCountdown()),
      0,
    );
    const timer = window.setInterval(() => setCountdown(getCountdown()), 1000);
    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (selectedImage === null) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedImage(null);
    };
    document.body.classList.add("no-scroll");
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("no-scroll");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedImage]);

  const selected = useMemo(
    () => (selectedImage === null ? null : gallery[selectedImage]),
    [selectedImage],
  );

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-media" aria-hidden="true">
            <Image
              src="/images/hero-2026.webp"
              alt=""
              fill
              priority
              sizes="100vw"
            />
          </div>
          <div className="hero-shade" />
          <div className="hero-grid" aria-hidden="true" />

          <div className="hero-content">
            <p className="eyebrow hero-eyebrow">
              Beverly Hills High School <span>•</span> Since 2005
            </p>
            <h1 id="hero-title">
              We build
              <span>what’s next.</span>
            </h1>
            <p className="hero-lede">
              We are MorTorq—FRC Team 1515. Student-led, mentor-powered, and
              fresh from our strongest finish in sixteen years.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#season">
                Explore our season
                <ArrowDown aria-hidden="true" size={18} />
              </a>
              <a
                className="text-link text-link-light"
                href="https://www.youtube.com/watch?v=-hOItUDXMdI"
                target="_blank"
                rel="noreferrer"
              >
                <span className="play-dot">
                  <Play aria-hidden="true" size={14} fill="currentColor" />
                </span>
                Watch the finals
              </a>
            </div>
          </div>

          <div className="hero-result">
            <span className="result-number">02</span>
            <div>
              <small>2026 Aerospace Valley</small>
              <strong>District Event Finalist</strong>
            </div>
          </div>
        </section>

        <section className="news-rail" aria-label="Latest team news">
          <div className="news-label">
            <Zap aria-hidden="true" size={18} fill="currentColor" />
            Now
          </div>
          <p>
            <strong>Road to BIOCORE:</strong> The 2027 challenge launches
            January 9 as part of the new FIRST CANOPY season.
          </p>
          <a
            href="https://www.firstinspires.org/programs/frc/game-and-season"
            target="_blank"
            rel="noreferrer"
          >
            Season details
            <ExternalLink aria-hidden="true" size={15} />
          </a>
        </section>

        <section className="section intro-section" id="about">
          <div className="section-kicker">
            <span>01</span>
            Who we are
          </div>
          <div className="intro-grid">
            <h2>
              More than
              <br />
              a machine.
            </h2>
            <div className="intro-copy">
              <p className="large-copy">
                MorTorq is where Beverly Hills High School students turn bold
                ideas into competition-ready robots—and become engineers,
                programmers, designers, leaders, and teammates along the way.
              </p>
              <p>
                Every season, we solve a brand-new challenge from scratch. We
                prototype, manufacture, wire, code, document, pitch, and compete
                together. The robot is the result; the people we become are the
                real win.
              </p>
              <a className="text-link" href="#impact">
                See how we work
                <ArrowRight aria-hidden="true" size={17} />
              </a>
            </div>
          </div>

          <div className="discipline-grid">
            <article>
              <span className="discipline-icon">
                <Wrench aria-hidden="true" />
              </span>
              <h3>Design + build</h3>
              <p>
                CAD, rapid prototyping, machining, assembly, wiring, and the
                persistence to make every iteration better.
              </p>
            </article>
            <article>
              <span className="discipline-icon">
                <Zap aria-hidden="true" />
              </span>
              <h3>Code + control</h3>
              <p>
                Software, sensors, controls, data, and driver practice that turn
                a machine into a competitive robot.
              </p>
            </article>
            <article>
              <span className="discipline-icon">
                <HeartHandshake aria-hidden="true" />
              </span>
              <h3>Lead + connect</h3>
              <p>
                Strategy, media, fundraising, outreach, and partnerships that
                extend our impact beyond the field.
              </p>
            </article>
          </div>
        </section>

        <section className="season-section" id="season">
          <div className="season-topline">
            <div className="section-kicker section-kicker-light">
              <span>02</span>
              The next challenge
            </div>
            <p>2026–2027 season</p>
          </div>

          <div className="season-grid">
            <div className="season-copy">
              <p className="eyebrow">FIRST CANOPY presents</p>
              <h2>BIOCORE</h2>
              <p className="season-subtitle">Presented by Haas</p>
              <p className="season-description">
                A new challenge is taking root. On January 9, 2027, FIRST
                Robotics Competition teams will delve into the heart of what
                sustains life on Earth. Until kickoff, the game stays secret—and
                our preparation does not.
              </p>
              <a
                className="button button-primary"
                href="https://www.firstinspires.org/programs/frc/game-and-season"
                target="_blank"
                rel="noreferrer"
              >
                Explore BIOCORE
                <ExternalLink aria-hidden="true" size={17} />
              </a>
            </div>

            <a
              className="biocore-art"
              href="https://www.firstinspires.org/resources/library/season-brand-downloads"
              target="_blank"
              rel="noreferrer"
              aria-label="View official BIOCORE season resources"
            >
              <Image
                src="/images/biocore-2027.webp"
                alt="Official BIOCORE 2027 logo on a blue organic-patterned background"
                width={1280}
                height={850}
                sizes="(max-width: 860px) 100vw, 54vw"
                loading="lazy"
              />
              <span>
                Official season resources
                <ExternalLink aria-hidden="true" size={16} />
              </span>
            </a>
          </div>

          <div className="countdown-panel">
            <div className="countdown-heading">
              <Clock3 aria-hidden="true" />
              <div>
                <small>Countdown to kickoff</small>
                <strong>January 9, 2027 · 9:00 AM PT</strong>
              </div>
            </div>
            <div className="countdown" aria-live="polite">
              {[
                ["Days", countdown.days],
                ["Hours", countdown.hours],
                ["Minutes", countdown.minutes],
                ["Seconds", countdown.seconds],
              ].map(([label, value]) => (
                <div key={label}>
                  <strong>{String(value).padStart(2, "0")}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section result-section">
          <div className="section-kicker">
            <span>03</span>
            2026 REBUILT
          </div>

          <div className="result-heading">
            <div>
              <p className="eyebrow eyebrow-dark">A season to remember</p>
              <h2>Back in the finals.</h2>
            </div>
            <p>
              At the FIRST California Aerospace Valley event, MorTorq joined
              Teams 687 and 2073 on Alliance 2, fought through the playoff
              bracket, and finished as event finalists.
            </p>
          </div>

          <div className="video-feature">
            <div className="video-frame">
              <iframe
                src="https://www.youtube-nocookie.com/embed/-hOItUDXMdI?rel=0"
                title="MorTorq in the 2026 Aerospace Valley first final"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div className="video-copy">
              <span className="video-label">Final 1 · Aerospace Valley</span>
              <h3>The run that changed the season.</h3>
              <p>
                The result marked MorTorq’s first appearance in an event final
                in sixteen years—a breakthrough built one repair, one match,
                and one decision at a time.
              </p>
              <div className="result-links">
                <a
                  className="text-link"
                  href="https://frc-events.firstinspires.org/2026/team/1515"
                  target="_blank"
                  rel="noreferrer"
                >
                  Official results
                  <ExternalLink aria-hidden="true" size={16} />
                </a>
                <a
                  className="text-link"
                  href="https://www.bhusd.org/news/2026-04-05/bhhs-mortorq-robotics-takes-2nd-place-at-aerospace-valley-reaches-finals-for-first-time-in-16-years"
                  target="_blank"
                  rel="noreferrer"
                >
                  Read the BHUSD story
                  <ExternalLink aria-hidden="true" size={16} />
                </a>
              </div>
            </div>
          </div>

          <div className="stat-grid">
            <article>
              <span>01</span>
              <strong>16 years</strong>
              <p>Since MorTorq’s previous event-finals appearance</p>
            </article>
            <article>
              <span>02</span>
              <strong>Alliance 2</strong>
              <p>With The Nerd Herd 687 and EagleForce 2073</p>
            </article>
            <article>
              <span>03</span>
              <strong>2nd place</strong>
              <p>At the 2026 CA District Aerospace Valley event</p>
            </article>
          </div>
        </section>

        <section className="impact-section" id="impact">
          <div className="impact-photo">
            <Image
              src="/images/celebration-2026.webp"
              alt="MorTorq students celebrating together during the 2026 competition season"
              fill
              sizes="(max-width: 860px) 100vw, 55vw"
              loading="lazy"
            />
            <span>2026 competition season · MorTorq media</span>
          </div>
          <div className="impact-copy">
            <div className="section-kicker section-kicker-light">
              <span>04</span>
              Impact beyond the field
            </div>
            <h2>Build a robot. Grow a community.</h2>
            <p>
              Competition sharpens our skills; service gives them purpose.
              MorTorq students share STEM with younger learners, create
              inclusive robotics experiences, and organize community donation
              efforts across Los Angeles.
            </p>
            <ul className="impact-list">
              <li>
                <Users aria-hidden="true" />
                <span>
                  <strong>Peer-powered learning</strong>
                  Students lead, teach, document, and pass knowledge forward.
                </span>
              </li>
              <li>
                <HeartHandshake aria-hidden="true" />
                <span>
                  <strong>Inclusive outreach</strong>
                  Hands-on robotics experiences designed to welcome more
                  learners into STEM.
                </span>
              </li>
              <li>
                <Trophy aria-hidden="true" />
                <span>
                  <strong>Team sustainability</strong>
                  Recognized at the 2023 Los Angeles Regional for building a
                  program that lasts.
                </span>
              </li>
            </ul>
            <a className="button button-outline-light" href="#join">
              Get involved
              <ArrowRight aria-hidden="true" size={17} />
            </a>
          </div>
        </section>

        <section className="section media-section" id="media">
          <div className="media-heading">
            <div>
              <div className="section-kicker">
                <span>05</span>
                From the field
              </div>
              <h2>See MorTorq in motion.</h2>
            </div>
            <a
              className="text-link"
              href="https://www.youtube.com/watch_videos?title=CA+District+Aerospace+Valley+Event+%28Team+1515%29&video_ids=8Pgxti0eePs%2Cs3jHBHdsT1w%2C7_trgLUpB3w%2CSlV00E8Kwn0%2CAL2WxK0b-aE%2CiKW4n7y3jmI%2C6PGhOZ_kOJY%2CEBOr7OyvyL8%2CsJEytbVgm5U%2CR8Ik4oAdzkI%2C0ULctxRf65Q%2CsWbFEAPMaOM%2Cbs5ecObdi2Q%2CvWTFYur-U68%2CvgjhZKR7j1s%2CRvRE5i_hQ_k%2C-hOItUDXMdI%2CgGLzO0Qkt24"
              target="_blank"
              rel="noreferrer"
            >
              Watch every 2026 match
              <Video aria-hidden="true" size={18} />
            </a>
          </div>

          <div className="gallery-grid">
            {gallery.map((image, index) => (
              <button
                className={`gallery-item gallery-item-${index + 1}`}
                key={image.src}
                type="button"
                onClick={() => setSelectedImage(index)}
                aria-label={`Open photo: ${image.label}`}
                style={
                  {
                    "--image-ratio": `${image.width} / ${image.height}`,
                  } as CSSProperties
                }
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 560px) calc(100vw - 44px), min(calc((100vw - 76px) / 2), 702px)"
                />
                <span className="gallery-overlay">
                  <span>{image.label}</span>
                  <span className="gallery-open">View</span>
                </span>
              </button>
            ))}
          </div>

          <div className="video-pair">
            <article>
              <div className="mini-video-frame">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster="/images/recap-poster.webp"
                  aria-label="MorTorq 2026 Aerospace Valley finals recap"
                >
                  <source
                    src="/media/mortorq-2026-recap.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support embedded video.
                </video>
              </div>
              <div>
                <span>2026 · MOR TORQ ORIGINAL</span>
                <h3>Thirty-three seconds from the finals run</h3>
              </div>
            </article>
            <article>
              <div className="mini-video-frame">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/boJWcbOxato?rel=0"
                  title="Official 2026–2027 FIRST CANOPY and BIOCORE season reveal"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <div>
                <span>2027 · BIOCORE</span>
                <h3>The next season takes root</h3>
              </div>
            </article>
          </div>
        </section>

        <section className="partners-section">
          <p className="eyebrow">Powered by our partners</p>
          <div className="partner-list" aria-label="Team sponsors">
            <span>Enterprise</span>
            <span>BHHS Career Technical Education</span>
            <span>Beverly Hills Education Foundation</span>
            <span>Beverly Hills High School</span>
          </div>
        </section>

        <section className="join-section" id="join">
          <div className="join-noise" aria-hidden="true" />
          <div className="join-copy">
            <p className="eyebrow">There’s a place for you here</p>
            <h2>
              Help build
              <br />
              the next chapter.
            </h2>
            <p>
              Join the team, mentor a student, or help fund the parts, tools,
              travel, and opportunities that make every season possible.
            </p>
          </div>
          <div className="join-actions">
            <Link className="button button-dark" href="/leadership">
              Meet the leads
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <a
              className="button button-outline-dark"
              href="mailto:1515mortorq@gmail.com?subject=I%27d%20like%20to%20join%20MorTorq"
            >
              <Mail aria-hidden="true" size={18} />
              Join or mentor
            </a>
            <a
              className="button button-outline-dark"
              href="https://www.zeffy.com/donation-form/robotics-program"
              target="_blank"
              rel="noreferrer"
            >
              Sponsor MorTorq
              <ExternalLink aria-hidden="true" size={17} />
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />

      {selected && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={selected.label}
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setSelectedImage(null);
          }}
        >
          <button
            className="lightbox-close"
            type="button"
            aria-label="Close photo"
            onClick={() => setSelectedImage(null)}
            autoFocus
          >
            <X aria-hidden="true" />
          </button>
          <figure>
            <Image
              src={selected.src}
              alt={selected.alt}
              width={selected.width}
              height={selected.height}
              sizes="90vw"
            />
            <figcaption>
              <span>{selected.label}</span>
              <a href={selected.creditUrl} target="_blank" rel="noreferrer">
                Photo: {selected.credit}
                <ExternalLink aria-hidden="true" size={14} />
              </a>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
