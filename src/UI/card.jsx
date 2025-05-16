import React from 'react';

const Card = ({card, onClick}) => {
    
    return (
        <div className={`card ${card.isFlipped ? 'flipped' : ''}`} onClick={() => onClick(card)}>
          <div className="card-front">Click on me!</div>
          <div className="card-back">{card.value}</div>
        </div>
      );
};

export default Card;