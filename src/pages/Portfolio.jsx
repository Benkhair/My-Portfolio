import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTheme } from "../theme";
import {
  BookOpen, ScanEye, CloudRain, Trash2, Fish,
  Globe, Cog, Smartphone,
  Lightbulb, Zap, Sparkles,
  MapPin, Phone, Cake, Gamepad2, Palette,
  ArrowLeft, Search, ExternalLink, Code, X, ChevronRight,
} from "lucide-react";

const projects = [
  {
    title: "Student Information System",
    description: "Website for managing student records, grades, and data.",
    tech: ["React", "JavaScript"],
    github: "#",
    live: "#",
    category: "Web Platform",
    icon: BookOpen,
    color: "#A78BFA",
  },
  {
    title: "Automatic Egg Crack Detection and Sorting System",
    description:
      "Automated system using sensors and AI for egg quality detection.",
    tech: ["Arduino", "Machine Learning"],
    github: "#",
    live: "#",
    category: "Automation",
    icon: ScanEye,
    color: "#FFD93D",
  },
  {
    title: "Early Flood Detection System",
    description: "IoT-based system that detects early flood warnings.",
    tech: ["Arduino", "IoT"],
    github: "#",
    live: "#",
    category: "Monitoring",
    icon: CloudRain,
    color: "#60A5FF",
  },
  {
    title: "Smart Trashbin",
    description: "Automated trashbin with sensor-based opening and monitoring.",
    tech: ["Arduino", "IoT"],
    github: "#",
    live: "#",
    category: "Smart Device",
    icon: Trash2,
    color: "#4ADE80",
  },
  {
    title: "pH Level Water Monitoring System with Fish Feeder",
    description: "Monitors water quality and automatically feeds fish.",
    tech: ["Arduino", "IoT"],
    github: "#",
    live: "#",
    category: "Environmental Tech",
    icon: Fish,
    color: "#FF7A5C",
  },
];

const skillCategories = [
  {
    category: "Web Development",
    icon: Globe,
    skills: [
      {
        name: "HTML",
        level: 85,
        logo: (
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
            alt="HTML5 logo"
            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
          />
        ),
        color: "#E34C26",
      },
      {
        name: "CSS",
        level: 80,
        logo: (
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
            alt="CSS3 logo"
            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
          />
        ),
        color: "#563D7C",
      },
      {
        name: "JavaScript",
        level: 90,
        logo: (
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
            alt="JavaScript logo"
            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
          />
        ),
        color: "#F7DF1E",
      },
      {
        name: "React",
        level: 88,
        logo: (
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
            alt="React logo"
            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
          />
        ),
        color: "#61DAFB",
      },
    ],
  },
  {
    category: "Embedded Systems",
    icon: Cog,
    skills: [
      {
        name: "Arduino",
        level: 92,
        logo: (
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg"
            alt="Arduino logo"
            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
          />
        ),
        color: "#00979D",
      },
      {
        name: "IoT",
        level: 90,
        logo: (
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg"
            alt="Raspberry Pi logo"
            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
          />
        ),
        color: "#C51A4A",
      },
      {
        name: "Machine Learning",
        level: 85,
        logo: (
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg"
            alt="TensorFlow logo"
            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
          />
        ),
        color: "#FF6F00",
      },
    ],
  },
  {
    category: "Mobile App Development",
    icon: Smartphone,
    skills: [
      {
        name: "React Native",
        level: 82,
        logo: (
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/reactnative/reactnative-original.svg"
            alt="React Native logo"
            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
          />
        ),
        color: "#61DAFB",
      },
      {
        name: "UI/UX Design",
        level: 85,
        logo: (
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
            alt="Figma logo"
            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
          />
        ),
        color: "#F24E1E",
      },
      {
        name: "App Architecture",
        level: 80,
        logo: (
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
            alt="Docker logo"
            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
          />
        ),
        color: "#2496ED",
      },
    ],
  },
];

