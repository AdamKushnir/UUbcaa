// EventDateTimeBadge.js
import React from "react";

function EventDateTimeBadge({ event }) {
  const dateToShow = event.date;
  const homeTeam = event.homeTeam;
  const awayTeam = event.awayTeam;
  const homeGoals = event.homeTeamGoals;
  const awayGoals = event.awayTeamGoals;

  return (
    <div className={"rounded"} style={componentStyle()}>
      <div className={"rounded"} style={dateStyle()}>
        <div>{formatDate(dateToShow)}</div>
      </div>
      <div className={"rounded-bottom"} style={timeStyle()}>
        <div>{homeTeam} {homeGoals} : {awayGoals} {awayTeam}</div>
      </div>
    </div>
  );
}

function formatDate(date) {
  const formattedDate = new Date(date);
  const year = formattedDate.getFullYear();
  const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0");
  const day = formattedDate.getDate().toString().padStart(2, "0");
  return `${month}.${day}.${year}`;
}

function componentStyle() {
  return {
    width: "200px",
    backgroundColor: "#012876",
    display: "grid",
    height: "max-content",
  };
}

function dateStyle() {
  return {
    display: "flex",
    justifyContent: "center",
    gap: "4px",
    padding: "8px",
    fontSize: "22px",
    color: "white",
    lineHeight: 1,
  };
}

function timeStyle() {
  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    fontSize: "16px",
    padding: "8px",
    background: "#67869e",
    color: "white",
    textAlign: "center",
  };
}

export default EventDateTimeBadge;
