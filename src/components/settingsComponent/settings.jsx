import React from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from './settings.module.css';

const Settings = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  return (
    <div className={styles.container}>
      <div className={styles.option} onClick={() => navigate('/language')}>
        {t("Change the language")}
      </div>
      <div className={styles.option} onClick={() => navigate('/theme')}>
        {t("Change the theme")}
      </div>
      <div className={styles.option} onClick={() => navigate(-1)}>
        {t("Back")}
      </div>
    </div>
  );
};

export default Settings;
