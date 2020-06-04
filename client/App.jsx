import React, { Component } from 'react';
import './style.scss';
import Login from './components/Login.jsx';
import Game from './components/Game.jsx';
import Register from './components/Register.jsx';
import Nav from './components/Nav.jsx';

function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('./assets/images', true, /\.(png|jpg|gif|woff|woff2|eot|ttf|svg|ico)$/));

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLogin: true,
      showRegister: false,
      showGame: false,
      username: '',
      password: '',
      easy: 0,
      normal: 0,
      hard: 0,
    };

    this.onChange = this.onChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.showLogin = this.showLogin.bind(this);
    this.showRegister = this.showRegister.bind(this);
  }

  onChange(event) {
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
          const { username, easy, normal, hard } = data.userData;
          this.setState({
            showGame: true,
            showLogin: false,
            username,
            easy,
            normal,
            hard,
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
          const { username, easy, normal, hard } = data.userData;
          this.setState({
            showGame: true,
            showRegister: false,
            username,
            easy,
            normal,
            hard,
          });
        }
      })
      .catch((error) => {
        console.error('Error', error);
      });
  }

  showLogin() {
    this.setState({ showLogin: true, showRegister: false, showGame: false, username: '', easy: 0, normal: 0, hard: 0 });
  }

  showRegister() {
    this.setState({ showLogin: false, showRegister: true, showGame: false, username: '', easy: 0, normal: 0, hard: 0 });
  }

  render() {
    const { showLogin, showRegister, showGame, username, easy, normal, hard } = this.state;
    return (
      <div className="App">
        <div className="main">
          <Nav showLogin={this.showLogin} showRegister={this.showRegister} />
          { showLogin && <Login handleLogin={this.handleLogin} onChange={this.onChange} /> }
          { showRegister && <Register handleRegister={this.handleRegister} onChange={this.onChange} /> }
          { showGame && <Game easy={easy} normal={normal} hard={hard} username={username} /> }
        </div>
        <div className="bottom">Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
      </div>
    );
  }
}

export default App;
