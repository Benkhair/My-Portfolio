import { motion, AnimatePresence } from "framer-motion";

function ThemeTransition({ show, isDark }) {
  return (
    <AnimatePresence>
      {show && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          {/* BASE FLASH */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              inset: 0,
              background: isDark ? "#fff" : "#000",
            }}
          />

          {/* RING 1 */}
          <motion.div
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "200px",
              height: "200px",
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              border: `2px solid ${isDark ? "#ffffff" : "#000000"}`,
            }}
          />

          {/* RING 2 (delayed feel) */}
          <motion.div
            initial={{ scale: 0, opacity: 0.4 }}
            animate={{ scale: 6, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "200px",
              height: "200px",
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              border: `1px solid ${
                isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.4)"
              }`,
            }}
          />

          {/* SOFT GLOW WAVE */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0.3 }}
            animate={{ scale: 3.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "300px",
              height: "300px",
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              background: isDark
                ? "radial-gradient(circle, rgba(255,255,255,0.25), transparent 70%)"
                : "radial-gradient(circle, rgba(0,0,0,0.15), transparent 70%)",
              filter: "blur(20px)",
            }}
          />
        </div>
      )}
    </AnimatePresence>
  );
}

export default ThemeTransition;