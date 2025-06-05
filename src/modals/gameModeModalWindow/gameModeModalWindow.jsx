import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./gameModeModalWindow.module.css";

const GameModeModalWindow = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        {children}
      </div>
    </div>
  );
};

export default GameModeModalWindow;
