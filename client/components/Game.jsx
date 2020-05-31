import React, { Component } from 'react';
import Card from './Card.jsx';

function shuffleArr(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function generateCards(numCards) {
  const cards = [];
  for (let i = 0; i < numCards; i += 2) {
    cards.push({
      id: i,
      display: i / 2,
      flipped: false,
      clickable: true,
      hidden: false,
    });
    cards.push({
      id: i + 1,
      display: i / 2,
      flipped: false,
      clickable: true,
      hidden: false,
    });
  }

  return shuffleArr(cards);
}

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      pick1: null,
      pick2: null,
      canClick: false,
      checkForGameOver: false,
    };
    this.startGame = this.startGame.bind(this);
    this.flipCard = this.flipCard.bind(this);
    this.hideCard = this.hideCard.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.checkGameOver = this.checkGameOver.bind(this);
    this.foundMatch = this.foundMatch.bind(this);
    this.noMatch = this.noMatch.bind(this);
    this.showAll = this.showAll.bind(this);
  }

  componentDidMount() {
    this.startGame();
  }

  componentDidUpdate() {
    this.checkMatch();
    this.checkGameOver();
  }

  startGame(difficulty) {
    let totalCards = 10;
    // if (difficulty === 'easy') {
    //   totalCards = 18;
    // } else if (difficulty === 'normal') {
    //   totalCards = 24;
    // } else {
    //   totalCards = 30;
    // }
    const gameCards = generateCards(totalCards);
    this.setState({
      cards: gameCards,
    });
    setTimeout(() => this.showAll(), 5000);
  }

  showAll() {
    const { cards } = this.state;

    const newCards = cards.map((c) => ({ ...c, flipped: true }));
    this.setState((prev) => ({
      ...prev,
      clickable: true,
      canClick: true,
      cards: newCards,
    }));
  }

  resetGame() {
    this.setState(({
      cards: [],
      gameOver: false,
      pick1: null,
      pick2: null,
      canClick: false,
    }));
    this.startGame();
  }

  handleClick(card) {
    const { canClick, pick1, pick2 } = this.state;
    if (!canClick) return;
    if (!card.clickable) return;
    if ((pick1 && (card.id === pick1.id)) || (pick2 && (card.id === pick2.id))) return;

    this.flipCard(card, false);

    if (pick1) {
      this.setState(() => ({ pick2: card }));
    } else {
      this.setState(() => ({ pick1: card }));
    }
  }

  flipCard(card, flipped) {
    const { cards } = this.state;
    this.setState((prev) => {
      const newCards = cards.map((c) => {
        if (c.id !== card.id) return c;
        return { ...c, flipped };
      });
      return ({ ...prev, cards: newCards });
    });
  }

  hideCard(card) {
    const { cards } = this.state;
    this.setState((prev) => {
      const newCards = cards.map((c) => {
        if (c.id !== card.id) return c;
        return { ...c, hidden: true };
      });
      return ({ ...prev, cards: newCards });
    });
  }

  checkMatch() {
    const { pick1, pick2 } = this.state;

    if (pick1 && pick2) {
      console.log('checking for a match');
      if (pick1.display === pick2.display) this.foundMatch();
      else this.noMatch();
      this.setState(() => ({ pick1: null, pick2: null }));
    }
  }

  checkGameOver() {
    const { cards, checkForGameOver } = this.state;
    if (!checkForGameOver) return;
    console.log('checking for game over', cards);
    const gameOver = cards.reduce((acc, c) => {
      if (!c.hidden) return false;
      return acc;
    }, true);
    if (gameOver) {
      alert('Game Over! You win!');
      this.resetGame();
    } else {
      this.setState(() => ({ checkForGameOver: false }));
    }
  }

  foundMatch() {
    console.log('found match');
    const { pick1, pick2, cards } = this.state;
    setTimeout(() => {
      this.hideCard(pick1);
      this.hideCard(pick2);
      this.setState(() => ({ checkForGameOver: true }));
    }, 1000);
    this.setState((prev) => {
      const newCards = cards.map((c) => {
        if (c.id !== pick1.id && c.id !== pick2.id) return c;
        return { ...c, clickable: false };
      });
      return ({ ...prev, cards: newCards });
    });
  }

  noMatch() {
    console.log('no match');
    const { pick1, pick2 } = this.state;
    setTimeout(() => {
      this.flipCard(pick1, true);
      this.flipCard(pick2, true);
    }, 1000);
    this.setState(() => ({ pick1: null, pick2: null }));
  }

  render() {
    const cards = this.state.cards.map((card) => {
      return (
        <Card
          key={card.id}
          card={card}
          handleClick={this.handleClick}
        />
      );
    });
    return (
      <div className="game">
        {cards}
      </div>
    );
  }
}

export default Game;
