/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';

const Nav = (props) => {
  return (
    <div>
      <button type="button" onClick={props.showLogin}>Go to login!</button>
      <button type="button" onClick={props.showRegister}>Create an account!</button>
    </div>
  );
};

export default Nav;
