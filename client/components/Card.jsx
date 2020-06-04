import React from 'react';

const Card = ({ card, handleClick }) => {
  let curClass = ['card'];
  if (card.flipped) curClass.push('card-flipped');
  if (card.hidden) curClass.push('card-hidden');
  return (
    <div className="card-container" id={card.id} onClick={() => handleClick(card)}>
      <div className={curClass.join(' ')}>
        <div className="card-front">
          <img src={card.display} alt="card face" />
        </div>
        <div className="card-back"></div>
      </div>
    </div>
  );
};

export default Card;
