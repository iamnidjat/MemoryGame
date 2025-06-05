import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./statistics.module.css";

const Statistics = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [stats, setStats] = useState([]);
  const [sortedStats, setSortedStats] = useState([]);
  const [hasStats, setHasStats] = useState(false);

  useEffect(() => {
    const gameStats = localStorage.getItem("gameStats");
    if (gameStats) {
      const parsed = JSON.parse(gameStats);
      setStats(parsed);
      setSortedStats(parsed);
      setHasStats(true);
    } else {
      setHasStats(false);
    }
  }, []);

  const handleSort = (type) => {
    let sortedArray = [...stats];
    switch (type) {
      case "scoreHighToLow":
        sortedArray.sort((a, b) => b.score - a.score);
        break;
      case "scoreLowToHigh":
        sortedArray.sort((a, b) => a.score - b.score);
        break;
      case "timeLongestFirst":
        sortedArray.sort((a, b) => b.time - a.time);
        break;
      case "timeShortestFirst":
        sortedArray.sort((a, b) => a.time - b.time);
        break;
      case "newest":
        sortedArray.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "oldest":
        sortedArray.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      default:
        break;
    }
    setSortedStats(sortedArray);
  };

  const handleFilter = (difficulty) => {
    if (difficulty === "original") {
      setSortedStats(stats);
    } else {
      const filteredArray = stats.filter(
        (stat) => stat.difficulty === difficulty
      );
      setSortedStats(filteredArray);
    }
  };

  const resetStats = () => {
    localStorage.removeItem("gameStats");
    setStats([]);
    setSortedStats([]);
    setHasStats(false);
  };

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        {t("Back")}
      </button>

      <button
        className={styles.backButton}
        disabled={!hasStats}
        onClick={resetStats}
      >
        {t("Reset")}
      </button>
      <div className={styles.filterSection}>
        <button
          className={styles.filterButton}
          onClick={() => handleSort("scoreHighToLow")}
        >
          {t("Sort by Score: High to Low")}
        </button>
        <button
          className={styles.filterButton}
          onClick={() => handleSort("scoreLowToHigh")}
        >
          {t("Sort by Score: Low to High")}
        </button>
        <button
          className={styles.filterButton}
          onClick={() => handleSort("timeLongestFirst")}
        >
          {t("Sort by Time: Longest First")}
        </button>
        <button
          className={styles.filterButton}
          onClick={() => handleSort("timeShortestFirst")}
        >
          {t("Sort by Time: Shortest First")}
        </button>
        <button
          className={styles.filterButton}
          onClick={() => handleFilter("easy")}
        >
          {t("Show Only Easy Games")}
        </button>
        <button
          className={styles.filterButton}
          onClick={() => handleFilter("medium")}
        >
          {t("Show Only Medium Games")}
        </button>
        <button
          className={styles.filterButton}
          onClick={() => handleFilter("hard")}
        >
          {t("Show Only Hard Games")}
        </button>
        <button
          className={styles.filterButton}
          onClick={() => handleSort("newest")}
        >
          {t("Sort by Newest")}
        </button>
        <button
          className={styles.filterButton}
          onClick={() => handleSort("oldest")}
        >
          {t("Sort by Oldest")}
        </button>
        <button
          className={styles.filterButton}
          onClick={() => handleFilter("original")}
        >
          {t("Original")}
        </button>
      </div>
      <h2 className={styles.heading}>{t("Your Statistics")}</h2>
      {sortedStats.length === 0 ? (
        <p>{t("No statistics available")}</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{t("Date")}</th>
              <th>{t("Score")}</th>
              <th>{t("Difficulty")}</th>
              <th>{t("Time")}</th>
            </tr>
          </thead>
          <tbody>
            {sortedStats.map((stat, index) => (
              <tr key={index}>
                <td>{new Date(stat.date).toLocaleString()}</td>
                <td>{stat.score}</td>
                <td>{stat.difficulty}</td>
                <td>{stat.time} {t("seconds")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Statistics;
