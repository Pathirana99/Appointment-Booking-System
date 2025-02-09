import React from 'react';
import "./user.css";

export default function User() {

  return (
    <div className="home">
      <div className="mainContent">
      <div className="profilePic">
          <div className="profileLetter">S</div>
        </div>
        <div className="header">
          <div></div>
        </div>
        <button className="addButton" >
            ADD
          </button>
        <div className="form">
          <div className="section">
            <input
              type="text"
              />
          </div>
          <div className="section">
            <input
              type="text"
              />
          </div>
          <div className="section">
            <input
              type="text"
              />
          </div>
          <div className="section">
            <input
              type="text"
              />
          </div>
          <div className="section">
            <input
              type="text"
              />
          </div>
          <button className="logOut">
          Log Out
        </button>
        </div>
      </div>
    </div>
  );
}
