import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./notFoundPage.module.css";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.code}>404</div>
      <div className={styles.message}>{t("Page Not Found")}</div>
      <div className={styles.back} onClick={() => navigate(-1)}>
        {t("Back")}
      </div>
    </div>
  );
};

export default NotFoundPage;
