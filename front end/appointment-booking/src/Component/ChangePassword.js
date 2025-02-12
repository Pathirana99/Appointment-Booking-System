import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./changePassword.css";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      const decodedJwt = jwtDecode(jwt);
      setUserId(decodedJwt.userId);
    } else {
      setError("User is not authenticated.");
      navigate("/login");
    }
  }, [navigate]);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    const email = localStorage.getItem("userEmail");
    const password = localStorage.getItem("password");

    if (!userId || !email || !password) {
      setError("Missing user authentication data.");
      return;
    }

    const authHeader = `Basic ${btoa(`${email}:${password}`)}`;

    try {
      await axios.put(
        `http://localhost:8080/user/${userId}`,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccessMessage("Password changed successfully!");
      setError("");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      const errorMessage = error.response?.data || "Error changing password. Please try again.";
      setError(errorMessage);
      setSuccessMessage("");
    }
  };

  return (
    <div className="changePasswordContainer">
      <h2>Change Password</h2>
      {error && <p className="errorMessage">{error}</p>}
      {successMessage && <p className="successMessage">{successMessage}</p>}
      <form onSubmit={handleChangePassword}>
        <div>
          <label>Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
}
