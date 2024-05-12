//PlayerListProvider.js
import { useEffect, useState } from "react";
import { PlayerListContext } from "./PlayerListContext.js";



function PlayerListProvider({ children }) {
  const [PlayerLoadObject, setPlayerLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setPlayerLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:3000/player/list`, {
      method: "GET",
    });
    const responseJson = await response.json();
    if (response.status < 400) {
      setPlayerLoadObject({ state: "ready", data: responseJson });
      return responseJson;
    } else {
      setPlayerLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleCreate(dtoIn) {
    setPlayerLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:3000/player/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setPlayerLoadObject((current) => {
        current.data.push(responseJson);
        current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setPlayerLoadObject((current) => {
        return { state: "error", data: current.data, error: responseJson };
      });
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleUpdate(dtoIn) {
    setPlayerLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:3000/player/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setPlayerLoadObject((current) => {
        const PlayerIndex = current.data.findIndex(
          (e) => e.id === responseJson.id
        );
        current.data[PlayerIndex] = responseJson;
        current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setPlayerLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleAttendance(dtoIn) {
    setPlayerLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/attendance/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      await handleLoad();
    } else {
      setPlayerLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  const value = {
    state: PlayerLoadObject.state,
    PlayerList: PlayerLoadObject.data || [],
    handlerMap: { handleCreate, handleUpdate, handleAttendance },
  };

  return (
    <PlayerListContext.Provider value={value}>
      {children}
    </PlayerListContext.Provider>
  );
}

export default PlayerListProvider;
