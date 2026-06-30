"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    // Skip on touch/coarse pointer devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const glow = glowRef.current;
    if (!glow) return;

    let mx = 0, my = 0, cx = 0, cy = 0;
    let rafId;

    const handleMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });

    function tick() {
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      if (glow) {
        glow.style.left = cx + "px";
        glow.style.top = cy + "px";
      }
      rafId = requestAnimationFrame(tick);
    }

    tick();

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      style={{
        position: "fixed",
        pointerEvents: "none",
        zIndex: 9999,
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
        transform: "translate(-50%, -50%)",
        transition: "opacity 0.4s",
        willChange: "left, top",
        left: "-9999px",
        top: "-9999px",
      }}
      aria-hidden="true"
    />
  );
}
