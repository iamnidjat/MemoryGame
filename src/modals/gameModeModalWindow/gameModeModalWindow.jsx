import React from "react";
import "./gameModeModalWindow.module.css";

const GameModeModalWindow = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        {children}
      </div>
    </div>
  );
};

export default GameModeModalWindow;
