import React from 'react';

const Card = ({ card, handleClick }) => {
  let curClass;
  if (card.hidden) curClass = 'hidden';
  else if (card.flipped) curClass = 'flipped';
  else curClass = 'card';
  return (
    <div className={curClass} id={card.id} onClick={() => handleClick(card)}>
      {card.display}
    </div>
  );
};

export default Card;
