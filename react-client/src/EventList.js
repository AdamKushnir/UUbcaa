//EventList.js
import { useContext, useState, useEffect } from "react";
import { EventListContext } from "./EventListContext.js";
import { PlayerListContext } from "./PlayerListContext.js";
import Button from "react-bootstrap/esm/Button.js";
import EventCard from "./EventCard";
import EventForm from "./EventForm.js";
import Container from "react-bootstrap/esm/Container.js";
import Icon from "@mdi/react";
import { mdiPlusBoxOutline } from "@mdi/js";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog.js";

function EventList() {
  const { eventList } = useContext(EventListContext);
  const { PlayerList } = useContext(PlayerListContext);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
  const [playersByMatch, setPlayersByMatch] = useState({});

  useEffect(() => {
    const groupedPlayers = PlayerList.reduce((acc, player) => {
      if (!acc[player.matchId]) {
        acc[player.matchId] = [];
      }
      acc[player.matchId].push(player);
      return acc;
    }, {});
    setPlayersByMatch(groupedPlayers);
  }, [PlayerList]);

  // Sort events by date from newest to oldest
  const sortedEventList = eventList.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
        <Button variant="success" onClick={() => setShowEventForm({})}>
          <Icon path={mdiPlusBoxOutline} size={1} color={"white"} /> Add New Match
        </Button>
      </div>
      {!!showEventForm ? (
        <EventForm event={showEventForm} setShowEventForm={setShowEventForm} />
      ) : null}
      {!!showConfirmDeleteDialog ? (
        <ConfirmDeleteDialog
          event={showConfirmDeleteDialog}
          setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
        />
      ) : null}
      {sortedEventList.map((event) => {
        const playersForMatch = playersByMatch[event.id] || [];
        return (
          <EventCard
            key={event.id}
            event={event}
            players={playersForMatch}
            setShowEventForm={setShowEventForm}
            setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
          />
        );
      })}
    </Container>
  );
}

export default EventList;
