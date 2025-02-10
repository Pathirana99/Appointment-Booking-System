import "./admin.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [appointments, setAppointments] = useState([]);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/appointment/all")
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  }, []);

  const handleaddtime = async (event) => {
    event.preventDefault();
  
    // Add ':00' for seconds in the time
    const startTimeWithSeconds = startTime + ":00";
    const endTimeWithSeconds = endTime + ":00";
  
    try {
      // Assuming you have a stored JWT token
      const token = localStorage.getItem("authToken"); // or sessionStorage, or any other place where you store the token
  
      await axios.post(
        "http://localhost:8080/timeslot/create",
        {
          date: date,
          startTime: startTimeWithSeconds,
          endTime: endTimeWithSeconds,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
          },
        }
      );
  
      // Clear the form fields after successful submission
      setDate("");
      setStartTime("");
      setEndTime("");
    } catch (error) {
      console.error("Error adding time slot:", error);
    }
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
          <button
            className="add1"
            type="submit"
            onClick={handleaddtime}
          >
            ADD AVAILABLE TIME
          </button>
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

        <button className="logOut1">Log Out</button>
      </div>
    </div>
  );
}
