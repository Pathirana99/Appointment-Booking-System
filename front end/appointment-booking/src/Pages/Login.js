import "./login.css";
import React from 'react'

export default function Login() {

  return (
    <div className="login">
    <img
            src="/images/nature.jpg"
            alt=""
          />
      <div className="loginContent">
        <div className="loginHeader">
          <h2>Login</h2>
        </div>
        <div className="loginForm">
          <div className="formSection">
            <label>Email</label>
            <input
              type="text"
              placeholder="Enter your email"
            />
          </div>
          <div className="formSection">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <button className="loginButton">
            Login
          </button>
          <h9>If you don't have an account, please sign up</h9>
          <button className="signUpButton">
            SignUp
          </button>
        </div>
      </div>
    </div>
  );
}
