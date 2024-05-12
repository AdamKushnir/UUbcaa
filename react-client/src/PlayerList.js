import { useContext, useState } from "react";
import { PlayerListContext } from "./PlayerListContext.js";

import Button from "react-bootstrap/esm/Button.js";

import PlayerCard from "./PlayerCard.js";
import PlayerForm from "./EventForm.js";
import Container from "react-bootstrap/esm/Container.js";

import Icon from "@mdi/react";
import { mdiPlusBoxOutline, mdiPlusBoxMultipleOutline } from "@mdi/js";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog.js";

function PlayerList() {
  const { PlayerList } = useContext(PlayerListContext);
  const [showPlayerForm, setShowPlayerForm] = useState(false);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);

  const filteredPlayerList = PlayerList.filter(
    (Player) => new Date(Player.date) > new Date()
  );

  //Odpovida za add match upravit vzhled se mi nelibi
  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
        <Button variant="success" onClick={() => setShowPlayerForm({})}>
          <Icon path={mdiPlusBoxOutline} size={1} color={"white"} /> Nová
          událost
        </Button>
        {/*<Button variant="success" disabled>
          <Icon path={mdiPlusBoxMultipleOutline} size={1} color={"white"} />{" "}
          Nové události
        </Button>*/}
      </div>
      {!!showPlayerForm ? (
        <PlayerForm Player={showPlayerForm} setShowPlayerForm={setShowPlayerForm} />
      ) : null}
      {!!showConfirmDeleteDialog ? (
        <ConfirmDeleteDialog
          Player={showConfirmDeleteDialog}
          setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
        />
      ) : null}
      {filteredPlayerList.map((Player) => {
        return (
          <PlayerCard
            key={Player.id}
            Player={Player}
            setShowPlayerForm={setShowPlayerForm}
            setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
          />
        );
      })}
    </Container>
  );
}

export default PlayerList;
