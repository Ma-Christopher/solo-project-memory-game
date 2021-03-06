import React from 'react';

const Options = ({startGame, deleteAcct}) => {
  return (
    <div className="options">
      <div className="gameOption" onClick={() => startGame('easy')}>Start an EASY game</div>
      <div className="gameOption" onClick={() => startGame('normal')}>Start a NORMAL game</div>
      <div className="gameOption" onClick={() => startGame('hard')}>Start a HARD game</div>
      <div className="deleteAcct" onClick={() => deleteAcct()}>Delete account</div>
    </div>
  );
};

export default Options;
