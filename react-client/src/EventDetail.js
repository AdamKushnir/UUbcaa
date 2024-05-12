//EventDetail.js
import React, { useEffect, useState } from "react";
import AttendeeDecision from "./AttendeeDecision";

function EventDetail({ event }) {
  const [eventPlayers, setEventPlayers] = useState([]);

  useEffect(() => {
    const fetchEventPlayers = async () => {
      try {
        const response = await fetch("http://localhost:3000/player/list");
        const data = await response.json();
        setEventPlayers(data);
      } catch (error) {
        console.error("Error fetching event players:", error);
      }
    };

    fetchEventPlayers();
  }, []);

  return (
    <div>
      <div></div>
      <div>
        
      </div>
    </div>
  );
}

export default EventDetail;
