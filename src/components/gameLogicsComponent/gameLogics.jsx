import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GameModeModalWindow from "../../modals/gameModeModalWindow/gameModeModalWindow";
import Card from "../../UI/card";

const GameLogics = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [gameMode, setGameMode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [score, setScore] = useState(0);

  useEffect(() => {
    alert(isModalOpen)

    if (!isModalOpen) {
        alert(isModalOpen)
      const cardValues = generateCardValues(2); // Example size
      console.log("Generated card values:", cardValues);
      const shuffled = shuffleArray(cardValues);

      const structuredCards = shuffled.map((value, index) => ({
        id: index,
        value: value,
        isFlipped: false,
      }));

      setCards(structuredCards);
    }
  }, []);

  const handleMenuOptions = (gameMode) => {
    setGameMode(gameMode);
    setIsModalOpen(true);

  };

  const handleDifficultyChange = (newDifficulty) => {
    const cardValues = generateCardValues(newDifficulty); // Example size
      console.log("Generated card values:", cardValues);
      const shuffled = shuffleArray(cardValues);

      const structuredCards = shuffled.map((value, index) => ({
        id: index,
        value: value,
        isFlipped: false,
      }));

      setCards(structuredCards);
  };

  const generateCardValues = (size) => {
    const numPairs = (size * size) / 2;
    const cardValues = [...Array(numPairs).keys()].map((i) => i + 1); // Create pairs [1, 2, ...,]
    return [...cardValues, ...cardValues]; // Double the values for pairs
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5); // Simple shuffle
  };

  const handleCardClick = (card) => {

  };

  return (
    <div>
      <h1>Memory Game</h1>
      <div>
        <h2>Difficulty Level</h2>
        <button onClick={() => handleDifficultyChange(2)}>Easy</button>
        <button onClick={() => handleDifficultyChange(4)}>Medium</button>
        <button onClick={() => handleDifficultyChange(8)}>Hard</button>
      </div>
      <GameModeModalWindow
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div>
          <h1>Game Mode</h1>
          <p>Select your game mode:</p>
          <ul>
            <li onClick={() => handleMenuOptions("training")}>Training</li>
            <li onClick={() => handleMenuOptions("challenge")}>Multiplayer</li>
            <li onClick={() => {navigate(-1)}}>Back</li>
          </ul>
          <p>Choose your game mode to start playing!</p>
        </div>
      </GameModeModalWindow>

      <div>
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={() => handleCardClick(card)}>
            {card.isFlipped ? card.value : "?"}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GameLogics;
