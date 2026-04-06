
"use client";
import React, { useRef, useEffect, useState } from "react";

interface Item {
  title: string;
  color: string;
}

function Section7() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth);
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / sectionHeight, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const items: Item[] = [
    { title: "Elemento 1", color: "#b33b20" },
    { title: "Elemento 2", color: "#d4782f" },
    { title: "Elemento 3", color: "#2a6b4e" },
    { title: "Elemento 4", color: "#1e3a5f" },
    { title: "Elemento 5", color: "#6b2a6b" },
    { title: "Elemento 6", color: "#8b6914" },
    { title: "Elemento 7", color: "#b33b20" },
    { title: "Elemento 8", color: "#d4782f" },
    { title: "Elemento 9", color: "#2a6b4e" },
    { title: "Elemento 10", color: "#1e3a5f" },
    { title: "Elemento 11", color: "#6b2a6b" },
    { title: "Elemento 12", color: "#8b6914" },
  ];

  const trackWidth = items.length * 420;
  const maxTranslate = trackWidth - windowWidth + 80;
  const translateX = -maxTranslate + scrollProgress * maxTranslate;

  return (
    <section ref={sectionRef} className="hscroll-section">
      <div className="hscroll-sticky">
        <div
          ref={trackRef}
          className="hscroll-track"
          style={{ transform: `translateX(${translateX}px)` }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="hscroll-card"
              style={{ "--card-accent": item.color } as React.CSSProperties}
            >
              <div className="hscroll-card-inner">
                <span className="hscroll-card-number">0{i + 1}</span>
                <h3 className="hscroll-card-title">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Section7;
