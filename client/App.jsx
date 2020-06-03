import React, { Component } from 'react';
import './style.scss';
import Login from './components/Login.jsx';
import Game from './components/Game.jsx';
import Register from './components/Register.jsx';
import Nav from './components/Nav.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLogin: true,
      showRegister: false,
      showGame: false,
      username: '',
      password: '',
      gamesPlayed: 0,
    };

    this.onChange = this.onChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.showLogin = this.showLogin.bind(this);
    this.showRegister = this.showRegister.bind(this);
  }

  onChange(event) {
    console.log('handling change');
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleLogin(event) {
    event.preventDefault();
    const { username, password } = this.state;
    const user = { username, password };

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.verified) {
          this.setState({
            showGame: true,
            showLogin: false,
            username: data.username,
            gamesPlayed: data.gamesPlayed,
          });
        }
      })
      .catch((error) => {
        console.error('Error', error);
      });
  }

  handleRegister(event) {
    event.preventDefault();
    const { username, password } = this.state;
    const user = { username, password };

    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.verified) {
          this.setState(() => ({
            showGame: true,
            showRegister: false,
            username: data.username,
            gamesPlayed: data.gamesPlayed,
          }));
        }
      })
      .catch((error) => {
        console.error('Error', error);
      });
  }

  showLogin() {
    this.setState({ showLogin: true, showRegister: false, showGame: false, username: '', gamesPlayed: 0 });
  }

  showRegister() {
    this.setState({ showLogin: false, showRegister: true, showGame: false, username: '', gamesPlayed: 0 });
  }

  render() {
    const { showLogin, showRegister, showGame, username, gamesPlayed } = this.state;
    return (
      <div className="App">
        <h1>Memory Game</h1>
        <Nav showLogin={this.showLogin} showRegister={this.showRegister} />
        { showLogin && <Login handleLogin={this.handleLogin} onChange={this.onChange} /> }
        { showRegister && <Register handleRegister={this.handleRegister} onChange={this.onChange} /> }
        { showGame && <Game gamesPlayed={gamesPlayed} username={username} /> }
      </div>
    );
  }
}

export default App;
