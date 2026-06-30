"use client";

import { useEffect, useRef, useState } from "react";

export default function Testimonials() {
  const [inView, setInView] = useState(false);
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const testimonials = [
    {
      stars: "★★★★★",
      text: "Soban built a custom RAG system for our 50,000-document knowledge base. Response quality improved by 300% and our support team now spends 70% less time answering repetitive questions.",
      initials: "AL",
      author: "Alex Laurent",
      role: "CTO, DataStack Solutions",
    },
    {
      stars: "★★★★★",
      text: "The AI website generator Soban built for our agency was a game-changer. We went from 2-week builds to 2-hour deliveries. Our clients are blown away by the quality and speed.",
      initials: "MK",
      author: "Maria Kim",
      role: "Founder, PixelCraft Agency",
    },
    {
      stars: "★★★★★",
      text: "Soban's prompt engineering expertise is on another level. He took our clunky GPT integration and transformed it into a precision instrument. Accuracy went from 60% to 96% overnight.",
      initials: "JS",
      author: "Jordan Smith",
      role: "Product Lead, NexGen AI",
    },
    {
      stars: "★★★★★",
      text: "I hired Soban to build an AI workflow for our content team. In 3 weeks he delivered a system that now writes, edits, and publishes 500 pieces a month with minimal human involvement. Absolutely brilliant.",
      initials: "RP",
      author: "Rachel Patel",
      role: "VP Marketing, GrowthLab Inc.",
    },
    {
      stars: "★★★★★",
      text: "Working with Soban felt like having a senior AI co-founder on the team. He understood the business problem first, then engineered the perfect AI solution. Delivered on time, on budget, beyond expectations.",
      initials: "TN",
      author: "Tom Nakamura",
      role: "CEO, Launchpad Ventures",
    },
  ];

  const total = testimonials.length;

  // In-view animation trigger
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

  // Auto-play loop
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 5000);

    return () => clearInterval(timer);
  }, [total]);

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % total);
  };

  const goPrev = () => {
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  return (
    <section id="testimonials" ref={sectionRef} className="section testimonials" aria-label="Client testimonials">
      <div className="container">
        <div className={`section-header ${inView ? "visible" : ""}`}>
          <div className="section-tag">Testimonials</div>
          <h2 className="section-title">
            What Clients
            <br />
            <span className="gradient-text">Are Saying</span>
          </h2>
        </div>

        <div className="testimonials-track-wrapper">
          <div
            className="testimonials-track"
            ref={trackRef}
            aria-label="Client testimonials carousel"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
              transform: `translateX(-${current * 100}%)`,
              display: "flex",
              transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {testimonials.map((t, index) => (
              <article
                key={index}
                className="testimonial-card"
                style={{
                  flex: "0 0 100%",
                  opacity: current === index ? 1 : 0.4,
                  transition: "opacity 0.5s ease",
                }}
              >
                <div className="testimonial-stars" aria-label="5 stars">
                  {t.stars}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar" aria-hidden="true">
                    {t.initials}
                  </div>
                  <div className="author-info">
                    <strong>{t.author}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Slider controls */}
          <div className="carousel-controls">
            <button className="carousel-btn" onClick={goPrev} aria-label="Previous testimonial">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
            </button>
            <div className="carousel-dots" role="tablist" aria-label="Testimonial indicators">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`dot ${current === i ? "active" : ""}`}
                  onClick={() => setCurrent(i)}
                  role="tab"
                  aria-selected={current === i}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button className="carousel-btn" onClick={goNext} aria-label="Next testimonial">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
