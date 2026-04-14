import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import ThemeTransition from "./ThemeTransition";
import { getTheme } from "../theme";
import { Moon, Sun, Code, GitBranch, Briefcase } from "lucide-react";

function Header({ theme, setTheme }) {
  const isDark = theme === "dark";
  const colors = getTheme(isDark);

  const [animating, setAnimating] = useState(false);
  const [compact, setCompact] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setCompact(window.scrollY > 24);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggle = () => {
    setAnimating(true);
    requestAnimationFrame(() => {
      setTheme(isDark ? "light" : "dark");
    });
    setTimeout(() => {
      setAnimating(false);
    }, 350);
  };

  const palette = isDark
    ? {
        text: "#f4efe8",
        subText: "#b8b2aa",
        panel: "rgba(24, 29, 34, 0.72)",
        panelStrong: "rgba(29, 35, 40, 0.9)",
        border: "rgba(234, 226, 213, 0.12)",
        accent: "#9db6a3",
        accentSoft: "#6e8775",
        warm: "#c08b65",
      }
    : {
        text: "#0f1419",
        subText: "#5a6b7a",
        panel: "rgba(248, 250, 255, 0.8)",
        panelStrong: "rgba(240, 245, 255, 0.95)",
        border: "rgba(100, 150, 220, 0.15)",
        accent: "#3b82f6",
        accentSoft: "#60a5ff",
        warm: "#f97316",
      };

  return (
    <>
      <ThemeTransition show={animating} isDark={isDark} />

      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          zIndex: 1100,
          overflow: "hidden",
          background: isDark
            ? "rgba(157,182,163,0.08)"
            : "rgba(111,143,122,0.06)",
        }}
      >
        <motion.div
          style={{
            width: `${scrollProgress}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${palette.accent}cc, ${palette.warm}cc)`,
            boxShadow: `0 0 8px ${palette.accent}44`,
            borderTopRightRadius: "999px",
            borderBottomRightRadius: "999px",
          }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>

      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "sticky",
          top: compact ? "3px" : "0px",
          zIndex: 1000,
          transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
          backdropFilter: "blur(12px)",
          background: isDark
            ? compact
              ? "rgba(2,6,23,0.9)"
              : "rgba(2,6,23,0.8)"
            : compact
              ? "rgba(255,255,255,0.9)"
              : "rgba(255,255,255,0.8)",
          borderBottom: `1px solid ${palette.border}`,
          boxShadow: compact
            ? `0 12px 30px ${isDark ? "rgba(0,0,0,0.25)" : "rgba(26,42,74,0.08)"}`
            : "none",
          transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div
          style={{
            width: "100%",
            padding: compact ? "0.9rem 1.6rem" : "1.5rem 2rem",
            display: "flex",
            gap: compact ? "1.4rem" : "2rem",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {/* LOGO & BRANDING */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ cursor: "pointer" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
              <h1
                style={{
                  color: "#00adb5",
                  fontWeight: "800",
                  fontSize: compact ? "1.5rem" : "1.8rem",
                  margin: 0,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  transition: "font-size 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                Benkhair Najir
              </h1>
              <p
                style={{
                  color: palette.accent,
                  fontSize: compact ? "0.72rem" : "0.8rem",
                  fontWeight: 600,
                  margin: 0,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  transition: "font-size 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                Computer Engineer & Developer
              </p>
            </div>
          </motion.div>

          {/* CENTER NAV */}
          <nav
            style={{
              display: "flex",
              gap: compact ? "0.9rem" : "1.25rem",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <NavLink
              to="/"
              style={({ isActive }) => ({
                textDecoration: "none",
                position: "relative",
              })}
            >
              {({ isActive }) => (
                <motion.div
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.3rem",
                    padding: "0.2rem 0",
                    color: isActive ? palette.accent : palette.text,
                    fontWeight: isActive ? "700" : "500",
                    fontSize: compact ? "0.9rem" : "0.95rem",
                    lineHeight: 1,
                    letterSpacing: "0.01em",
                    transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                    cursor: "pointer",
                  }}
                >
                  Home
                  <motion.span
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      width: "100%",
                      height: "2px",
                      borderRadius: "999px",
                      background: palette.accent,
                      transformOrigin: "center",
                      opacity: isActive ? 1 : 0.45,
                    }}
                  />
                </motion.div>
              )}
            </NavLink>

            <NavLink
              to="/portfolio"
              style={({ isActive }) => ({
                textDecoration: "none",
                position: "relative",
              })}
            >
              {({ isActive }) => (
                <motion.div
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.3rem",
                    padding: "0.2rem 0",
                    color: isActive ? palette.accent : palette.text,
                    fontWeight: isActive ? "700" : "500",
                    fontSize: compact ? "0.9rem" : "0.95rem",
                    lineHeight: 1,
                    letterSpacing: "0.01em",
                    transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                    cursor: "pointer",
                  }}
                >
                  Portfolio
                  <motion.span
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      width: "100%",
                      height: "2px",
                      borderRadius: "999px",
                      background: palette.accent,
                      transformOrigin: "center",
                      opacity: isActive ? 1 : 0.45,
                    }}
                  />
                </motion.div>
              )}
            </NavLink>
          </nav>

          {/* THEME TOGGLE - WITH SPACING */}
          <div style={{ display: "flex", gap: "1.2rem", alignItems: "center" }}>
            {/* THEME TOGGLE */}
            <motion.button
              whileTap={{ scale: 0.88 }}
              whileHover={{ scale: 1.08 }}
              onClick={handleToggle}
              style={{
                width: compact ? "2.35rem" : "2.6rem",
                height: compact ? "2.35rem" : "2.6rem",
                borderRadius: "12px",
                border: `1.5px solid ${palette.accent}`,
                cursor: "pointer",
                background: palette.panel,
                color: palette.accent,
                transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 12px ${palette.accent}20`,
                position: "relative",
              }}
              title={isDark ? "Light mode" : "Dark mode"}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isDark ? "dark" : "light"}
                  initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 180 }}
                  transition={{
                    duration: 0.4,
                    ease: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                  }}
                >
                  {isDark ? (
                    <Moon size={18} strokeWidth={2} />
                  ) : (
                    <Sun size={18} strokeWidth={2} />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </>
  );
}

export default Header;