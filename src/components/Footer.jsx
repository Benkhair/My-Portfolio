function Footer() {
  return (
    <footer style={styles.footer}>
      <p>© {new Date().getFullYear()} Benkhair Najir</p>
    </footer>
  );
}

const styles = {
  footer: {
    textAlign: "center",
    padding: "1rem",
    background: "#111",
    color: "#fff",
    marginTop: "2rem",
  },
};

export default Footer;