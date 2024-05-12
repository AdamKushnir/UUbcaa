import React from "react";

function PlayerDateTimeBadge({ Player }) {
  const dateToShow = Player.date;
  const homeTeam = Player.homeTeam;
  const awayTeam = Player.awayTeam;
  const homeGoals = Player.homeTeamGoals;
  const awayGoals = Player.awayTeamGoals;

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
  return date;
}

function componentStyle() {
  return {
    width: "200px",
    backgroundColor: "#d63232",
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

export default PlayerDateTimeBadge;

