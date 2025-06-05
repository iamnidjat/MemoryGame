import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./changeLanguage.module.css";

const ChangeLanguage = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = (newLanguage) => {
    localStorage.setItem("lang", newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (
    <div className={styles.container}>
      <div className={styles.option} onClick={() => handleChangeLanguage("en")}>
        <img
          src="https://flagcdn.com/w40/gb.png"
          alt="English"
          className={styles.flag}
        />
        {t("English")}
      </div>
      <div className={styles.option} onClick={() => handleChangeLanguage("ru")}>
        <img
          src="https://flagcdn.com/w40/ru.png"
          alt="Russian"
          className={styles.flag}
        />
        {t("Russian")}
      </div>
      <div className={styles.option} onClick={() => handleChangeLanguage("az")}>
        <img
          src="https://flagcdn.com/w40/az.png"
          alt="Azerbaijani"
          className={styles.flag}
        />
        {t("Azerbaijani")}
      </div>
      <div className={styles.back} onClick={() => navigate(-1)}>
        ⬅️ {t("Back")}
      </div>
    </div>
  );
};

export default ChangeLanguage;
