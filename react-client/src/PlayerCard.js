import Button from "react-bootstrap/esm/Button.js";
import { useNavigate } from "react-router-dom";

import PlayerDateTimeBadge from "./PlayerDateTimeBadge";

import Icon from "@mdi/react";
import { mdiEyeOutline, mdiPencil, mdiTrashCanOutline } from "@mdi/js";

function PlayerCard({ Player, setShowPlayerForm, setShowConfirmDeleteDialog }) {
  const navigate = useNavigate();

  return (
    <div className="card border-0 shadow rounded" style={componentStyle()}>
      <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "0px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <PlayerDateTimeBadge Player={Player} />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "4px" }}>
          <IconButton onClick={() => setShowPlayerForm(Player)} icon={mdiPencil} />
          <IconButton onClick={() => setShowConfirmDeleteDialog(Player)} icon={mdiTrashCanOutline} variant="danger" />
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

export default PlayerCard;