function Portfolio() {
  const navigate = useNavigate();
  const { theme } = useOutletContext();
  const isDark = theme === "dark";
  const colors = getTheme(isDark);

  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
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
        chipBg: "rgba(96, 165, 255, 0.12)",
        shadow: "0 30px 80px rgba(0, 20, 60, 0.35)",
        overlay: "rgba(10, 20, 40, 0.7)",
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
        chipBg: "rgba(96, 165, 255, 0.15)",
        shadow: "0 30px 80px rgba(96, 165, 255, 0.15)",
        overlay: "rgba(26, 42, 74, 0.3)",
        background:
          "radial-gradient(circle at top left, rgba(96, 165, 255, 0.2), transparent 35%), radial-gradient(circle at 90% 18%, rgba(255, 122, 92, 0.15), transparent 28%), linear-gradient(135deg, #f0f5ff 0%, #e5f0ff 45%, #dae8ff 100%)",
        mesh:
          "linear-gradient(120deg, rgba(96, 165, 255, 0.08), transparent 48%), linear-gradient(300deg, rgba(96, 165, 255, 0.1), transparent 40%)",
      };

  const allTech = ["All", ...new Set(projects.flatMap((project) => project.tech))];

  const filtered = projects.filter((project) => {
    const matchesFilter = filter === "All" || project.tech.includes(filter);
    const query = search.trim().toLowerCase();
    const matchesSearch =
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.category.toLowerCase().includes(query);

    return matchesFilter && matchesSearch;
  });

  return (
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

      <section style={styles.shell}>
        <motion.section
          style={{
            ...styles.heroPanel,
            background: palette.panelStrong,
            border: `1px solid ${palette.border}`,
            boxShadow: palette.shadow,
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div style={styles.heroCopy}>
            <motion.h1
              style={styles.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              My{" "}
              <span style={{ color: palette.accent }}>Portfolio</span>
            </motion.h1>

            <motion.p
              style={{ ...styles.description, color: palette.subText }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              A curated look at the systems, experiments, and practical tools
              I&apos;ve built across web development, automation, and IoT.
            </motion.p>

            <motion.div
              style={styles.heroActions}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.button
                onClick={() => navigate(-1)}
                whileHover={{ scale: 1.04, x: -4 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  ...styles.primaryButton,
                  background: palette.text,
                  color: isDark ? "#12171b" : "#f8f4ee",
                  boxShadow: palette.shadow,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <ArrowLeft size={16} /> Back Home
              </motion.button>

              <motion.div
                style={{
                  ...styles.heroNote,
                  color: palette.subText,
                  border: `1px solid ${palette.border}`,
                  background: palette.panel,
                }}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                {filtered.length} projects in view
              </motion.div>
            </motion.div>
          </div>

          <div style={styles.heroStats}>
            {[
              { value: `${projects.length}`, label: "Projects" },
              { value: `${allTech.length - 1}`, label: "Tech Areas" },
              { value: "IoT", label: "Core Focus" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
                whileHover={{ y: -4, scale: 1.03 }}
                style={{
                  ...styles.statCard,
                  background: palette.panel,
                  border: `1px solid ${palette.border}`,
                  cursor: "default",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                <span style={{ ...styles.statValue, color: palette.accent }}>
                  {item.value}
                </span>
                <span style={{ ...styles.statLabel, color: palette.subText }}>
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          style={styles.contentGrid}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.75 }}
        >
          <motion.aside
            style={{
              ...styles.sidebar,
              background: palette.panel,
              border: `1px solid ${palette.border}`,
              boxShadow: palette.shadow,
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div>
              <p style={{ ...styles.sectionLabel, color: palette.subText }}>
                Refine collection
              </p>
              <h2 style={styles.sidebarTitle}>Filter the work by stack or idea</h2>
            </div>

            <label style={styles.searchWrap}>
              <span style={{ ...styles.searchLabel, color: palette.subText, display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <Search size={14} /> Search
              </span>
              <div style={{ position: "relative" }}>
                <input
                  placeholder="Search projects..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  style={{
                    ...styles.searchInput,
                    color: palette.text,
                    background: palette.panelStrong,
                    border: `1px solid ${palette.border}`,
                    paddingRight: search ? "2.4rem" : "1rem",
                  }}
                />
                {search && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    onClick={() => setSearch("")}
                    style={{
                      position: "absolute",
                      right: "0.7rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: palette.subText,
                      padding: "0.2rem",
                      display: "flex",
                    }}
                  >
                    <X size={14} />
                  </motion.button>
                )}
              </div>
            </label>

            <div style={styles.filterList}>
              {allTech.map((item) => {
                const active = filter === item;

                return (
                  <motion.button
                    key={item}
                    onClick={() => setFilter(item)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      background: active ? palette.accent : palette.panelStrong,
                    }}
                    transition={{ duration: 0.25 }}
                    style={{
                      ...styles.filterButton,
                      color: active ? (isDark ? "#12171b" : "#f8f4ee") : palette.text,
                      background: active ? palette.accent : palette.panelStrong,
                      border: `1px solid ${active ? palette.accent : palette.border}`,
                      fontWeight: active ? 600 : 400,
                    }}
                  >
                    {item}
                  </motion.button>
                );
              })}
            </div>

          </motion.aside>

          <div style={styles.projectsColumn}>
            <AnimatePresence mode="wait">
              <motion.div
                key={filter + search}
                style={styles.projectGrid}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
              {filtered.map((project, index) => (
                <motion.button
                  key={project.title}
                  type="button"
                  onClick={() => setSelected(project)}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, type: "spring", stiffness: 200, damping: 20 }}
                  whileHover={{ y: -8, boxShadow: `0 20px 50px ${project.color}25` }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    ...styles.projectCard,
                    background: palette.panel,
                    border: `1px solid ${palette.border}`,
                    boxShadow: palette.shadow,
                    color: palette.text,
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", flex: 1, width: "100%" }}>
                    <motion.div
                      style={{
                        width: "100%",
                        height: "160px",
                        borderRadius: "20px",
                        background: `linear-gradient(135deg, ${project.color}15, ${project.color}30)`,
                        border: `1.5px solid ${project.color}40`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "1.2rem",
                        overflow: "hidden",
                        position: "relative",
                      }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        style={{
                          color: project.color,
                          filter: `drop-shadow(0 4px 12px ${project.color}40)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <project.icon size={42} strokeWidth={1.5} />
                      </motion.div>
                      <motion.div
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          borderRadius: "20px",
                          background: `radial-gradient(circle at 30% 30%, ${project.color}20, transparent 70%)`,
                          pointerEvents: "none",
                        }}
                        animate={{ opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                    </motion.div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.8rem", marginBottom: "1rem" }}>
                      <span
                        style={{
                          ...styles.projectCategory,
                          color: project.color,
                          background: `${project.color}12`,
                          border: `1px solid ${project.color}30`,
                        }}
                      >
                        {project.category}
                      </span>
                      <span style={{ ...styles.projectIndex, color: palette.subText, fontWeight: 600 }}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                      <h3 style={styles.projectTitle}>{project.title}</h3>
                      <p style={{ ...styles.projectDescription, color: palette.subText }}>
                        {project.description}
                      </p>
                    </div>

                    <div style={styles.techRow}>
                      <div style={styles.techChipsRow}>
                        {project.tech.map((item) => (
                          <span
                            key={item}
                            style={{
                              ...styles.techChip,
                              color: palette.accent,
                              background: palette.chipBg,
                              border: `1px solid ${palette.border}`,
                            }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                      <span style={{ ...styles.viewLink, color: palette.subText }}>
                        View <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>
                </motion.button>
              ))}
              </motion.div>
            </AnimatePresence>

            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  ...styles.emptyState,
                  background: palette.panel,
                  border: `1px solid ${palette.border}`,
                  textAlign: "center",
                  padding: "3rem 2rem",
                }}
              >
                <Search size={32} style={{ color: palette.subText, marginBottom: "1rem", opacity: 0.5 }} />
                <h3 style={{ ...styles.emptyTitle, color: palette.text }}>No projects matched</h3>
                <p style={{ color: palette.subText, marginBottom: "1rem" }}>
                  Try another keyword or clear the filter.
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => { setSearch(""); setFilter("All"); }}
                  style={{
                    background: palette.accent,
                    color: "#fff",
                    border: "none",
                    borderRadius: "999px",
                    padding: "0.7rem 1.2rem",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                  }}
                >
                  Clear filters
                </motion.button>
              </motion.div>
            ) : null}
          </div>
        </motion.section>

        <motion.section
          style={{
            ...styles.aboutPanel,
            background: palette.panel,
            border: `1px solid ${palette.border}`,
            boxShadow: palette.shadow,
          }}
          initial={{ y: 28, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div style={{ marginBottom: "3rem", position: "relative" }}>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ flex: 1 }}
            >
              <p style={{ ...styles.sectionLabel, color: palette.subText }}>
                About me
              </p>
              <h2 style={styles.aboutTitle}>
                Building practical systems with a clean product mindset
              </h2>
              <p style={{ ...styles.aboutCopy, color: palette.subText, marginTop: "1rem" }}>
                I am a Computer Engineering student focused on building
                real-world systems using Arduino, IoT, and modern web
                development. I enjoy blending hardware and software into useful
                solutions that feel practical, reliable, and polished.
              </p>
            </motion.div>

            <motion.div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "280px",
                height: "280px",
                borderRadius: "20px",
                background: `linear-gradient(135deg, ${palette.accent}20, ${palette.warm}15)`,
                border: `2px solid ${palette.accent}40`,
                backdropFilter: "blur(10px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
              initial={{ opacity: 0, scale: 0.8, x: 50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ boxShadow: `0 0 30px ${palette.accent}30` }}
            >
              <motion.div
                style={{
                  position: "absolute",
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${palette.accent}40, transparent 70%)`,
                  top: "-50px",
                  right: "-50px",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                style={{
                  position: "relative",
                  zIndex: 10,
                  textAlign: "center",
                }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <span style={{ display: "flex", justifyContent: "center", marginBottom: "0.8rem", color: palette.accent }}><Lightbulb size={44} strokeWidth={1.5} /></span>
                <p style={{ color: palette.text, fontSize: "0.95rem", fontWeight: 700, margin: 0, marginBottom: "0.5rem" }}>
                  Problem Solver
                </p>
                <p style={{ color: palette.subText, fontSize: "0.8rem", margin: 0, lineHeight: 1.4 }}>
                  Creating innovative solutions through code & hardware
                </p>
              </motion.div>
            </motion.div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <motion.div
                style={{
                  ...styles.metaCard,
                  background: palette.panel,
                  border: `1.5px solid ${palette.border}`,
                  backdropFilter: "blur(10px)",
                }}
                whileHover={{ y: -4, boxShadow: palette.shadow }}
              >
                <span style={{ ...styles.sectionLabel, color: palette.accent }}>
                  <MapPin size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "0.4rem" }} /> LOCATION
                </span>
                <p style={{ ...styles.metaText, color: palette.text }}>
                  Talon-talon, Zamboanga City, Philippines
                </p>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
            >
              <motion.div
                style={{
                  ...styles.metaCard,
                  background: palette.panel,
                  border: `1.5px solid ${palette.border}`,
                  backdropFilter: "blur(10px)",
                }}
                whileHover={{ y: -4, boxShadow: palette.shadow }}
              >
                <span style={{ ...styles.sectionLabel, color: palette.accent }}>
                  <Phone size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "0.4rem" }} /> GET IN TOUCH
                </span>
                <p style={{ color: palette.text, fontSize: "1rem", display: "block", marginTop: "0.6rem", margin: "0.6rem 0 0 0", fontWeight: 400 }}>
                  09558903235
                </p>
                <p style={{ color: palette.subText, fontSize: "0.8rem", margin: "0.4rem 0 0 0", fontWeight: 500 }}>
                  Available for projects
                </p>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <motion.div
                style={{
                  ...styles.metaCard,
                  background: palette.panel,
                  border: `1.5px solid ${palette.border}`,
                  backdropFilter: "blur(10px)",
                }}
                whileHover={{ y: -4, boxShadow: palette.shadow }}
              >
                <span style={{ ...styles.sectionLabel, color: palette.accent }}>
                  <Cake size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "0.4rem" }} /> AGE
                </span>
                <p style={{ ...styles.metaText, color: palette.text }}>
                  24 years old
                </p>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                style={{
                  ...styles.metaCard,
                  background: palette.panel,
                  border: `1.5px solid ${palette.border}`,
                  backdropFilter: "blur(10px)",
                }}
                whileHover={{ y: -4, boxShadow: palette.shadow }}
              >
                <span style={{ ...styles.sectionLabel, color: palette.accent }}>
                  <Gamepad2 size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "0.4rem" }} /> HOBBIES
                </span>
                <p style={{ ...styles.metaText, color: palette.text }}>
                  Playing Online Games
                </p>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <motion.div
                style={{
                  ...styles.metaCard,
                  background: palette.panel,
                  border: `1.5px solid ${palette.border}`,
                  backdropFilter: "blur(10px)",
                }}
                whileHover={{ y: -4, boxShadow: palette.shadow }}
              >
                <span style={{ ...styles.sectionLabel, color: palette.accent }}>
                  <Palette size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "0.4rem" }} /> ADDITIONAL SKILLS
                </span>
                <p style={{ ...styles.metaText, color: palette.text }}>
                  Book Interior Design & Adobe InDesign
                </p>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              height: "200px",
              borderRadius: "24px",
              background: `linear-gradient(135deg, ${palette.accent}15, ${palette.warm}10)`,
              border: `2px solid ${palette.accent}40`,
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "3rem",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <motion.div
              style={{
                position: "absolute",
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                background: `radial-gradient(circle, ${palette.accent}30, transparent 70%)`,
                top: "-50px",
                right: "-50px",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              style={{
                position: "absolute",
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                background: `radial-gradient(circle, ${palette.warm}20, transparent 70%)`,
                bottom: "-30px",
                left: "-30px",
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              style={{
                position: "relative",
                zIndex: 10,
                textAlign: "center",
              }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <span style={{ display: "flex", justifyContent: "center", marginBottom: "0.5rem", color: palette.accent }}><Zap size={38} strokeWidth={1.5} /></span>
              <p style={{ color: palette.text, fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>
                Expertise & Mastery
              </p>
            </motion.div>
          </motion.div>

          <div style={styles.skillsContainer}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: "2.5rem" }}
            >
              <p style={{ ...styles.sectionLabel, color: palette.accent, marginBottom: "0.5rem", fontSize: "0.75rem", letterSpacing: "0.15em" }}>
                <Sparkles size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "0.4rem" }} /> TECHNICAL SKILLS
              </p>
              <h3 style={{ color: palette.text, fontSize: "1.8rem", fontWeight: 800, margin: 0, marginBottom: "0.5rem" }}>
                Skills & Proficiencies
              </h3>
              <div style={{ width: "60px", height: "4px", background: `linear-gradient(90deg, ${palette.accent}, ${palette.warm})`, borderRadius: "999px", marginBottom: "1rem" }} />
            </motion.div>

            {skillCategories.map((category, catIndex) => {
              const categoryColors = [
                { bg: "#60A5FF", accent: "#3B82F6", glow: "rgba(96, 165, 255, 0.3)" },
                { bg: "#FF7A5C", accent: "#FF6B42", glow: "rgba(255, 122, 92, 0.3)" },
                { bg: "#A78BFA", accent: "#8B5CF6", glow: "rgba(167, 139, 250, 0.3)" },
              ];
              const catColors = categoryColors[catIndex];

              return (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: catIndex * 0.15, type: "spring", stiffness: 200, damping: 20 }}
                  viewport={{ once: true }}
                  style={{
                    marginBottom: "2rem",
                    padding: "1.8rem",
                    borderRadius: "24px",
                    background: palette.panel,
                    border: `1.5px solid ${palette.border}`,
                    backdropFilter: "blur(10px)",
                    transition: "box-shadow 0.3s ease",
                  }}
                  whileHover={{ boxShadow: `0 8px 40px ${catColors.glow}`, borderColor: `${catColors.bg}40` }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.8rem" }}>
                    <motion.div
                      style={{
                        width: "56px",
                        height: "56px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "16px",
                        background: `linear-gradient(135deg, ${catColors.bg}20, ${catColors.accent}15)`,
                        border: `1.5px solid ${catColors.bg}50`,
                        color: catColors.bg,
                      }}
                      whileHover={{ scale: 1.1, rotate: 8 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <category.icon size={26} strokeWidth={1.5} />
                    </motion.div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ color: palette.text, fontWeight: 700, fontSize: "1.15rem", margin: 0 }}>
                        {category.category}
                      </h3>
                      <p style={{ color: palette.subText, fontSize: "0.85rem", margin: "0.25rem 0 0 0" }}>
                        {category.skills.length} Skills
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem 2rem" }}>
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: catIndex * 0.1 + skillIndex * 0.06 }}
                        viewport={{ once: true }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                            <div
                              style={{
                                width: "24px",
                                height: "24px",
                                borderRadius: "6px",
                                background: `${skill.color}15`,
                                border: `1px solid ${skill.color}40`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                overflow: "hidden",
                              }}
                            >
                              {skill.logo}
                            </div>
                            <span style={{ color: palette.text, fontWeight: 600, fontSize: "0.9rem" }}>
                              {skill.name}
                            </span>
                          </div>
                          <span
                            style={{
                              color: catColors.bg,
                              fontWeight: 700,
                              fontSize: "0.8rem",
                            }}
                          >
                            {skill.level}%
                          </span>
                        </div>
                        <div
                          style={{
                            width: "100%",
                            height: "8px",
                            borderRadius: "999px",
                            background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                            overflow: "hidden",
                          }}
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ delay: catIndex * 0.1 + skillIndex * 0.06 + 0.3, duration: 1, ease: [0.25, 0.8, 0.25, 1] }}
                            viewport={{ once: true }}
                            style={{
                              height: "100%",
                              background: `linear-gradient(90deg, ${catColors.bg}, ${catColors.accent})`,
                              borderRadius: "999px",
                              boxShadow: `0 0 8px ${catColors.glow}`,
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>
      </section>

      <AnimatePresence>
        {selected ? (
          <motion.div
            style={{
              ...styles.modalOverlay,
              background: palette.overlay,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              onClick={(event) => event.stopPropagation()}
              initial={{ y: 40, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                ...styles.modalCard,
                background: palette.panelStrong,
                border: `1px solid ${palette.border}`,
                boxShadow: palette.shadow,
                color: palette.text,
              }}
            >
              <motion.button
                onClick={() => setSelected(null)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  background: palette.panel,
                  border: `1px solid ${palette.border}`,
                  borderRadius: "12px",
                  width: "2.2rem",
                  height: "2.2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: palette.subText,
                  zIndex: 10,
                }}
              >
                <X size={16} />
              </motion.button>

              <motion.div
                style={{
                  width: "100%",
                  height: "200px",
                  borderRadius: "20px",
                  background: `linear-gradient(135deg, ${selected.color}15, ${selected.color}30)`,
                  border: `1.5px solid ${selected.color}40`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                  overflow: "hidden",
                  position: "relative",
                }}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5, type: "spring" }}
              >
                <motion.div
                  style={{
                    color: selected.color,
                    filter: `drop-shadow(0 6px 20px ${selected.color}50)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.3 }}
                >
                  <selected.icon size={56} strokeWidth={1.5} />
                </motion.div>
                <motion.div
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: "20px",
                    background: `radial-gradient(circle at 30% 30%, ${selected.color}25, transparent 70%)`,
                    pointerEvents: "none",
                  }}
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </motion.div>

              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                style={{
                  ...styles.projectCategory,
                  color: selected.color,
                  background: `${selected.color}12`,
                  border: `1px solid ${selected.color}30`,
                }}
              >
                {selected.category}
              </motion.span>

              <motion.h2
                style={styles.modalTitle}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {selected.title}
              </motion.h2>
              <motion.p
                style={{ ...styles.modalDescription, color: palette.subText }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                {selected.description}
              </motion.p>

              <motion.div
                style={styles.techRow}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {selected.tech.map((item) => (
                  <span
                    key={item}
                    style={{
                      ...styles.techChip,
                      color: palette.accent,
                      background: palette.chipBg,
                      border: `1px solid ${palette.border}`,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </motion.div>

              <motion.div
                style={styles.modalActions}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <motion.a
                  href={selected.github}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    ...styles.modalLink,
                    background: palette.panel,
                    border: `1px solid ${palette.border}`,
                    color: palette.text,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Code size={16} /> GitHub
                </motion.a>
                <motion.a
                  href={selected.live}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    ...styles.modalLink,
                    background: palette.accent,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <ExternalLink size={16} /> Live Demo
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.footer
        style={{
          ...styles.footer,
          borderTop: `1px solid ${palette.border}`,
          background: isDark ? "rgba(2,6,23,0.5)" : "rgba(255,255,255,0.5)",
          backdropFilter: "blur(10px)",
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <motion.h3
              style={{ ...styles.footerTitle, color: palette.text }}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              Ready to collaborate?
            </motion.h3>
            <p style={{ ...styles.footerText, color: palette.subText }}>
              Interested in any of these projects? Let&apos;s discuss your ideas.
            </p>
          </div>

          <div style={styles.footerLinks}>
            {[
              { label: "Email", href: "mailto:benkhair@example.com" },
              { label: "GitHub", href: "https://github.com", external: true },
              { label: "LinkedIn", href: "https://linkedin.com", external: true },
            ].map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                whileHover={{ y: -2, color: palette.warm }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                style={{
                  ...styles.footerLink,
                  color: palette.accent,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                {link.label}
                {link.external && <ExternalLink size={13} />}
              </motion.a>
            ))}
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
            © 2024 Benkhair Najir. All projects crafted with precision.
          </p>
          <p style={{ ...styles.footerCredit, color: palette.subText }}>
            Computer Engineering Student
          </p>
        </div>
      </motion.footer>
    </motion.main>
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
  shell: {
    width: "min(1200px, calc(100% - 2rem))",
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
    padding: "3.5rem 0 4.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
  heroPanel: {
    borderRadius: "36px",
    padding: "2.5rem",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1.5rem",
    backdropFilter: "blur(14px)",
  },
  heroCopy: {
    display: "flex",
    flexDirection: "column",
    gap: "1.3rem",
  },
  eyebrow: {
    width: "fit-content",
    padding: "0.65rem 1rem",
    borderRadius: "999px",
    fontSize: "0.82rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    backdropFilter: "blur(14px)",
  },
  title: {
    fontSize: "clamp(2.7rem, 6vw, 4.8rem)",
    lineHeight: 0.95,
    letterSpacing: "-0.05em",
    maxWidth: "11ch",
  },
  description: {
    fontSize: "1.02rem",
    lineHeight: 1.8,
    maxWidth: "38rem",
  },
  heroActions: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
    alignItems: "center",
  },
  primaryButton: {
    border: "none",
    borderRadius: "999px",
    padding: "1rem 1.45rem",
    fontSize: "0.98rem",
    fontWeight: 600,
    cursor: "pointer",
  },
  heroNote: {
    padding: "0.95rem 1.2rem",
    borderRadius: "999px",
    backdropFilter: "blur(14px)",
  },
  heroStats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "1rem",
    alignContent: "end",
  },
  statCard: {
    borderRadius: "24px",
    padding: "1.2rem",
    minHeight: "132px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backdropFilter: "blur(12px)",
  },
  statValue: {
    fontSize: "2rem",
    fontWeight: 700,
  },
  statLabel: {
    fontSize: "0.92rem",
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(260px, 320px) minmax(0, 1fr)",
    gap: "1.5rem",
    alignItems: "start",
  },
  sidebar: {
    borderRadius: "30px",
    padding: "1.4rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.3rem",
    backdropFilter: "blur(14px)",
    position: "sticky",
    top: "1rem",
  },
  sectionLabel: {
    fontSize: "0.78rem",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  sidebarTitle: {
    fontSize: "1.5rem",
    lineHeight: 1.2,
    marginTop: "0.45rem",
  },
  searchWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "0.55rem",
  },
  searchLabel: {
    fontSize: "0.9rem",
  },
  searchInput: {
    width: "100%",
    borderRadius: "18px",
    padding: "0.95rem 1rem",
    outline: "none",
    fontSize: "0.96rem",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    boxSizing: "border-box",
  },
  filterList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.7rem",
  },
  filterButton: {
    padding: "0.7rem 1rem",
    borderRadius: "999px",
    cursor: "pointer",
    fontSize: "0.92rem",
    transition: "all 0.2s ease",
  },
  sidebarCallout: {
    borderRadius: "22px",
    padding: "1rem",
  },
  calloutText: {
    marginTop: "0.5rem",
    lineHeight: 1.7,
    fontSize: "0.95rem",
  },
  projectsColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  projectGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "1rem",
    alignItems: "stretch",
  },
  projectCard: {
    borderRadius: "28px",
    padding: "1.35rem",
    textAlign: "left",
    cursor: "pointer",
    backdropFilter: "blur(12px)",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    minHeight: "320px",
    transition: "border-color 0.3s ease",
  },
  projectTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: "0.8rem",
    alignItems: "center",
    marginBottom: "1rem",
  },
  projectCategory: {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: "999px",
    padding: "0.45rem 0.8rem",
    fontSize: "0.78rem",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },
  projectIndex: {
    fontSize: "0.9rem",
  },
  projectTitle: {
    fontSize: "1.25rem",
    lineHeight: 1.3,
    marginBottom: "0.75rem",
    minHeight: "4.5rem",
  },
  projectDescription: {
    lineHeight: 1.7,
    fontSize: "0.95rem",
    marginBottom: "1rem",
    minHeight: "5.5rem",
  },
  techRow: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    marginTop: "auto",
  },
  techChipsRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.55rem",
    minHeight: "2.2rem",
    alignItems: "flex-start",
  },
  techChip: {
    borderRadius: "999px",
    padding: "0.45rem 0.75rem",
    fontSize: "0.82rem",
  },
  viewLink: {
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
    fontSize: "0.8rem",
    marginLeft: "auto",
  },
  emptyState: {
    borderRadius: "28px",
    padding: "1.4rem",
  },
  emptyTitle: {
    marginBottom: "0.5rem",
  },
  aboutPanel: {
    borderRadius: "36px",
    padding: "1.5rem",
    backdropFilter: "blur(14px)",
  },
  aboutHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",
    alignItems: "start",
    flexWrap: "wrap",
    marginBottom: "1.4rem",
  },
  aboutTitle: {
    fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
    lineHeight: 1.15,
    marginTop: "0.45rem",
    maxWidth: "16ch",
  },
  contactCard: {
    borderRadius: "22px",
    padding: "1rem 1.15rem",
    minWidth: "180px",
  },
  contactLabel: {
    display: "block",
    marginBottom: "0.35rem",
    fontSize: "0.78rem",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  contactValue: {
    fontSize: "1.05rem",
  },
  aboutGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 1fr)",
    gap: "1rem",
    marginBottom: "1.2rem",
  },
  aboutCopy: {
    lineHeight: 1.9,
    fontSize: "1rem",
    maxWidth: "58ch",
  },
  aboutMeta: {
    display: "grid",
    gap: "1rem",
  },
  metaCard: {
    borderRadius: "24px",
    padding: "1.5rem",
    minHeight: "140px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  metaText: {
    marginTop: "0.5rem",
    lineHeight: 1.7,
    fontSize: "0.95rem",
  },
  skillsWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.7rem",
  },
  skillChip: {
    borderRadius: "999px",
    padding: "0.55rem 0.8rem",
    fontSize: "0.85rem",
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
    zIndex: 1000,
    backdropFilter: "blur(8px)",
  },
  modalCard: {
    width: "min(560px, 100%)",
    borderRadius: "30px",
    padding: "2rem",
    position: "relative",
    overflow: "hidden",
  },
  modalTitle: {
    fontSize: "1.9rem",
    lineHeight: 1.2,
    margin: "1rem 0 0.8rem",
  },
  modalDescription: {
    lineHeight: 1.8,
    marginBottom: "1rem",
  },
  modalActions: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.8rem",
    marginTop: "1.3rem",
    alignItems: "center",
  },
  modalLink: {
    textDecoration: "none",
    borderRadius: "999px",
    padding: "0.9rem 1.5rem",
    fontWeight: 500,
    fontSize: "0.95rem",
    transition: "all 0.2s ease",
  },
  closeButton: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    padding: "0.6rem 0.2rem",
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

export default Portfolio;
