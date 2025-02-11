import React, { useEffect, useState } from "react";
import axios from "axios";
import "./timeSlots.css";
import { useNavigate } from "react-router-dom";

export default function TimeSlots() {
  const [timeSlots, setTimeSlots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const password = localStorage.getItem("password");

    if (!email || !password) {
      console.error("No credentials found.");
      return;
    }

    const authHeader = `Basic ${btoa(`${email}:${password}`)}`;

    axios
      .get("http://localhost:8080/timeslot/all", {
        headers: { Authorization: authHeader },
      })
      .then((response) => {
        setTimeSlots(response.data);
      })
      .catch((error) => {
        console.error("Error fetching time slots:", error);
      });
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="slotsContainer">
      <h2 className="text1">Available Time Slots</h2>
      <table className="slotsTable">
        <thead>
          <tr>
            <th>Date</th>
            <th>Start Time</th>
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot, index) => (
            <tr key={index}>
              <td>{slot.date}</td>
              <td>{slot.startTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="backButton" onClick={handleBack}>
        Admin Panel
      </button>
    </div>
  );
}
