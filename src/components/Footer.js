"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <a href="#hero" className="nav-logo" aria-label="Soban - Back to top" onClick={(e) => handleLinkClick(e, "hero")}>
              <span className="logo-text">Soban</span>
              <span className="logo-dot">.</span>
            </a>
            <p>AI Engineer · Prompt Expert · AI Designer</p>
            <p className="footer-tagline">Building the AI systems of tomorrow, today.</p>
          </div>
          <nav className="footer-links" aria-label="Footer navigation">
            <a href="#about" onClick={(e) => handleLinkClick(e, "about")}>About</a>
            <a href="#services" onClick={(e) => handleLinkClick(e, "services")}>Services</a>
            <a href="#portfolio" onClick={(e) => handleLinkClick(e, "portfolio")}>Portfolio</a>
            <a href="#why-me" onClick={(e) => handleLinkClick(e, "why-me")}>Why Me</a>
            <a href="#testimonials" onClick={(e) => handleLinkClick(e, "testimonials")}>Testimonials</a>
            <a href="#contact" onClick={(e) => handleLinkClick(e, "contact")}>Contact</a>
          </nav>
          <div className="footer-social" aria-label="Social media links">
            {/* LinkedIn */}
            <a href="https://linkedin.com/in/soban" target="_blank" rel="noopener noreferrer" className="social-link" id="footer-linkedin" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            {/* Twitter / X */}
            <a href="https://twitter.com/soban" target="_blank" rel="noopener noreferrer" className="social-link" id="footer-twitter" aria-label="Twitter / X">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            {/* GitHub */}
            <a href="https://github.com/soban" target="_blank" rel="noopener noreferrer" className="social-link" id="footer-github" aria-label="GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
              </svg>
            </a>
            {/* Upwork */}
            <a href="https://upwork.com/freelancers/soban" target="_blank" rel="noopener noreferrer" className="social-link" id="footer-upwork" aria-label="Upwork profile">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
              </svg>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {year} Soban. All rights reserved. Built with precision &amp; purpose.</p>
          <p className="footer-built">Crafted by Soban · AI Engineer</p>
        </div>
      </div>
    </footer>
  );
}
