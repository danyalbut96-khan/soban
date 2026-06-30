"use client";

import { useEffect, useRef, useState } from "react";

export default function About() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const skills = [
    { name: "Prompt Engineering", value: 98 },
    { name: "AI Model Development", value: 92 },
    { name: "Workflow Automation", value: 95 },
    { name: "AI Tool Design", value: 90 },
  ];

  const handleCTA = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section id="about" ref={sectionRef} className="section about" aria-label="About Soban">
      <div className="container">
        <div className="about-grid">
          {/* Left Visual */}
          <div className={`about-visual ${inView ? "visible" : ""}`}>
            <div className="about-image-wrapper">
              <div className="about-image-bg"></div>
              <div className="about-avatar" aria-label="Soban's profile">
                <div className="avatar-initials">S</div>
              </div>
              <div className="skill-chip chip-1">🤖 LLM Expert</div>
              <div className="skill-chip chip-2">⚡ Automation</div>
              <div className="skill-chip chip-3">🎨 AI Design</div>
              <div className="skill-chip chip-4">💻 Prompt Eng.</div>
            </div>
          </div>

          {/* Right Content */}
          <div className={`about-content ${inView ? "visible" : ""}`}>
            <div className="section-tag">About Me</div>
            <h2 className="section-title">
              Turning AI Complexity Into
              <br />
              <span className="gradient-text">Business Advantage</span>
            </h2>
            <p className="about-text">
              I'm <strong>Soban</strong> — an AI Engineer and Prompt Engineering specialist who transforms 
              cutting-edge artificial intelligence into practical tools that drive real business results. 
              With deep expertise in large language models, prompt architecture, and custom AI system design, 
              I help startups and enterprises harness the true power of AI.
            </p>
            <p className="about-text">
              My work spans from designing intelligent prompt pipelines and custom GPT systems to building 
              full-stack AI applications, code automation tools, and website generators — all engineered for 
              maximum efficiency and impact.
            </p>

            {/* Skills Progress Bars */}
            <div className="skills-list" role="list">
              {skills.map((skill) => (
                <div className="skill-item" key={skill.name} role="listitem">
                  <span className="skill-name">{skill.name}</span>
                  <div className="skill-bar" aria-label={`${skill.name} - ${skill.value}%`}>
                    <div
                      className="skill-fill"
                      style={{ width: inView ? `${skill.value}%` : "0%" }}
                    ></div>
                  </div>
                  <span className="skill-pct">{skill.value}%</span>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="btn btn-primary mt-8"
              id="about-cta-btn"
              onClick={(e) => handleCTA(e, "contact")}
            >
              <span>Start a Project</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
