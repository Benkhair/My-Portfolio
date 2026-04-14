import profile from "../assets/profile.jpg";
import { useNavigate, useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getTheme } from "../theme";
import ThemeTransition from "../components/ThemeTransition";

function Home() {
  const navigate = useNavigate();
  const { theme, setTheme } = useOutletContext();
  const isDark = theme === "dark";

  const [text, setText] = useState("");
  const [animating, setAnimating] = useState(false);

  const handleToggle = () => {
    setAnimating(true);
    requestAnimationFrame(() => {
      setTheme(isDark ? "light" : "dark");
    });
    setTimeout(() => {
      setAnimating(false);
    }, 350);
  };
  const fullText = "Hi! I'm Benkhair Najir";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index + 1));
      index += 1;
      if (index >= fullText.length) clearInterval(interval);
    }, 65);

    return () => clearInterval(interval);
  }, []);

  const palette = isDark
    ? {
        text: "#e8f0ff",
        subText: "#a8b8d8",
        panel: "rgba(20, 32, 55, 0.65)",
        panelStrong: "rgba(25, 38, 65, 0.85)",
        border: "rgba(100, 150, 220, 0.15)",
        accent: "#60a5ff",
        accentSoft: "#4a8fdd",
        warm: "#ff7a5c",
        shadow: "0 30px 80px rgba(0, 20, 60, 0.35)",
        background:
          "radial-gradient(circle at top left, rgba(96, 165, 255, 0.15), transparent 40%), radial-gradient(circle at 85% 20%, rgba(255, 122, 92, 0.12), transparent 30%), linear-gradient(135deg, #0f1a2e 0%, #1a2a4a 45%, #1f3a5f 100%)",
        mesh:
          "linear-gradient(120deg, rgba(96, 165, 255, 0.05), transparent 45%), linear-gradient(300deg, rgba(96, 165, 255, 0.08), transparent 40%)",
      }
    : {
        text: "#1a2a4a",
        subText: "#4a6a9a",
        panel: "rgba(230, 240, 255, 0.7)",
        panelStrong: "rgba(220, 235, 255, 0.9)",
        border: "rgba(96, 165, 255, 0.2)",
        accent: "#4a8fdd",
        accentSoft: "#60a5ff",
        warm: "#ff7a5c",
        shadow: "0 30px 80px rgba(96, 165, 255, 0.15)",
        background:
          "radial-gradient(circle at top left, rgba(96, 165, 255, 0.2), transparent 35%), radial-gradient(circle at 90% 18%, rgba(255, 122, 92, 0.15), transparent 28%), linear-gradient(135deg, #f0f5ff 0%, #e5f0ff 45%, #dae8ff 100%)",
        mesh:
          "linear-gradient(120deg, rgba(96, 165, 255, 0.08), transparent 48%), linear-gradient(300deg, rgba(96, 165, 255, 0.1), transparent 40%)",
      };


  const colors = getTheme(isDark);

  return (
    <>
      <ThemeTransition show={animating} isDark={isDark} />
      <motion.main
        style={{
          ...styles.main,
          background: palette.background,
          color: palette.text,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* THEME TOGGLE */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          whileHover={{ scale: 1.12 }}
          onClick={handleToggle}
          style={{
            position: "fixed",
            top: "2rem",
            right: "2rem",
            width: "2.6rem",
            height: "2.6rem",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            background: isDark
              ? "linear-gradient(135deg, #1a3a3a, #0d5a5a)"
              : "linear-gradient(135deg, #fff9e6, #ffe6cc)",
            color: isDark ? "#00adb5" : "#ff9800",
            transition: "all 0.3s ease",
            fontSize: "1.3rem",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: isDark
              ? "0 0 16px rgba(0, 173, 181, 0.3), inset 0 0 16px rgba(0, 173, 181, 0.1)"
              : "0 0 16px rgba(255, 152, 0, 0.3), inset 0 0 16px rgba(255, 152, 0, 0.1)",
            zIndex: 100,
            overflow: "hidden",
          }}
          title={isDark ? "Light mode" : "Dark mode"}
        >
          <motion.div
            key={isDark ? "dark" : "light"}
            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 180 }}
            transition={{
              duration: 0.5,
              ease: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
            }}
          >
            {isDark ? "🌙" : "☀️"}
          </motion.div>
        </motion.button>

        <div style={{ ...styles.mesh, background: palette.mesh }} />
        <motion.div
          style={{
            ...styles.blurOrb,
            ...styles.blurOrbLeft,
            background: palette.accentSoft,
          }}
          animate={{ y: [0, 30, 0], x: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          style={{
            ...styles.blurOrb,
            ...styles.blurOrbRight,
            background: palette.warm,
          }}
          animate={{ y: [0, -40, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          style={{
            position: "absolute",
            width: "20rem",
            height: "20rem",
            borderRadius: "999px",
            filter: "blur(100px)",
            opacity: 0.12,
            pointerEvents: "none",
            background: palette.accent,
            top: "50%",
            right: "10%",
          }}
          animate={{ y: [0, -50, 0], x: [0, 25, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

      <section style={styles.hero}>
        <motion.div
          style={styles.copyColumn}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.8rem",
              marginBottom: "1rem",
              padding: "0.8rem 1.2rem",
              borderRadius: "999px",
              background: palette.panel,
              border: `1px solid ${palette.border}`,
              width: "fit-content",
            }}
          >
            <span style={{
              width: "0.6rem",
              height: "0.6rem",
              borderRadius: "50%",
              background: palette.accent,
              animation: "pulse 2s infinite",
            }} />
            <span style={{ color: palette.accent, fontSize: "0.9rem", fontWeight: 600 }}>
              Computer Engineer & Web Developer
            </span>
          </motion.div>

          <h1 style={styles.title}>
            {text}
            <span style={{ color: palette.accent }}>.</span>
          </h1>

          <p style={{ ...styles.description, color: palette.subText }}>
            Crafting innovative solutions at the intersection of hardware and software. 
            Specializing in IoT systems, web development, and intelligent automation 
            with a focus on clean design and exceptional user experience.
          </p>

          <div style={styles.actions}>
            <motion.button
              style={{
                ...styles.primaryButton,
                background: palette.accent,
                color: isDark ? "#0f1a2e" : "#f0f5ff",
                boxShadow: `0 15px 40px ${isDark ? 'rgba(96, 165, 255, 0.3)' : 'rgba(96, 165, 255, 0.2)'}`,
              }}
              whileHover={{ y: -4, boxShadow: `0 20px 50px ${isDark ? 'rgba(96, 165, 255, 0.4)' : 'rgba(96, 165, 255, 0.3)'}` }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/portfolio")}
            >
              View My Work
            </motion.button>

            <motion.a
              href="mailto:benkhair@example.com"
              style={{
                ...styles.secondaryButton,
                color: palette.accent,
                border: `2px solid ${palette.accent}`,
                background: "transparent",
              }}
              whileHover={{ 
                background: palette.panel,
                boxShadow: `0 0 20px ${isDark ? 'rgba(96, 165, 255, 0.2)' : 'rgba(96, 165, 255, 0.15)'}`,
              }}
              whileTap={{ scale: 0.96 }}
            >
              Get In Touch
            </motion.a>
          </div>

        </motion.div>

        <motion.div
          style={styles.visualColumn}
          initial={{ y: 32, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.div
            style={{
              ...styles.profileShell,
              background: palette.panelStrong,
              border: `1px solid ${palette.border}`,
              boxShadow: palette.shadow,
              position: "relative",
            }}
            whileHover={{
              boxShadow: `0 30px 80px ${isDark ? 'rgba(96, 165, 255, 0.3)' : 'rgba(96, 165, 255, 0.2)'}`,
            }}
          >
            <motion.div
              style={{
                ...styles.photoFrame,
                background: `linear-gradient(145deg, ${palette.accentSoft}, ${palette.warm})`,
              }}
              animate={{ rotate: [-1, 1, -1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.02 }}
            >
              <img src={profile} alt="Benkhair Najir" style={styles.image} />
            </motion.div>

            <motion.div
              style={{
                position: "absolute",
                bottom: "-1rem",
                right: "-1rem",
                padding: "1rem 1.5rem",
                background: "linear-gradient(135deg, #ff6b6b 0%, #ff8c42 50%, #ffd93d 100%)",
                borderRadius: "20px",
                color: "#1a1a1a",
                fontWeight: 700,
                fontSize: "0.95rem",
                boxShadow: `0 15px 40px rgba(255, 107, 107, 0.4), 0 0 20px rgba(255, 107, 107, 0.3)`,
                border: "2px solid rgba(255, 255, 255, 0.2)",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ scale: 1.15, y: -8, boxShadow: `0 20px 50px rgba(255, 107, 107, 0.5), 0 0 30px rgba(255, 107, 107, 0.4)` }}
            >
              ✨ Available for Work
            </motion.div>

          </motion.div>

        </motion.div>
      </section>

      <motion.footer
        style={{
          ...styles.footer,
          borderTop: `1px solid ${palette.border}`,
          background: isDark ? "rgba(2,6,23,0.5)" : "rgba(255,255,255,0.5)",
          backdropFilter: "blur(10px)",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <h3 style={{ ...styles.footerTitle, color: palette.text }}>
              Let's work together
            </h3>
            <p style={{ ...styles.footerText, color: palette.subText }}>
              Have a project in mind? Let's create something amazing.
            </p>
          </div>

          <div style={styles.footerLinks}>
            <a
              href="mailto:benkhair@example.com"
              style={{
                ...styles.footerLink,
                color: palette.accent,
              }}
            >
              Email
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...styles.footerLink,
                color: palette.accent,
              }}
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...styles.footerLink,
                color: palette.accent,
              }}
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div
          style={{
            ...styles.footerDivider,
            borderTop: `1px solid ${palette.border}`,
          }}
        />

        <div style={styles.footerBottom}>
          <p style={{ ...styles.footerCredit, color: palette.subText }}>
            © 2026 Benkhair Najir. Designed and built with care.
          </p>
          <p style={{ ...styles.footerCredit, color: palette.subText }}>
            Based in Philippines
          </p>
        </div>
      </motion.footer>
      </motion.main>
    </>
  );
}

const styles = {
  main: {
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
  },
  mesh: {
    position: "absolute",
    inset: 0,
    opacity: 0.8,
  },
  blurOrb: {
    position: "absolute",
    width: "26rem",
    height: "26rem",
    borderRadius: "999px",
    filter: "blur(120px)",
    opacity: 0.18,
    pointerEvents: "none",
  },
  blurOrbLeft: {
    top: "-8rem",
    left: "-6rem",
  },
  blurOrbRight: {
    bottom: "-10rem",
    right: "-6rem",
  },
  hero: {
    width: "min(1200px, calc(100% - 2rem))",
    minHeight: "calc(100vh - 120px)",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "2rem",
    alignItems: "center",
    padding: "3.5rem 0 4.5rem",
    position: "relative",
    zIndex: 1,
  },
  copyColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  eyebrow: {
    width: "fit-content",
    padding: "0.65rem 1rem",
    borderRadius: "999px",
    fontSize: "0.85rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    backdropFilter: "blur(14px)",
  },
  title: {
    fontSize: "clamp(3rem, 7vw, 5.8rem)",
    lineHeight: 0.94,
    letterSpacing: "-0.05em",
    maxWidth: "10ch",
  },
  description: {
    fontSize: "1.05rem",
    lineHeight: 1.8,
    maxWidth: "34rem",
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    alignItems: "center",
  },
  primaryButton: {
    border: "none",
    borderRadius: "999px",
    padding: "1rem 1.5rem",
    fontSize: "0.98rem",
    fontWeight: 600,
    cursor: "pointer",
  },
  secondaryButton: {
    textDecoration: "none",
    borderRadius: "999px",
    padding: "0.95rem 1.4rem",
    fontSize: "0.98rem",
    backdropFilter: "blur(14px)",
  },
  highlightGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
    gap: "1rem",
    marginTop: "0.5rem",
  },
  highlightCard: {
    borderRadius: "22px",
    padding: "1.15rem",
    backdropFilter: "blur(12px)",
  },
  highlightLabel: {
    display: "block",
    fontSize: "0.8rem",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: "0.55rem",
  },
  highlightValue: {
    fontSize: "1rem",
    lineHeight: 1.5,
  },
  visualColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
  },
  profileShell: {
    borderRadius: "34px",
    padding: "1.2rem",
    backdropFilter: "blur(14px)",
  },
  photoFrame: {
    borderRadius: "28px",
    padding: "1.1rem",
  },
  image: {
    width: "100%",
    aspectRatio: "4 / 5",
    objectFit: "cover",
    display: "block",
    borderRadius: "22px",
  },
  visualFooter: {
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",
    alignItems: "end",
    flexWrap: "wrap",
    padding: "1.2rem 0 0.3rem",
  },
  footerLabel: {
    fontSize: "0.78rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: "0.45rem",
  },
  footerTitle: {
    fontSize: "clamp(1.25rem, 2vw, 1.7rem)",
    lineHeight: 1.2,
    maxWidth: "14ch",
  },
  accentBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.6rem",
    borderRadius: "999px",
    padding: "0.8rem 1rem",
    whiteSpace: "nowrap",
  },
  badgeDot: {
    width: "0.7rem",
    height: "0.7rem",
    borderRadius: "50%",
  },
  metricRail: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "1rem",
  },
  metricCard: {
    borderRadius: "22px",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    backdropFilter: "blur(12px)",
  },
  metricValue: {
    fontSize: "1.55rem",
    fontWeight: 700,
  },
  metricLabel: {
    fontSize: "0.92rem",
    lineHeight: 1.5,
  },
  footer: {
    padding: "3rem 2rem",
    marginTop: "4rem",
    position: "relative",
    zIndex: 1,
  },
  footerContent: {
    width: "min(1200px, calc(100% - 2rem))",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
    gap: "2rem",
    flexWrap: "wrap",
    marginBottom: "1.5rem",
  },
  footerSection: {
    flex: 1,
    minWidth: "280px",
  },
  footerTitle: {
    fontSize: "1.8rem",
    lineHeight: 1.2,
    marginBottom: "0.8rem",
  },
  footerText: {
    fontSize: "1rem",
    lineHeight: 1.6,
    maxWidth: "32ch",
  },
  footerLinks: {
    display: "flex",
    gap: "1.5rem",
    flexWrap: "wrap",
  },
  footerLink: {
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: 500,
    transition: "opacity 0.3s ease",
  },
  footerDivider: {
    width: "min(1200px, calc(100% - 2rem))",
    margin: "1.5rem auto",
  },
  footerBottom: {
    width: "min(1200px, calc(100% - 2rem))",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "1rem",
  },
  footerCredit: {
    fontSize: "0.9rem",
    lineHeight: 1.5,
  },
};

export default Home;
