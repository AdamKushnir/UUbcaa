//EventCard.js
import { useContext, useState, useEffect } from "react";

import { PlayerListContext } from "./PlayerListContext.js"; // Importovat kontext hráčů

import Button from "react-bootstrap/esm/Button.js";
import EventDateTimeBadge from "./EventDateTimeBadge";
import EventDetail from "./EventDetail";
import Icon from "@mdi/react";
import { mdiEyeOutline, mdiPencil, mdiTrashCanOutline } from "@mdi/js";
import { useNavigate } from "react-router-dom";

function EventCard({ event, setShowEventForm, setShowConfirmDeleteDialog }) {
  const navigate = useNavigate();
  const { PlayerList } = useContext(PlayerListContext); // Získat seznam hráčů z kontextu
  const [topPlayers, setTopPlayers] = useState([]);

  useEffect(() => {
    // Funkce pro získání tří nejlepších hráčů pro daný zápas podle ratingu
    const getTopPlayers = () => {
      const playersForMatch = PlayerList.filter((player) => player.matchId === event.id);
      const sortedPlayers = playersForMatch.sort((a, b) => b.rating - a.rating);
      const topThreePlayers = sortedPlayers.slice(0, 3);
      setTopPlayers(topThreePlayers);
    };

    getTopPlayers();
  }, [PlayerList, event]);

  return (
    <div className="card border-0 shadow rounded" style={componentStyle()}>
      <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "0px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <EventDateTimeBadge event={event} />
          <EventDetail event={event} />
        </div>
        {/* Zobrazení tří nejlepších hráčů */}
        <div style={{ marginTop: "10px" }}>
          <h5>Top Player:</h5>
          {topPlayers.map((player) => (
            <div key={player.id}>{player.name} - Rating: {player.rating}</div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "4px", marginTop: "10px" }}>
          <IconButton onClick={() => navigate("/eventDetail?id=" + event.id)} icon={mdiEyeOutline} />
          <IconButton onClick={() => setShowEventForm(event)} icon={mdiPencil} />
          <IconButton onClick={() => setShowConfirmDeleteDialog(event)} icon={mdiTrashCanOutline} variant="danger" />
        </div>
      </div>
    </div>
  );
}

function IconButton({ onClick, icon, variant }) {
  return (
    <Button onClick={onClick} size={"sm"} variant={variant} style={{ width: "32px", height: "32px", padding: "0", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Icon path={icon} size={0.7} />
    </Button>
  );
}

function componentStyle() {
  return {
    margin: "12px auto",
    maxWidth: "640px",
  };
}

export default EventCard;