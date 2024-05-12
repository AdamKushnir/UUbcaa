import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Matches() {
  const [date, setDate] = useState("");
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/match/create", {
        date,
        homeTeam,
        awayTeam,
      });
      // Přesměrování na jinou stránku po úspěšném vytvoření zápasu
      history.push("/success");
    } catch (error) {
      console.error("Chyba při odesílání dat na server:", error);
    }
  };

  return (
    <div>
      <h1>Přidat nový zápas</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Datum:</label>
          <input
            type="text"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="homeTeam">Domácí tým:</label>
          <input
            type="text"
            id="homeTeam"
            value={homeTeam}
            onChange={(e) => setHomeTeam(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="awayTeam">Hostující tým:</label>
          <input
            type="text"
            id="awayTeam"
            value={awayTeam}
            onChange={(e) => setAwayTeam(e.target.value)}
          />
        </div>
        <button type="submit">Přidat zápas</button>
      </form>
    </div>
  );
}

export default Matches;
