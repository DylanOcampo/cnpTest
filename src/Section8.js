
import { useEffect, useRef } from "react";

function Section8() {
  const sectionRef = useRef(null);
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      [leftPupilRef, rightPupilRef].forEach((pupilRef) => {
        const pupil = pupilRef.current;
        if (!pupil) return;

        const eye = pupil.parentElement;
        const rect = eye.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        const dx = e.clientX - eyeCenterX;
        const dy = e.clientY - eyeCenterY;
        const angle = Math.atan2(dy, dx);
        const dist = Math.min(Math.hypot(dx, dy) / 8, eye.offsetWidth * 0.22);

        pupil.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#1e1b18",
        gap: "2rem",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <h2
        style={{
          color: "#ffe6c3",
          fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          textAlign: "center",
          textShadow: "0 4px 12px rgba(0,0,0,0.5)",
          margin: 0,
        }}
      >
        Te estamos observando
      </h2>

      <div style={{ display: "flex", gap: "clamp(2rem, 6vw, 5rem)" }}>
        {/* Left eye */}
        <div
          style={{
            width: "clamp(100px, 18vw, 180px)",
            height: "clamp(100px, 18vw, 180px)",
            background: "#fff",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow:
              "inset 0 4px 12px rgba(0,0,0,0.2), 0 0 40px rgba(255,255,255,0.15)",
          }}
        >
          <div
            ref={leftPupilRef}
            style={{
              width: "40%",
              height: "40%",
              background: "radial-gradient(circle at 38% 38%, #4a2c0a, #1e1b18)",
              borderRadius: "50%",
              position: "relative",
              transition: "transform 0.08s ease-out",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "30%",
                height: "30%",
                background: "#fff",
                borderRadius: "50%",
                top: "18%",
                left: "22%",
              }}
            />
          </div>
        </div>

        {/* Right eye */}
        <div
          style={{
            width: "clamp(100px, 18vw, 180px)",
            height: "clamp(100px, 18vw, 180px)",
            background: "#fff",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow:
              "inset 0 4px 12px rgba(0,0,0,0.2), 0 0 40px rgba(255,255,255,0.15)",
          }}
        >
          <div
            ref={rightPupilRef}
            style={{
              width: "40%",
              height: "40%",
              background: "radial-gradient(circle at 38% 38%, #4a2c0a, #1e1b18)",
              borderRadius: "50%",
              position: "relative",
              transition: "transform 0.08s ease-out",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "30%",
                height: "30%",
                background: "#fff",
                borderRadius: "50%",
                top: "18%",
                left: "22%",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Section8;
