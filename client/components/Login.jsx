/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';

const Login = (props) => {
  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={props.handleLogin}>
        <input type="text" name="username" placeholder="username" value={props.username} onChange={props.onChange} required />
        <br />
        <input type="password" name="password" placeholder="password" value={props.password} onChange={props.onChange} required />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
