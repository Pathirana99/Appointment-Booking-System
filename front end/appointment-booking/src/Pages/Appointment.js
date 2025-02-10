import React, { useEffect, useState } from "react";
import axios from "axios";
import "./appointment.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";



export default function Appointment() {
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [userId, setId] = useState("");
  const navigate = useNavigate();

  // Fetch time slots for the selected date
  const fetchTimeSlots = async (date) => {
    try {
      const response = await axios.get(`http://localhost:8080/timeslot/get/${date}`);
      setTimeSlots(response.data);
    } catch (error) {
      console.error("Error fetching time slots:", error);
    }
  };
   useEffect(() => {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        const decodedJwt = jwtDecode(jwt);
        setId(decodedJwt.userId);
      }
    }, []);

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    fetchTimeSlots(date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name || !contact || !selectedDate || !selectedTime) {
      alert("Please fill all the fields and select a time slot.");
      return;
    }

    if (!userId) {
      alert("User is not logged in.");
      return;
    }
    const appointmentData = {
      name,
      contact,
      date: selectedDate,
      time: selectedTime,
    };

    axios
      .post(`http://localhost:8080/appointment/save/${userId}`, appointmentData)
      .then((response) => {
        deleteTimeSlot(selectedDate, selectedTime);
        navigate("/User");
      })
      .catch((error) => {
        console.error("Error booking appointment:", error);
      });
  };

  const deleteTimeSlot = (date, time) => {
    axios
      .delete(`http://localhost:8080/timeslot/delete?date=${date}&startTime=${time}`)
      .then((response) => {
        console.log("Time slot deleted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting time slot:", error);
      });
  };

  return (
    <div className="appointment">
      <div className="Header">
        <h2>Book an Appointment</h2>
      </div>
      <div className="Form">
        <form onSubmit={handleSubmit}>
          <div className="Group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="Group">
            <label htmlFor="contact">Contact</label>
            <input
              type="text"
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Enter your contact number"
              required
            />
          </div>

          <div className="Group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={handleDateChange}
              required
            />
          </div>

          <div className="Group">
            <label htmlFor="time">Available Time Slots</label>
            <div className="timeSlots">
              {timeSlots.length > 0 ? (
                timeSlots.map((slot) => (
                  <button
                    type="button"
                    key={slot.id}
                    className={`timeSlot ${
                      selectedTime === slot.startTime ? "selected" : ""
                    }`}
                    onClick={() => handleTimeSelect(slot.startTime)}
                  >
                    {slot.startTime}
                  </button>
                ))
              ) : (
                <p>No time slots available for the selected date.</p>
              )}
            </div>
          </div>

          <button type="submit" className="submit">
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
}
