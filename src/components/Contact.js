"use client";

import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  // Form states
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
    budget: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

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

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Reset simple check
    if (touched[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        if (name === "name" && value.trim() !== "") delete next.name;
        if (name === "email" && validateEmail(value)) delete next.email;
        if (name === "message" && value.trim() !== "") delete next.message;
        return next;
      });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const value = form[name];
    setErrors((prev) => {
      const next = { ...prev };
      if (name === "name" && value.trim() === "") next.name = true;
      if (name === "email" && !validateEmail(value)) next.email = true;
      if (name === "message" && value.trim() === "") next.message = true;
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const nextErrors = {};
    if (form.name.trim() === "") nextErrors.name = true;
    if (!validateEmail(form.email)) nextErrors.email = true;
    if (form.message.trim() === "") nextErrors.message = true;

    setErrors(nextErrors);
    setTouched({
      name: true,
      email: true,
      projectType: true,
      message: true,
      budget: true,
    });

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      // Simulation of API/EmailJS/Formspree call
      await new Promise((resolve) => setTimeout(resolve, 1800));

      setForm({
        name: "",
        email: "",
        projectType: "",
        message: "",
        budget: "",
      });
      setErrors({});
      setTouched({});
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="section contact" aria-label="Contact and hire Soban">
      <div className="container">
        <div className="contact-grid">
          {/* Left Info */}
          <div className={`contact-info ${inView ? "visible" : ""}`}>
            <div className="section-tag">Get In Touch</div>
            <h2 className="section-title">
              Let's Build Your
              <br />
              <span className="gradient-text">AI Solution</span>
            </h2>
            <p className="contact-desc">
              Have a project in mind? Whether you need a custom AI model, a prompt system, or full workflow automation — let's talk. I respond within 24 hours.
            </p>

            <div className="contact-methods">
              <a href="mailto:soban@email.com" className="contact-method" id="contact-email" aria-label="Email Soban">
                <div className="method-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <span className="method-label">Email</span>
                  <span className="method-value">soban@email.com</span>
                </div>
              </a>

              <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" class="contact-method" id="contact-whatsapp" aria-label="WhatsApp Soban">
                <div className="method-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                  </svg>
                </div>
                <div>
                  <span className="method-label">WhatsApp</span>
                  <span className="method-value">+92 300 1234567</span>
                </div>
              </a>

              <a href="https://linkedin.com/in/soban" target="_blank" rel="noopener noreferrer" class="contact-method" id="contact-linkedin" aria-label="LinkedIn profile">
                <div className="method-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <div>
                  <span className="method-label">LinkedIn</span>
                  <span className="method-value">linkedin.com/in/soban</span>
                </div>
              </a>
            </div>

            <div className="response-badge">
              <span className="badge-dot"></span>
              Usually responds within 24 hours
            </div>
          </div>

          {/* Right Form */}
          <div className={`contact-form-wrapper ${inView ? "visible" : ""}`}>
            <form id="contact-form" className="contact-form" onSubmit={handleSubmit} noValidate aria-label="Contact form">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.name ? "invalid" : touched.name ? "valid" : ""}
                  required
                  autoComplete="name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@company.com"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.email ? "invalid" : touched.email ? "valid" : ""}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="projectType">Project Type</label>
                <select
                  id="projectType"
                  name="projectType"
                  value={form.projectType}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select a service...
                  </option>
                  <option value="ai-model">Custom AI Model Development</option>
                  <option value="prompt-eng">Prompt Engineering System</option>
                  <option value="website-gen">AI Website Generator</option>
                  <option value="code-auto">Code Automation Tool</option>
                  <option value="workflow">Workflow Automation</option>
                  <option value="consulting">Strategy &amp; Consulting</option>
                  <option value="other">Other / Custom</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Project Description</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project, goals, and timeline..."
                  value={form.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.message ? "invalid" : touched.message ? "valid" : ""}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="budget">Budget Range</label>
                <select
                  id="budget"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select budget range...
                  </option>
                  <option value="500-1k">$500 – $1,000</option>
                  <option value="1k-5k">$1,000 – $5,000</option>
                  <option value="5k-15k">$5,000 – $15,000</option>
                  <option value="15k+">$15,000+</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary btn-full" id="submit-btn" disabled={status === "loading"}>
                <span id="submit-text">
                  {status === "loading" ? "Sending..." : "Send My Project Brief"}
                </span>
                {status !== "loading" && (
                  <svg id="submit-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                )}
                {status === "loading" && (
                  <svg id="submit-spinner" className="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.3" />
                    <path d="M12 3a9 9 0 019 9" />
                  </svg>
                )}
              </button>

              {status === "success" && (
                <p id="form-success" className="form-success" role="alert" aria-live="polite">
                  ✅ Message sent! I'll get back to you within 24 hours.
                </p>
              )}
              {status === "error" && (
                <p id="form-error" className="form-error" role="alert" aria-live="polite">
                  ❌ Please fill in all required fields.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
