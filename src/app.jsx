import React, { Component } from 'react';
import { render } from 'react-dom';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      gameOver: false,
      canClick: true,
      time: 0,
    };
    this.flipCard = this.flipCard.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }