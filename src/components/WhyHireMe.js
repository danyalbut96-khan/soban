"use client";

import { useEffect, useRef, useState } from "react";

export default function WhyHireMe() {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const handleCTA = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const cards = [
    {
      icon: "🎯",
      title: "100% Custom Solutions",
      desc: "No templates, no shortcuts. Every AI system is built from the ground up to fit your exact business logic, data, and goals.",
    },
    {
      icon: "🧠",
      title: "Deep Prompt Expertise",
      desc: "I understand how LLMs think at an architectural level — enabling me to craft prompts that consistently produce precise, reliable, and powerful outputs.",
    },
    {
      icon: "⚡",
      title: "Speed Without Compromise",
      desc: "Rapid prototyping with production-grade quality. You get working AI solutions fast — without sacrificing reliability or scalability.",
    },
    {
      icon: "📈",
      title: "Results-Driven Approach",
      desc: "Every project has a clear success metric. I optimize relentlessly until the AI delivers measurable value — not just working code.",
    },
    {
      icon: "🔗",
      title: "End-to-End Delivery",
      desc: "From concept to deployment. I handle architecture, development, testing, and integration — one person, zero hand-off chaos.",
    },
    {
      icon: "🚀",
      title: "Always Cutting-Edge",
      desc: "I stay ahead of every major AI breakthrough — from GPT-4o to Claude 3.5, from RAG to multi-agent systems — so you always get the best available tech.",
    },
  ];

  return (
    <section id="why-me" ref={sectionRef} className="section why-me" aria-label="Why hire Soban">
      <div className="container">
        <div className="why-inner">
          <div className={`section-header ${inView ? "visible" : ""}`}>
            <div className="section-tag">Why Choose Me</div>
            <h2 className="section-title">
              The Competitive Edge
              <br />
              <span className="gradient-text">You've Been Missing</span>
            </h2>
            <p className="section-subtitle">I don't just build AI tools — I engineer competitive advantages.</p>
          </div>

          <div className="why-grid">
            {cards.map((card, index) => (
              <div
                key={card.title}
                className={`why-card ${inView ? "visible" : ""}`}
                style={{ transitionDelay: `${0.05 + index * 0.07}s` }}
              >
                <div className="why-icon" aria-hidden="true">
                  {card.icon}
                </div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Big CTA Banner */}
          <div className={`why-cta ${inView ? "visible" : ""}`}>
            <p>Ready to give your business an AI advantage?</p>
            <a href="#contact" className="btn btn-primary btn-large" id="why-cta-btn" onClick={(e) => handleCTA(e, "contact")}>
              <span>Let's Build Something Powerful</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
