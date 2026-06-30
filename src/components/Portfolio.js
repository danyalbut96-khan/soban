"use client";

import { useEffect, useRef, useState } from "react";

export default function Portfolio() {
  const [inView, setInView] = useState(false);
  const [filter, setFilter] = useState("all");
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
    if (window.matchMedia("(pointer: coarse)").matches) return;
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

  const filters = [
    { label: "All Projects", value: "all" },
    { label: "LLM Systems", value: "llm" },
    { label: "Automation", value: "automation" },
    { label: "Generators", value: "generator" },
  ];

  const projects = [
    {
      id: "project-gpt-engine",
      category: "llm",
      title: "Custom GPT Prompt Engine",
      desc: "A multi-layer prompt orchestration engine that dynamically injects context, enforces output formats, and chains multiple AI calls — achieving 94% task accuracy over raw GPT-4.",
      impact: ["⚡ 3x faster outputs", "📈 94% accuracy"],
      tags: ["GPT-4", "Python", "LLM"],
      classVal: "proj-1",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" />
          <path d="M8 12s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
        </svg>
      ),
    },
    {
      id: "project-website-gen",
      category: "generator",
      title: "AI Website Builder",
      desc: "A prompt-driven system that generates complete, styled, responsive websites from a single description — with custom branding, sections, and SEO baked in automatically.",
      impact: ["⚡ 30-min websites", "🎨 10+ templates"],
      tags: ["AI", "HTML/CSS", "LLM"],
      classVal: "proj-2",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      ),
    },
    {
      id: "project-code-gen",
      category: "automation",
      title: "Intelligent Code Generator",
      desc: "An AI-powered code generation system that writes production-ready boilerplate, REST APIs, database schemas, and unit tests from natural language specifications.",
      impact: ["⚡ 10x dev speed", "✅ Production ready"],
      tags: ["Codegen", "Python", "API"],
      classVal: "proj-3",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
    {
      id: "project-rag-system",
      category: "llm",
      title: "RAG Knowledge Base System",
      desc: "A Retrieval-Augmented Generation system that ingests company documents, PDFs, and internal wikis — enabling precise, hallucination-free AI answers grounded in real data.",
      impact: ["🧠 Zero hallucinations", "📄 10k+ docs indexed"],
      tags: ["RAG", "Embeddings", "Vector DB"],
      classVal: "proj-4",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        </svg>
      ),
    },
    {
      id: "project-workflow",
      category: "automation",
      title: "Multi-Agent Workflow System",
      desc: "An orchestration framework of specialized AI agents that handle research, writing, data analysis, and reporting autonomously — cutting manual effort by 80%.",
      impact: ["🤖 5 AI agents", "📉 80% time saved"],
      tags: ["Agents", "Automation", "API"],
      classVal: "proj-5",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
    },
    {
      id: "project-content-gen",
      category: "generator",
      title: "AI Content Generation Suite",
      desc: "A brand-aware content engine that generates SEO articles, social posts, product descriptions, and marketing copy — all calibrated to match a specific voice and tone profile.",
      impact: ["✍️ 500+ pieces/month", "🎯 Brand-consistent"],
      tags: ["GPT", "NLP", "Content"],
      classVal: "proj-6",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
      ),
    },
  ];

  const filteredProjects = projects.filter(
    (project) => filter === "all" || project.category === filter
  );

  return (
    <section id="portfolio" ref={sectionRef} className="section portfolio" aria-label="Portfolio and projects">
      <div className="container">
        <div className={`section-header ${inView ? "visible" : ""}`}>
          <div className="section-tag">My Work</div>
          <h2 className="section-title">
            AI Projects That
            <br />
            <span className="gradient-text">Deliver Results</span>
          </h2>
          <p className="section-subtitle">
            A curated selection of AI systems and tools I've engineered for real-world impact.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className={`portfolio-filters ${inView ? "visible" : ""}`} role="tablist" aria-label="Portfolio filter">
          {filters.map((f) => (
            <button
              key={f.value}
              className={`filter-btn ${filter === f.value ? "active" : ""}`}
              onClick={() => setFilter(f.value)}
              role="tab"
              aria-selected={filter === f.value}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="portfolio-grid" id="portfolio-grid">
          {filteredProjects.map((project, index) => (
            <article
              key={project.id}
              className={`project-card ${inView ? "visible" : ""}`}
              data-category={project.category}
              tabIndex={0}
              onMouseMove={(e) => handleTilt(e, e.currentTarget)}
              onMouseLeave={(e) => resetTilt(e.currentTarget)}
              style={{ transitionDelay: `${0.05 + index * 0.07}s` }}
            >
              <div className="project-image">
                <div className={`project-img-placeholder ${project.classVal}`} aria-hidden="true">
                  {project.icon}
                </div>
                <div className="project-overlay">
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span className="proj-tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>
                <div className="project-impact">
                  {project.impact.map((imp) => (
                    <span className="impact-badge" key={imp}>
                      {imp}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
