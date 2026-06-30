"use client";

import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const [stats, setStats] = useState({ projects: 0, clients: 0, experience: 0 });
  const [hasCounted, setHasCounted] = useState(false);

  // 1. Particle System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles = [];
    let animFrame;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    function resize() {
      if (!canvas) return;
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function createParticle() {
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.5 + 0.1,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        pulse: Math.random() * Math.PI * 2,
      };
    }

    particles = Array.from({ length: 120 }, createParticle);

    function draw() {
      ctx.clearRect(0, 0, W, H);

      particles.forEach((p) => {
        p.pulse += 0.015;
        p.alpha = 0.1 + Math.abs(Math.sin(p.pulse)) * 0.35;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${p.alpha})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animFrame = requestAnimationFrame(draw);
    }

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Stop/start particles based on hero visibility
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!animFrame) draw();
      } else {
        cancelAnimationFrame(animFrame);
        animFrame = null;
      }
    });

    if (heroRef.current) observer.observe(heroRef.current);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", handleResize);
      if (heroRef.current) observer.unobserve(heroRef.current);
    };
  }, []);

  // 2. Stats Count-Up
  useEffect(() => {
    if (hasCounted) return;

    const targets = { projects: 50, clients: 30, experience: 5 };
    const duration = 1800;

    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasCounted(true);
            let start = null;

            function step(ts) {
              if (!start) start = ts;
              const progress = Math.min((ts - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic

              setStats({
                projects: Math.floor(eased * targets.projects),
                clients: Math.floor(eased * targets.clients),
                experience: Math.floor(eased * targets.experience),
              });

              if (progress < 1) {
                requestAnimationFrame(step);
              } else {
                setStats(targets);
              }
            }

            requestAnimationFrame(step);
            countObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    const statsElement = document.querySelector(".hero-stats");
    if (statsElement) countObserver.observe(statsElement);

    return () => {
      if (statsElement) countObserver.unobserve(statsElement);
    };
  }, [hasCounted]);

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
    <section id="hero" ref={heroRef} className="hero" aria-label="Hero section">
      <div className="hero-grid" aria-hidden="true"></div>
      <div className="orb orb-1" aria-hidden="true"></div>
      <div className="orb orb-2" aria-hidden="true"></div>
      <div className="orb orb-3" aria-hidden="true"></div>
      <canvas id="particle-canvas" ref={canvasRef} aria-hidden="true"></canvas>

      <div className="hero-content">
        <div className="hero-badge" aria-label="Available for work">
          <span className="badge-dot"></span>
          Available for Projects
        </div>
        <h1 className="hero-headline">
          I Build <span className="gradient-text">AI Systems</span>
          <br />
          That Work For You
        </h1>
        <p className="hero-sub">
          AI Engineer · Prompt Expert · AI Designer
          <br />
          Turning complex automation into elegant, high-impact AI solutions for startups &amp; businesses.
        </p>
        <div className="hero-stats" aria-label="Key statistics">
          <div className="stat">
            <span className="stat-num">{stats.projects}</span>
            <span className="stat-plus">+</span>
            <span className="stat-label">AI Projects</span>
          </div>
          <div className="stat-divider" aria-hidden="true"></div>
          <div className="stat">
            <span className="stat-num">{stats.clients}</span>
            <span className="stat-plus">+</span>
            <span className="stat-label">Clients Served</span>
          </div>
          <div className="stat-divider" aria-hidden="true"></div>
          <div className="stat">
            <span className="stat-num">{stats.experience}</span>
            <span className="stat-plus">+</span>
            <span className="stat-label">Years Experience</span>
          </div>
        </div>
        <div className="hero-actions">
          <a href="#contact" className="btn btn-primary" id="hero-hire-btn" onClick={(e) => handleCTA(e, "contact")}>
            <span>Hire Me</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#portfolio" className="btn btn-ghost" id="hero-work-btn" onClick={(e) => handleCTA(e, "portfolio")}>
            <span>View My Work</span>
          </a>
        </div>
      </div>

      <div className="scroll-indicator" aria-hidden="true">
        <div className="scroll-line"></div>
        <span>Scroll</span>
      </div>
    </section>
  );
}
