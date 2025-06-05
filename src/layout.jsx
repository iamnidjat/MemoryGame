import React from "react";
import styles from "./layout.module.css";
import { useTranslation } from "react-i18next";

const Layout = ({ children }) => {
  const {t} = useTranslation();

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1>🧠 {t("Memory Game")}</h1>
      </header>

      <main className={styles.main}>
        {children}
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} {t("Memory Game. All rights reserved")}.</p>
      </footer>
    </div>
  );
};

export default Layout;
