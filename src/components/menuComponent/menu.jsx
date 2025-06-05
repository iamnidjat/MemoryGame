import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import styles from './menu.module.css';

const Menu = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <input
        type="button"
        value={t("Play Game")}
        className={styles.button}
        onClick={() => navigate('/play')}
      />
      <input
        type="button"
        value={t("View Statistics")}
        className={styles.button}
        onClick={() => navigate('/stats')}
      />
      <input
        type="button"
        value={t("Settings")}
        className={styles.button}
        onClick={() => navigate('/settings')}
      />
    </div>
  );
};

export default Menu;
