import React from 'react';
import "./user.css";

export default function User() {
  const appoinments = [
    { id: 1, name: "sunith", contact: "0776117695", date: "2024.02.02", time:"08.00" },
    ];

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
            {appoinments.map((appoinments, index) => (
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
          <button className="logOut">
          Log Out
        </button>
        </div>
      </div>
  
  );
}
