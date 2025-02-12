import React from "react";
import "./loadingPage.css";

export default function LoadingPage() {
  return (
    <div className="containerLo">
      <div className="card">
        <h1 className="txt">Welcome to Appointment Booking System</h1>
        <div className="load"></div>
        <h2 className="txt2">Loading...</h2>
      </div>
    </div>
  );
}
