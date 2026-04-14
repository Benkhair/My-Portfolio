import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Code } from "lucide-react";

function CardCarousel({ projects = [], palette, isDark, onSelectProject }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const lastXRef = useRef(0);

  const count = projects.length;

  useEffect(() => {
    setActiveIndex(0);
  }, [count]);

  useEffect(() => {
    const updateViewport = () => setIsMobile(window.innerWidth < 768);
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    if (isHovered || isMobile || count < 2) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % count);
    }, 4800);

    return () => window.clearInterval(timer);
  }, [count, isHovered, isMobile]);

  useEffect(() => {
    if (count < 2) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => (current - 1 + count) % count);
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current + 1) % count);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [count]);

  const cardWidth = isMobile ? 248 : 340;
  const cardHeight = isMobile ? 342 : 430;
  const sideSpacing = isMobile ? 96 : 250;
  const tilt = isMobile ? 16 : 42;

  const normalizedCards = useMemo(() => {
    return projects.map((project, index) => {
      const rawOffset = (index - activeIndex + count) % count;
      const offset = rawOffset > count / 2 ? rawOffset - count : rawOffset;
      const visible = Math.abs(offset) <= 1;

      return {
        project,
        index,
        offset,
        visible,
      };
    });
  }, [projects, activeIndex, count]);

  if (!count) return null;

  const rotatePrev = () => {
    if (count < 2) return;
    setActiveIndex((current) => (current - 1 + count) % count);
  };

  const rotateNext = () => {
    if (count < 2) return;
    setActiveIndex((current) => (current + 1) % count);
  };

  const handlePointerDown = (event) => {
    draggingRef.current = true;
    startXRef.current = event.clientX;
    lastXRef.current = event.clientX;
  };

  const handlePointerMove = (event) => {
    if (!draggingRef.current) return;
    lastXRef.current = event.clientX;
  };

  const handlePointerUp = () => {
    if (!draggingRef.current) return;
    const delta = lastXRef.current - startXRef.current;
    draggingRef.current = false;

    if (Math.abs(delta) > 40) {
      if (delta < 0) rotateNext();
      else rotatePrev();
    }
  };

  return (
    <section
      style={{
        position: "relative",
        padding: isMobile ? "1.25rem" : "1.5rem",
        borderRadius: "38px",
        background: palette.panel,
        border: `1px solid ${palette.border}`,
        boxShadow: palette.shadow,
        overflow: "hidden",
      }}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: isMobile ? "1rem" : "1.4rem",
        }}
      >
        <p
          style={{
            margin: 0,
            color: palette.accent,
            fontSize: isMobile ? "1.15rem" : "1.55rem",
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            lineHeight: 1.1,
          }}
        >
          PROJECT SHOWCASE
        </p>
      </div>

      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          position: "relative",
          height: isMobile ? "31rem" : "34rem",
          perspective: "1800px",
          transformStyle: "preserve-3d",
          userSelect: "none",
          touchAction: "pan-y",
        }}
      >
        {normalizedCards.map(({ project, index, offset, visible }) => {
          if (!visible) return null;
          const isCenter = offset === 0;
          const x = offset * sideSpacing;

          return (
            <motion.button
              key={project.title}
              type="button"
              onClick={() => {
                if (isCenter) {
                  onSelectProject?.(project);
                } else {
                  setActiveIndex(index);
                }
              }}
              initial={false}
              animate={{
                x,
                scale: isCenter ? 1.08 : 0.84,
                rotateY: isCenter ? 0 : offset < 0 ? tilt : -tilt,
                opacity: isCenter ? 1 : 0.5,
                filter: isCenter ? "brightness(1.06) saturate(1.05)" : "brightness(0.9) saturate(0.88)",
                y: isCenter ? 0 : 18,
              }}
              transition={{ type: "spring", stiffness: 220, damping: 24, mass: 0.8 }}
              whileHover={{ scale: isCenter ? 1.09 : 0.86, y: isCenter ? -4 : 16 }}
              whileTap={{ scale: 0.98 }}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: `${cardWidth}px`,
                minHeight: `${cardHeight}px`,
                marginLeft: `-${cardWidth / 2}px`,
                marginTop: `-${cardHeight / 2}px`,
                borderRadius: "30px",
                border: `1px solid ${isCenter ? project.color : palette.border}`,
                background: palette.panelStrong,
                color: palette.text,
                overflow: "hidden",
                cursor: isCenter ? "pointer" : "grab",
                outline: "none",
                transformStyle: "preserve-3d",
                boxShadow: isCenter
                  ? `0 30px 80px ${project.color}30`
                  : `0 16px 40px rgba(0, 0, 0, 0.16)`,
                zIndex: isCenter ? 3 : 2,
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
              aria-label={`Open ${project.title}`}
            >
              <div
                style={{
                  height: "58%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: `linear-gradient(135deg, ${project.color}22, ${project.color}08)`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  style={{
                    width: "min(56%, 9rem)",
                    aspectRatio: "1 / 1",
                    borderRadius: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: project.color,
                    border: `1px solid ${project.color}33`,
                    background: `${project.color}12`,
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
                    backdropFilter: "blur(12px)",
                  }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <project.icon size={50} strokeWidth={1.6} />
                </motion.div>
              </div>

              <div
                style={{
                  padding: isMobile ? "0.95rem 1rem 1rem" : "1.05rem 1.1rem 1.15rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.9rem",
                  height: "42%",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.75rem" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      borderRadius: "999px",
                      padding: "0.42rem 0.75rem",
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      fontWeight: 700,
                      color: isDark ? project.color : project.color,
                      background: isDark ? `${project.color}14` : `${project.color}22`,
                      border: `1px solid ${project.color}40`,
                    }}
                  >
                    {project.category}
                  </span>
                  <span style={{ color: palette.subText, fontSize: "0.8rem", fontWeight: 600 }}>
                    {isCenter ? "Click to view" : offset < 0 ? "Rotate left" : "Rotate right"}
                  </span>
                </div>

                <div style={{ flex: 1, overflow: "hidden" }}>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: isMobile ? "1.08rem" : "1.2rem",
                      lineHeight: 1.25,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    style={{
                      margin: "0.65rem 0 0",
                      color: palette.subText,
                      lineHeight: 1.6,
                      fontSize: isMobile ? "0.86rem" : "0.95rem",
                    }}
                  >
                    {project.description}
                  </p>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "0.42rem 0.7rem",
                        borderRadius: "999px",
                        fontSize: "0.74rem",
                        fontWeight: 600,
                        color: palette.accent,
                        background: palette.chipBg,
                        border: `1px solid ${palette.border}`,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <span style={{ color: palette.subText, fontSize: "0.82rem", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                    <Code size={14} />
                    {isCenter ? "Open project" : "Tap to rotate"}
                  </span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.6rem",
          marginTop: isMobile ? "0.35rem" : "0.6rem",
          marginBottom: "1rem",
          flexWrap: "wrap",
        }}
      >
        {projects.map((project, index) => (
          <button
            key={project.title}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to ${project.title}`}
            style={{
              width: activeIndex === index ? "2rem" : "0.55rem",
              height: "0.55rem",
              borderRadius: "999px",
              border: "none",
              background: activeIndex === index ? project.color : palette.border,
              cursor: "pointer",
              transition: "all 0.28s ease",
              boxShadow: activeIndex === index ? `0 0 12px ${project.color}55` : "none",
            }}
          />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.75rem",
          flexWrap: "wrap",
          flexDirection: isMobile ? "column" : "row",
          width: "100%",
        }}
      >
        <motion.button
          type="button"
          onClick={rotatePrev}
          whileHover={{ y: -2, scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          style={{
            border: `1px solid ${palette.border}`,
            background: palette.panelStrong,
            color: palette.text,
            borderRadius: "999px",
            padding: isMobile ? "0.8rem 1rem" : "0.75rem 1rem",
            minWidth: isMobile ? "100%" : "7.4rem",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.45rem",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          <ChevronLeft size={16} /> Prev
        </motion.button>
        <motion.button
          type="button"
          onClick={rotateNext}
          whileHover={{ y: -2, scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          style={{
            border: `1px solid ${palette.border}`,
            background: palette.panelStrong,
            color: palette.text,
            borderRadius: "999px",
            padding: isMobile ? "0.8rem 1rem" : "0.75rem 1rem",
            minWidth: isMobile ? "100%" : "7.4rem",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.45rem",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Next <ChevronRight size={16} />
        </motion.button>
      </div>
    </section>
  );
}

export default CardCarousel;
