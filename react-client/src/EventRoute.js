import { useEffect, useState, useContext } from "react";
import EventDateTimeBadge from "./EventDateTimeBadge";
import EventDetail from "./EventDetail";
import { PlayerListContext } from "./PlayerListContext";
import { useNavigate } from "react-router-dom";
import { EventContext } from "./EventContext";

function EventRoute({ setShowEventForm }) {
  const navigate = useNavigate();
  const { event } = useContext(EventContext);
  const { PlayerList } = useContext(PlayerListContext);
  const [allPlayers, setAllPlayers] = useState([]);

  useEffect(() => {
    if (event) {
      const playersForMatch = PlayerList.filter((player) => player.matchId === event.id);
      setAllPlayers(playersForMatch);
    }
  }, [PlayerList, event]);

  return (
    <div className="card border-0 shadow rounded" style={componentStyle()}>
      {event ? (
        <>
          <div style={{ marginBottom: "20px" }}>
            <EventDetail event={event} />
          </div>
          <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
            {allPlayers.map((player) => (
              <div key={player.id} style={{ width: "200px", height: "200px", margin: "5px", backgroundColor: "blue", padding: "10px", borderRadius: "5px", textAlign: "right", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>
                {player.name === "Calobah" && (
                  <div style={{ position: "absolute", top: 0, left: 0, width: "50%", height: "100%", backgroundImage: `url(https://img.chelseafc.com/image/upload/f_auto,h_860,q_50/editorial/people/first-team/2023-24/Trevoh_Chalobah_profile_23-24_with_sponsor_avatar-removebg.png)`, backgroundSize: "cover", backgroundPosition: "center" }} />
                )}
                <div style={{ color: "white", position: "relative", zIndex: 1 }}>
                  <div>{player.name}</div>
                  <div>Rating: {player.rating}</div>
                  <div>Goals: {player.goals}</div>
                  <div>Assists: {player.assists}</div>
                </div>
              </div>
            ))}
          </div>
          <EventDateTimeBadge event={event} />
          {/* Odstranění tlačítek */}
        </>
      ) : (
        "loading..."
      )}
    </div>
  );
}

function componentStyle() {
  return {
    margin: "12px auto",
    padding: "80px",
    display: "grid",
    gridTemplateColumns: "max-content auto 32px",
    columnGap: "80px",
    maxWidth: "640px",
  };
}

export default EventRoute;
