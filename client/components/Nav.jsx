/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';

const Nav = (props) => {
  return (
    <div className="nav">
      <div className="title"><h1>Chris' Memory Game</h1></div>
      <div className="nav-div" onClick={props.showLogin}>Go to login!</div>
      <div className="nav-div" onClick={props.showRegister}>Create an account!</div>
    </div>
  );
};

export default Nav;
