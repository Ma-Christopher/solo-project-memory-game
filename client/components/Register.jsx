/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';

const Register = (props) => {
  return (
    <div className="register">
      <h2>Register</h2>
      <form onSubmit={props.handleRegister}>
        <input type="text" name="username" placeholder="username" value={props.username} onChange={props.onChange} required />
        <input type="password" name="password" placeholder="password" value={props.password} onChange={props.onChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
