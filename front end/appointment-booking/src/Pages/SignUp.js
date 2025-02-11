import React, { useState } from "react";
import "./signUp.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function SignUp() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const validateEmail = (email) => {
    return emailRegex.test(email);
  };

  async function save(event) {
    event.preventDefault();
    setError("");

    if (!username || !email || !password) {
      setError("Those fields are cannot be empty.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/user/save", {
        username: username,
        email: email,
        password: password,
        role: "USER",
      });
      const { jwt, role } = response.data;

      localStorage.setItem("jwt", jwt);
      localStorage.setItem("role", role);

      const decodedJwt = jwtDecode(jwt);
      const { username: decodedUsername, email: userEmail } = decodedJwt;

      localStorage.setItem("username", decodedUsername);
      localStorage.setItem("userEmail", userEmail);
      localStorage.setItem("password", password);

      if (role === "USER") {
        navigate("/User");
      } else if (role === "ADMIN") {
        navigate("/Admin");
      } else {
        console.log("error");
      }
    } catch (err) {
      alert(err);
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      save(event);
    }
  };


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
        {error && <p className="errorMessage">{error}</p>}
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={(Event) => {
                setUsername(Event.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="formSection">
            <label>Email</label>
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(Event) => {
                setEmail(Event.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="formSection">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(Event) => {
                setPassword(Event.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
          </div>
          <button className="btnSignup" onClick={save}>
            SignUp
          </button>
        </div>
      </div>
    </div>
  );
}
