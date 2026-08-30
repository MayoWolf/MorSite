"use client";

import {
  ArrowRight,
  AtSign,
  ChevronRight,
  ExternalLink,
  Mail,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Season", href: "/#season" },
  { label: "Impact", href: "/#impact" },
  { label: "Media", href: "/#media" },
  { label: "Leadership", href: "/leadership" },
] as const;

type SiteHeaderProps = {
  activePage?: "home" | "leadership";
};

export function SiteHeader({ activePage = "home" }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          className="brand"
          href="/"
          aria-label="MorTorq home"
          data-analytics-action="navigation"
          data-analytics-label="home_brand"
          data-analytics-location="header"
        >
          <span className="brand-mark">
            <Image
              src="/images/mortorq-logo.png"
              alt=""
              width={274}
              height={256}
            />
          </span>
          <span className="brand-copy">
            <strong>MorTorq</strong>
            <small>FRC Team 1515</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              aria-current={
                activePage === "leadership" && item.href === "/leadership"
                  ? "page"
                  : undefined
              }
              key={item.label}
              href={item.href}
              data-analytics-action="navigation"
              data-analytics-label={item.label.toLowerCase()}
              data-analytics-location="desktop_header"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          className="button button-small button-light header-cta"
          href="/#join"
          data-analytics-action="join_interest"
          data-analytics-label="join_the_team"
          data-analytics-location="desktop_header"
        >
          Join the team
          <ArrowRight aria-hidden="true" size={16} />
        </Link>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          data-analytics-action="mobile_menu_toggle"
          data-analytics-label={menuOpen ? "close_menu" : "open_menu"}
          data-analytics-location="header"
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {menuOpen && (
        <nav
          className="mobile-nav"
          id="mobile-navigation"
          aria-label="Mobile navigation"
        >
          {navItems.map((item) => (
            <Link
              aria-current={
                activePage === "leadership" && item.href === "/leadership"
                  ? "page"
                  : undefined
              }
              key={item.label}
              href={item.href}
              data-analytics-action="navigation"
              data-analytics-label={item.label.toLowerCase()}
              data-analytics-location="mobile_menu"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
              <ChevronRight aria-hidden="true" size={18} />
            </Link>
          ))}
          <Link
            href="/#join"
            data-analytics-action="join_interest"
            data-analytics-label="join_or_sponsor"
            data-analytics-location="mobile_menu"
            onClick={() => setMenuOpen(false)}
          >
            Join or sponsor us
            <ChevronRight aria-hidden="true" size={18} />
          </Link>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link
            className="brand brand-footer"
            href="/"
            aria-label="MorTorq home"
            data-analytics-action="navigation"
            data-analytics-label="home_brand"
            data-analytics-location="footer"
          >
            <span className="brand-mark">
              <Image
                src="/images/mortorq-logo.png"
                alt=""
                width={274}
                height={256}
              />
            </span>
            <span className="brand-copy">
              <strong>MorTorq</strong>
              <small>FRC Team 1515</small>
            </span>
          </Link>
          <p>
            Building robots—and the people who build the future—at Beverly
            Hills High School.
          </p>
        </div>

        <div className="footer-column">
          <h3>Navigate</h3>
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              data-analytics-action="navigation"
              data-analytics-label={item.label.toLowerCase()}
              data-analytics-location="footer"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#join"
            data-analytics-action="join_interest"
            data-analytics-label="join_us"
            data-analytics-location="footer"
          >
            Join us
          </Link>
        </div>

        <div className="footer-column footer-contact">
          <h3>Connect</h3>
          <a
            href="mailto:1515mortorq@gmail.com"
            data-analytics-action="contact"
            data-analytics-label="email"
            data-analytics-location="footer"
          >
            <Mail aria-hidden="true" size={16} />
            1515mortorq@gmail.com
          </a>
          <a
            href="https://maps.google.com/?q=Beverly+Hills+High+School+241+S+Moreno+Dr+Beverly+Hills+CA+90212"
            target="_blank"
            rel="noreferrer"
            data-analytics-action="outbound_link"
            data-analytics-label="school_map"
            data-analytics-location="footer"
          >
            <MapPin aria-hidden="true" size={16} />
            241 S. Moreno Dr, Beverly Hills
          </a>
          <a
            href="https://www.instagram.com/frc1515/"
            target="_blank"
            rel="noreferrer"
            data-analytics-action="social_link"
            data-analytics-label="instagram"
            data-analytics-location="footer"
          >
            <AtSign aria-hidden="true" size={16} />
            @frc1515
          </a>
        </div>

        <div className="footer-column">
          <h3>Competition</h3>
          <a
            href="https://www.thebluealliance.com/team/1515"
            target="_blank"
            rel="noreferrer"
            data-analytics-action="outbound_link"
            data-analytics-label="the_blue_alliance"
            data-analytics-location="footer"
          >
            The Blue Alliance
            <ExternalLink aria-hidden="true" size={14} />
          </a>
          <a
            href="https://frc-events.firstinspires.org/2026/team/1515"
            target="_blank"
            rel="noreferrer"
            data-analytics-action="outbound_link"
            data-analytics-label="first_event_results"
            data-analytics-location="footer"
          >
            FIRST Event Results
            <ExternalLink aria-hidden="true" size={14} />
          </a>
          <a
            href="https://www.firstinspires.org/programs/frc/"
            target="_blank"
            rel="noreferrer"
            data-analytics-action="outbound_link"
            data-analytics-label="about_frc"
            data-analytics-location="footer"
          >
            About FRC
            <ExternalLink aria-hidden="true" size={14} />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 MorTorq · FRC Team 1515</span>
        <span>Student-led in Beverly Hills, California</span>
      </div>
    </footer>
  );
}
