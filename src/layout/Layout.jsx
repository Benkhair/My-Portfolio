import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";

function Layout() {
  const [theme, setTheme] = useState("dark");
  const location = useLocation();

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.style.transition = "0.4s ease";
  }, [theme]);

  const isDark = theme === "dark";
  const showHeader = location.pathname === "/portfolio";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: isDark
          ? "linear-gradient(135deg, #0f172a, #020617)"
          : "#f5f7fb",
        color: isDark ? "#fff" : "#111",
        transition: "0.4s ease",
      }}
    >
      {showHeader && <Header theme={theme} setTheme={setTheme} />}

      <div style={{ flex: 1 }}>
        <Outlet context={{ theme, setTheme }} />
      </div>
    </div>
  );
}

export default Layout;