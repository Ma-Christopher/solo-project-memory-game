/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';

const Login = (props) => {
  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={props.handleLogin}>
        <input type="text" name="username" placeholder="username" value={props.username} onChange={props.onChange} required />
        <input type="password" name="password" placeholder="password" value={props.password} onChange={props.onChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
