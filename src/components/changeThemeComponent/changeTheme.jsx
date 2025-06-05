import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./changeTheme.module.css";

const ChangeTheme = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.option}>☀️ {t("Light")}</div>
      <div className={styles.option}>🌙 {t("Dark")}</div>
      <div className={styles.back} onClick={() => navigate(-1)}>
        ⬅️ {t("Back")}
      </div>
    </div>
  );
};

export default ChangeTheme;
