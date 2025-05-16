import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GameModeModalWindow from "../../modals/gameModeModalWindow/gameModeModalWindow";

const GameLogics = () => {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState("easy");
  const [gameMode, setGameMode] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setModalOpen(true);
  }, []);

    const handleMenuOptions = (gameMode) => {
        setGameMode(gameMode)
        setModalOpen(false);
    }

    const backToMenu = () => {
        navigate(-1);
        //setModalOpen(false);
    }

    const handleDifficultyChange = (newDifficulty) => {
        setDifficulty(newDifficulty);
    }

  return (
    <div>
      <h1>Memory Game</h1>
      <div>
        <h2>Difficulty Level</h2>
        <button onClick={() => handleDifficultyChange("easy")}>Easy</button>
        <button onClick={() => handleDifficultyChange("medium")}>Medium</button>
        <button onClick={() => handleDifficultyChange("hard")}>Hard</button>
      </div>
      <GameModeModalWindow
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      >
        <div>
          <h1>Game Mode</h1>
          <p>Select your game mode:</p>
          <ul>
            <li onClick={() => handleMenuOptions("training")}>Training</li>
            <li onClick={() => handleMenuOptions("challenge")}>Multiplayer</li>
            <li onClick={backToMenu}>Back</li>
          </ul>
          <p>Choose your game mode to start playing!</p>
        </div>
      </GameModeModalWindow>
    </div>
  );
};

export default GameLogics;
