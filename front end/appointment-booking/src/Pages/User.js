import React, { useEffect, useState } from "react";
import "./user.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function User() {

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
      const response = await axios.get(`http://localhost:8080/appointment/user/${userId}`);
      setAppointments(response.data); // Assuming the response contains the appointment array
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };


  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    localStorage.removeItem("userEmail");

    window.location.href = "/";
  };

  return (
    <div className="home">
      <div className="mainContent">
      <div className="profilePic">
          <div className="profileLetter">{username.charAt(0)}</div>
        </div>
        
        <div className="userName">{email}</div>
      
        <button className="addButton" >
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
            </tr>
          </thead>
          <tbody>
            {appointments.map((appoinments, index) => (
              <tr key={appoinments.id}>
                <td>{index + 1}</td>
                <td>{appoinments.name}</td>
                <td>{appoinments.contact}</td>
                <td>{appoinments.date}</td>
                <td>{appoinments.time}</td>
                <td>
                  <button className="deleteButton">DELETE</button>
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
