import "./admin.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [appointments, setAppointments] = useState([]);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
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
      .get("http://localhost:8080/appointment/all", {
        headers: { Authorization: authHeader },
      })
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  }, []);

  const handleAddTime = async (event) => {
    event.preventDefault();

    if (!date || !startTime || !endTime) {
      alert("Please fill in all fields.");
      return;
    }

    const formattedDate = new Date(date).toISOString().split("T")[0];
    const startTimeWithSeconds = `${startTime}:00`;
    const endTimeWithSeconds = `${endTime}:00`;

    console.log("User Input:");
    console.log("Date:", date);
    console.log("Start Time:", startTime);
    console.log("End Time:", endTime);

    console.log("Formatted Values:");
    console.log("Formatted Date:", formattedDate);
    console.log("Formatted Start Time:", startTimeWithSeconds);
    console.log("Formatted End Time:", endTimeWithSeconds);

    try {
      const email = localStorage.getItem("userEmail");
      const password = localStorage.getItem("password");

      if (!email || !password) {
        alert("Authentication error. Please log in again.");
        return;
      }

      const authHeader = `Basic ${btoa(`${email}:${password}`)}`;
      
      console.log("Sending API request with data:", {
        date: formattedDate,
        startTime: startTimeWithSeconds,
        endTime: endTimeWithSeconds,
      });

      const response = await axios.post(
        "http://localhost:8080/timeslot/create",
        {
          date: formattedDate,
          startTime: startTimeWithSeconds,
          endTime: endTimeWithSeconds,
        },
        {
          headers: { Authorization: authHeader },
        }
      );

      console.log("Response:", response.data);
      setDate("");
      setStartTime("");
      setEndTime("");
      alert("Time slot added successfully!");
    } catch (error) {
      console.error("Error adding time slot:", error);
      alert("Failed to add time slot.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("password");
    window.location.href = "/";
  };

  const handleTimeSlots = () => {
    navigate("/TimeSlots");
  };

  return (
    <div className="home1">
      <div className="mainContent1">
        <div className="admin1">Admin Panel</div>

        <form className="timeSlots1">
          <div className="fieldsContainer1">
            <div className="fields1">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="fields1">
              <label htmlFor="startTime">Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="fields1">
              <label htmlFor="endTime">End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
          <div className="buttonContainer">
  <button className="add1" type="submit" onClick={handleAddTime}>
    ADD AVAILABLE TIME
  </button>
  <button className="add2" type="button" onClick={handleTimeSlots}>
    VIEW TIME SLOTS
  </button>
</div>

        </form>

        <div className="tableContainer1">
          <table className="userTable1">
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
              {appointments.map((appointment, index) => (
                <tr key={appointment.id}>
                  <td>{index + 1}</td>
                  <td>{appointment.name || "N/A"}</td>
                  <td>{appointment.contact || "N/A"}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button className="logOut1" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
}
