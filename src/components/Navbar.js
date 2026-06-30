"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // IntersectionObserver to detect active section
    const sections = document.querySelectorAll("section[id]");
    const observerOptions = {
      rootMargin: "-40% 0px -40% 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((sec) => observer.observe(sec));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((sec) => observer.unobserve(sec));
    };
  }, []);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    setMenuOpen(false);
    document.body.style.overflow = "";

    const target = document.getElementById(targetId);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const toggleMenu = () => {
    const nextState = !menuOpen;
    setMenuOpen(nextState);
    document.body.style.overflow = nextState ? "hidden" : "";
  };

  const navLinks = [
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Portfolio", id: "portfolio" },
    { label: "Why Me", id: "why-me" },
    { label: "Testimonials", id: "testimonials" },
  ];

  return (
    <nav id="navbar" className={`navbar ${scrolled ? "scrolled" : ""}`} role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        <a href="#hero" className="nav-logo" aria-label="Soban - Home" onClick={(e) => handleLinkClick(e, "hero")}>
          <span className="logo-text">Soban</span>
          <span className="logo-dot">.</span>
        </a>
        <button
          className={`nav-toggle ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <ul className={`nav-links ${menuOpen ? "open" : ""}`} role="list">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`nav-link ${activeSection === link.id ? "active-nav" : ""}`}
                onClick={(e) => handleLinkClick(e, link.id)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className={`nav-link nav-cta ${activeSection === "contact" ? "active-nav" : ""}`}
              onClick={(e) => handleLinkClick(e, "contact")}
            >
              Hire Me
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
