"use client";

import { useEffect, useRef, useState } from "react";

export default function Services() {
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

  const handleTilt = (e, card) => {
    if (window.matchMedia("(pointer: coarse)").matches) return; // skip on touch devices
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const tiltX = dy * -5;
    const tiltY = dx * 5;
    card.style.transform = `translateY(-6px) perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  };

  const resetTilt = (card) => {
    card.style.transform = "";
  };

  const handleCTA = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const services = [
    {
      num: "01",
      title: "Custom AI Model Development",
      desc: "Design and deploy fine-tuned AI models tailored to your domain — whether for text generation, classification, recommendation, or intelligent decision making.",
      features: ["Fine-tuned LLMs for your domain", "RAG-powered knowledge bases", "Model evaluation & optimization"],
      tag: "High Impact",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
    },
    {
      num: "02",
      title: "Prompt Engineering Systems",
      desc: "Architect precision prompt pipelines that extract maximum value from any AI model — with chain-of-thought reasoning, few-shot structures, and dynamic context injection.",
      features: ["Chain-of-thought prompt design", "Multi-step reasoning pipelines", "Prompt version control systems"],
      tag: "Core Expertise",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
    {
      num: "03",
      title: "AI Website Generators",
      desc: "Custom AI-powered website generators that create complete, responsive web pages from a single prompt — saving hours of design and development time.",
      features: ["Prompt-to-HTML generation", "Responsive design output", "Brand-aware generation"],
      tag: "Innovative",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      ),
    },
    {
      num: "04",
      title: "Code Automation Tools",
      desc: "AI-driven code generation systems that auto-write boilerplate, generate APIs, create tests, and accelerate your software development lifecycle by 10x.",
      features: ["Auto-code generation engines", "API scaffolding automation", "Intelligent test generation"],
      tag: "Efficiency",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
        </svg>
      ),
    },
    {
      num: "05",
      title: "AI Workflow Automation",
      desc: "End-to-end AI pipelines that automate repetitive business processes — from data ingestion to intelligent output, cutting operational costs dramatically.",
      features: ["Business process automation", "Multi-agent orchestration", "Integration with existing tools"],
      tag: "Scale",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
    },
  ];

  return (
    <section id="services" ref={sectionRef} className="section services" aria-label="Services offered">
      <div className="container">
        <div className={`section-header ${inView ? "visible" : ""}`}>
          <div className="section-tag">What I Offer</div>
          <h2 class="section-title">
            Premium <span className="gradient-text">AI Services</span>
            <br />
            Built for Impact
          </h2>
          <p className="section-subtitle">
            Every service is crafted with precision — designed to give your business a measurable AI advantage.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <article
              key={service.num}
              className={`service-card ${inView ? "visible" : ""}`}
              tabIndex={0}
              aria-label={service.title}
              onMouseMove={(e) => handleTilt(e, e.currentTarget)}
              onMouseLeave={(e) => resetTilt(e.currentTarget)}
              style={{ transitionDelay: `${0.05 + index * 0.07}s` }}
            >
              <div className="service-icon" aria-hidden="true">
                {service.icon}
              </div>
              <div className="service-number" aria-hidden="true">
                {service.num}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
              <ul className="service-features" role="list">
                {service.features.map((feat) => (
                  <li key={feat}>{feat}</li>
                ))}
              </ul>
              <div className="service-tag">{service.tag}</div>
            </article>
          ))}

          {/* Strategy Card */}
          <article
            className={`service-card service-card-cta ${inView ? "visible" : ""}`}
            tabIndex={0}
            aria-label="AI Strategy Consulting"
            onMouseMove={(e) => handleTilt(e, e.currentTarget)}
            onMouseLeave={(e) => resetTilt(e.currentTarget)}
            style={{ transitionDelay: "0.4s" }}
          >
            <div className="service-cta-inner">
              <div className="service-icon" aria-hidden="true">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
              </div>
              <h3 className="service-title">AI Strategy &amp; Consulting</h3>
              <p className="service-desc">
                Not sure where AI fits your business? I'll map out a custom AI roadmap, identify high-ROI automation opportunities, and guide implementation from scratch.
              </p>
              <a href="#contact" className="btn btn-primary" id="service-consult-btn" onClick={(e) => handleCTA(e, "contact")}>
                <span>Get a Free Consultation</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
