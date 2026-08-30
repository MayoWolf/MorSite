import Image from "next/image";
import { SiteFooter, SiteHeader } from "../SiteChrome";

const leaders = [
  {
    name: "Wolf Nazari",
    role: "Operations Lead",
    department: "Operations",
    bio: "Personal bio coming soon. This role coordinates schedules, communication, and the systems that keep the team moving.",
  },
  {
    name: "Sophie Hong",
    role: "Mechanical Lead",
    department: "Mechanical",
    bio: "Personal bio coming soon. This role guides mechanical design, fabrication, assembly, and iteration.",
  },
  {
    name: "Henry Goldman",
    role: "Programming Lead",
    department: "Programming",
    bio: "Personal bio coming soon. This role guides robot software, controls, testing, and collaboration with the build team.",
  },
  {
    name: "Arianna",
    role: "Electrical Lead",
    department: "Electrical",
    bio: "Personal bio coming soon. This role guides electrical layout, wiring, testing, and system reliability.",
  },
  {
    name: "Peter Shabani",
    role: "Assistant Operations Lead",
    department: "Operations",
    bio: "Personal bio coming soon. This role supports team logistics, communication, and day-to-day coordination.",
  },
  {
    name: "Isabel Lo",
    role: "Assistant Mechanical Lead",
    department: "Mechanical",
    bio: "Personal bio coming soon. This role supports mechanical planning and helps carry designs from prototype to competition-ready hardware.",
  },
  {
    name: "Edward Titov",
    role: "Assistant Programming Lead",
    department: "Programming",
    bio: "Personal bio coming soon. This role supports software development, testing, documentation, and reliable robot behavior.",
  },
  {
    name: "To be announced",
    role: "Assistant Electrical Lead",
    department: "Electrical",
    bio: "This assistant role has not been filled yet. The profile will be added when MorTorq confirms the position.",
    pending: true,
  },
] as const;

export function LeadershipPage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader activePage="leadership" />

      <main id="main">
        <section
          className="leadership-hero"
          aria-labelledby="leadership-title"
          data-analytics-section="leadership_hero"
        >
          <div className="leadership-hero-grid" aria-hidden="true" />
          <div className="leadership-hero-mark" aria-hidden="true">
            1515
          </div>
          <div className="leadership-hero-inner">
            <p className="eyebrow">
              Student leadership <span>•</span> 2026–2027
            </p>
            <h1 id="leadership-title">
              The people
              <span>behind 1515.</span>
            </h1>
            <p>
              MorTorq is led by students who coordinate the people, systems,
              and technical work behind every build, match, and milestone.
            </p>
          </div>
        </section>

        <section
          className="section leadership-directory"
          aria-labelledby="directory-title"
          data-analytics-section="leadership_directory"
        >
          <div className="leadership-intro">
            <div>
              <div className="section-kicker">
                <span>01</span>
                Team leadership
              </div>
              <h2 id="directory-title">Meet the leads.</h2>
            </div>
            <p>
              Seven students guide MorTorq’s operations and technical
              departments, with the assistant electrical position still open.
              Portraits and personal biographies will be added as the team
              completes its 2026–2027 profiles.
            </p>
          </div>

          <div className="leadership-grid">
            {leaders.map((leader, index) => (
              <article
                className={`leader-card ${"pending" in leader ? "leader-card-pending" : ""}`}
                key={`${leader.department}-${leader.role}`}
                data-analytics-section={`leadership_profile_${leader.name.toLowerCase().replaceAll(" ", "_")}`}
              >
                <div className="leader-photo" aria-hidden="true">
                  <span className="leader-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Image
                    src="/images/mortorq-logo.png"
                    alt=""
                    width={274}
                    height={256}
                    sizes="(max-width: 560px) 70vw, (max-width: 860px) 38vw, 20vw"
                  />
                  <span className="leader-placeholder">
                    {"pending" in leader
                      ? "Profile to be confirmed"
                      : "Portrait coming soon"}
                  </span>
                </div>
                <div className="leader-copy">
                  <p className="leader-department">{leader.department}</p>
                  <h3>{leader.name}</h3>
                  <p className="leader-role">{leader.role}</p>
                  <p className="leader-bio">{leader.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
