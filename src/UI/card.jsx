import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./card.module.css";

const Card = ({ card, onClick }) => {
  const { t } = useTranslation();

  return (
    <div
      className={`${styles.card} ${card.isFlipped ? styles.flipped : ""}`}
      onClick={() => onClick(card)}
    >
      <div className={styles.cardInner}>
        <div className={styles.cardFront}>{t("Click on me")}!</div>
        <div className={styles.cardBack}>{card.value}</div>
      </div>
    </div>
  );
};

export default Card;
