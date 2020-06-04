/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import Card from './Card.jsx';
import Options from './Options.jsx';

function shuffleArr(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function generateCards(numCards) {
  const cards = [];

  const images = [
    'images/001-steak.png',
    'images/002-bowling.png',
    'images/003-kite.png',
    'images/004-videogames.png',
    'images/005-shopping bag.png',
    'images/006-spray.png',
    'images/007-rugby ball.png',
    'images/008-music player.png',
    'images/009-microphone.png',
    'images/010-backpack.png',
    'images/011-basketball.png',
    'images/012-beer.png',
    'images/013-tea cup.png',
    'images/014-drum.png',
    'images/015-thread.png',
    'images/016-music.png',
    'images/017-chess piece.png',
    'images/018-gamepad.png',
    'images/019-origami.png',
    'images/020-dice.png',
    'images/021-popcorn.png',
    'images/022-cupcake.png',
    'images/023-flower pot.png',
    'images/024-dumbbell.png',
    'images/025-sewing machine.png',
    'images/026-guitar.png',
    'images/027-chef hat.png',
    'images/028-telescope.png',
    'images/029-umbrella.png',
    'images/030-film strip.png',
    'images/031-snorkling.png',
    'images/032-yarn ball.png',
    'images/033-study.png',
    'images/034-egg.png',
    'images/035-keyboard.png',
    'images/036-poker cards.png',
    'images/037-video.png',
    'images/038-camera.png',
    'images/039-puzzle pieces.png',
    'images/040-painting.png',
    'images/041-swimming.png',
    'images/042-artist.png',
    'images/043-archery.png',
    'images/044-pizza.png',
    'images/045-fishing.png',
    'images/046-writing.png',
    'images/047-scissors.png',
    'images/048-camping tent.png',
    'images/049-bicycle.png',
    'images/050-football ball.png',
  ];

  const shuffledImages = shuffleArr(images);

  for (let i = 0; i < numCards; i += 2) {
    cards.push({
      id: i,
      display: shuffledImages[i / 2],
      flipped: false,
      clickable: true,
      hidden: false,
    });
    cards.push({
      id: i + 1,
      display: shuffledImages[i / 2],
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
      showOptions: true,
      mode: null,
      cards: [],
      pick1: null,
      pick2: null,
      canClick: false,
      checkForGameOver: false,
      easy: 0,
      normal: 0,
      hard: 0,
      username: '',
    };
    this.startGame = this.startGame.bind(this);
    this.flipCard = this.flipCard.bind(this);
    this.hideCard = this.hideCard.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.checkGameOver = this.checkGameOver.bind(this);
    this.foundMatch = this.foundMatch.bind(this);
    this.noMatch = this.noMatch.bind(this);
    this.showAll = this.showAll.bind(this);
  }

  componentDidMount() {
    this.setState({
      username: this.props.username,
      easy: this.props.easy,
      normal: this.props.normal,
      hard: this.props.hard,
    });
    // this.startGame();
  }

  componentDidUpdate() {
    this.checkMatch();
    this.checkGameOver();
  }

  startGame(difficulty) {
    let totalCards;
    let mode;
    if (difficulty === 'easy') {
      totalCards = 6;
      mode = 'easy';
    } else if (difficulty === 'normal') {
      totalCards = 12;
      mode = 'normal';
    } else {
      totalCards = 18;
      mode = 'hard';
    }
    const gameCards = generateCards(totalCards);
    this.setState({
      showOptions: false,
      mode,
      cards: gameCards,
      pick1: null,
      pick2: null,
      canClick: false,
      checkForGameOver: false,
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
      if (pick1.display === pick2.display) this.foundMatch();
      else this.noMatch();
      this.setState(() => ({ pick1: null, pick2: null }));
    }
  }

  checkGameOver() {
    const { cards, checkForGameOver } = this.state;
    if (!checkForGameOver) return;
    const gameOver = cards.reduce((acc, c) => {
      if (!c.hidden) return false;
      return acc;
    }, true);
    if (gameOver) {
      console.log(this.state.username);
      fetch('http://localhost:3000/update/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username,
          mode: this.state.mode,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          const { easy, normal, hard } = data.userData;
          this.setState({
            easy,
            normal,
            hard,
          });
        })
        .catch((error) => {
          console.error('Error', error);
        });

      this.setState({
        checkForGameOver: false,
        showOptions: true,
      });
    } else {
      this.setState(() => ({ checkForGameOver: false }));
    }
  }

  foundMatch() {
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
        <div className="scoreboard">
          <p>Hello, {this.state.username}! You have completed {this.state.easy} easy games, {this.state.normal} normal games, and {this.state.hard} hard games!</p>
        </div>
        {this.state.showOptions && <Options startGame={this.startGame} />}
        <div className="card-field">
          {cards}
        </div>
      </div>
    );
  }
}

export default Game;
