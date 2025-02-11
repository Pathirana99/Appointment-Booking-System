import React, { useEffect, useState } from "react";
import "./user.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function User() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      const decodedJwt = jwtDecode(jwt);
      setUsername(decodedJwt.username);
      setEmail(decodedJwt.email);
      fetchAppointments(decodedJwt.userId);
    }
  }, []);

  const fetchAppointments = async (userId) => {
    try {
      const email = localStorage.getItem("userEmail");
      const password = localStorage.getItem("password");

      if (!email || !password) {
        alert("Authentication error. Please log in again.");
        return;
      }

      const authHeader = `Basic ${btoa(`${email}:${password}`)}`;

      const response = await axios.get(`http://localhost:8080/appointment/user/${userId}`, {
        headers: { Authorization: authHeader },
      });

      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      alert("Failed to fetch appointments.");
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    
      const email = localStorage.getItem("userEmail");
      const password = localStorage.getItem("password");

      if (!email || !password) {
        alert("Authentication error. Please log in again.");
        return;
      }

      const authHeader = `Basic ${btoa(`${email}:${password}`)}`;

      await axios.delete(`http://localhost:8080/appointment/delete/${appointmentId}`, {
        headers: { Authorization: authHeader },
      });

      setAppointments(appointments.filter((appointment) => appointment.id !== appointmentId));
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("password");

    window.location.href = "/";
  };

  return (
    <div className="home">
      <div className="mainContent">
        <div className="profilePic">
          <div className="profileLetter">{username.charAt(0)}</div>
        </div>

        <div className="userName">{email}</div>

        <button className="addButton" onClick={() => navigate("/appointment")}>
          To get an appointment
        </button>

        <table className="userTable">
          <thead>
            <tr>
              <th>NO</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={appointment.id}>
                <td>{index + 1}</td>
                <td>{appointment.name}</td>
                <td>{appointment.contact}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>
                  <button className="deleteButton" onClick={() => handleDeleteAppointment(appointment.id)}>
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="logOut" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
}
