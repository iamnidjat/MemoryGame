import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import GameModeModalWindow from "../../modals/gameModeModalWindow/gameModeModalWindow";
import Card from "../../UI/card";
import styles from "./gameLogics.module.css";

const GameLogics = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [gameMode, setGameMode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.isFlipped)) {
      setIsTimerActive(false);
      if (gameMode === "challenge") {
        const stats = {
          score: score,
          difficulty: difficulty,
          date: new Date().toISOString(), // e.g. 2025-05-16T10:00:00Z
          time: timer,
        };

        const existingStats = JSON.parse(
          localStorage.getItem("gameStats") || "[]"
        );

        existingStats.push(stats);

        localStorage.setItem("gameStats", JSON.stringify(existingStats));
      }

      setTimeout(() => {
        if (
          window.confirm(
            t("Game Over! Your score: ") + score + "\n" + t("Play again?")
          )
        ) {
          setIsTimerActive(true);
          setTimer(0);
          const cardValues = generateCardValues(
            difficulty === "easy" ? 2 : difficulty === "medium" ? 4 : 8
          );
          console.log("Generated card values:", cardValues);
          const shuffled = shuffleArray(cardValues);

          const structuredCards = shuffled.map((value, index) => ({
            id: index,
            value: value,
            isFlipped: false,
          }));

          setCards(structuredCards);
        } else {
          navigate(-1);
        }
      }, 500);
    }
  }, [cards]);

  useEffect(() => {
    let interval;

    if (isTimerActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTimerActive]);

  const handleMenuOptions = (gameMode) => {
    setGameMode(gameMode);
    setIsModalOpen(false);
    setIsTimerActive(true);
    setTimer(0);
    const cardValues = generateCardValues(2); // Example size
    console.log("Generated card values:", cardValues);
    const shuffled = shuffleArray(cardValues);

    const structuredCards = shuffled.map((value, index) => ({
      id: index,
      value: value,
      isFlipped: false,
    }));

    setCards(structuredCards);
  };

  const handleDifficultyChange = (newDifficulty) => {
    if (window.confirm(t("Are you sure you want to change the difficulty?"))) {
      setDifficulty(
        newDifficulty === 2 ? "easy" : newDifficulty === 4 ? "medium" : "hard"
      );
      setIsTimerActive(true);
      setTimer(0); // reset timer on new game
      const cardValues = generateCardValues(newDifficulty);
      console.log("Generated card values:", cardValues);
      const shuffled = shuffleArray(cardValues);

      const structuredCards = shuffled.map((value, index) => ({
        id: index,
        value: value,
        isFlipped: false,
      }));

      setCards(structuredCards);
    }
  };

  const generateCardValues = (size) => {
    const numPairs = (size * size) / 2;
    const cardValues = [...Array(numPairs).keys()].map((i) => i + 1); // creating pairs [1, 2, ...,]
    return [...cardValues, ...cardValues]; // doubling the values for pairs
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5); // simple shuffle
  };

  const shuffleCards = () => {
    setIsTimerActive(true);
    setTimer(0);

    // flipping all cards face-down
    setCards((prevCards) =>
      prevCards.map((card) => ({ ...card, isFlipped: false }))
    );

    // waiting for flip animation to complete (e.g., 300ms)
    setTimeout(() => {
      const cardValues = generateCardValues(
        difficulty === "easy" ? 2 : difficulty === "medium" ? 4 : 8
      );
      const shuffled = shuffleArray(cardValues);

      const structuredCards = shuffled.map((value, index) => ({
        id: index,
        value: value,
        isFlipped: false,
      }));

      // updating cards with shuffled values
      setCards(structuredCards);
    }, 300);
  };

  const handleCardClick = (card) => {
    // not allowing interaction during processing or on already flipped cards
    if (isProcessing || card.isFlipped || flippedCards.length === 2) return;

    // flipping the selected card
    const updatedCards = cards.map((c) =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    );
    setCards(updatedCards);

    const newFlipped = [...flippedCards, card];
    setFlippedCards(newFlipped);

    // if two cards are flipped, checking for a match
    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      setIsProcessing(true); // Lock further input

      if (first.value === second.value) {
        // it's a match – keeping them flipped
        setScore(score + 1);
        setTimeout(() => {
          setFlippedCards([]);
          setIsProcessing(false);
        }, 1000);
      } else {
        // not a match – unflipping after delay
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((c) =>
              c.id === first.id || c.id === second.id
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedCards([]);
          setIsProcessing(false); // unlocking input
        }, 1000);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("Memory Game")}</h1>
      <div className={styles.backButtonContainer}>
        <button className={styles.backButton} onClick={() => navigate("/")}>
          {t("Back")}
        </button>
      </div>
      <div className={styles.buttons}>
        <button
          className={styles.button}
          disabled={isModalOpen}
          onClick={shuffleCards}
        >
          {t("Shuffle order")}
        </button>
      </div>
      <div className={styles.subtitle}>
        <h2>{t("Difficulty Level")}</h2>
      </div>
      <div className={styles.buttons}>
        <button
          className={styles.button}
          disabled={isModalOpen}
          onClick={() => handleDifficultyChange(2)}
        >
          {t("Easy")}
        </button>
        <button
          className={styles.button}
          disabled={isModalOpen}
          onClick={() => handleDifficultyChange(4)}
        >
          {t("Medium")}
        </button>
        <button
          className={styles.button}
          disabled={isModalOpen}
          onClick={() => handleDifficultyChange(8)}
        >
          {t("Hard")}
        </button>
      </div>
      <GameModeModalWindow
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div>
          <h1>{t("Game Mode")}</h1>
          <p>{t("Select your game mode")}:</p>
          <ul>
            <li onClick={() => handleMenuOptions("training")}>
              {t("Training")}
            </li>
            <li onClick={() => handleMenuOptions("challenge")}>
              {t("Challenge")}
            </li>
            <li
              onClick={() => {
                navigate(-1);
              }}
            >
              {t("Back")}
            </li>
          </ul>
          <p>{t("Choose your game mode to start playing")}!</p>
        </div>
      </GameModeModalWindow>

      <div className={styles.board}>
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={handleCardClick} />
        ))}
      </div>

      <div className={styles.scoreTimer}>
        {t("Score")}: {score} | {t("Time")}: {timer}
      </div>
    </div>
  );
};

export default GameLogics;
