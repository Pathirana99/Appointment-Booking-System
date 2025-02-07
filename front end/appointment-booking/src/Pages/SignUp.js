import React from 'react'
import "./signUp.css";

export default function SignUp() {

  return (
    <div className="signUp">
    <img
            src="/images/nature.jpg"
            alt=""
          />
      <div className="signUpContent">
        <div className="signUpHeader">
          <h2>SignUp</h2>
        </div>
        <div className="signUpForm">
        <div className="formSection">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
            />
          </div>
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
          <button className="btnSignup">
            SignUp
          </button>
        </div>
      </div>
    </div>
  );
}
