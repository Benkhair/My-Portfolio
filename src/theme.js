export const getTheme = (isDark) => {
  return {
    text: isDark ? "#ffffff" : "#111111",
    subText: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
    cardBg: isDark
      ? "rgba(255,255,255,0.06)"
      : "rgba(0,0,0,0.05)",
    border: isDark
      ? "rgba(255,255,255,0.1)"
      : "rgba(0,0,0,0.1)",
    bg: isDark
      ? "linear-gradient(135deg, #050816, #0f172a, #020617)"
      : "#f5f7fb",
  };
};