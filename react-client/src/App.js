import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import EventList from "./EventList";
import UserProvider from "./UserProvider";
import EventListProvider from "./EventListProvider";
import EventProvider from "./EventProvider";
import EventRoute from "./EventRoute";
import PlayerListProvider from "./PlayerListProvider"; // Import PlayerListProvider

function App() {
  return (
    <div style={componentStyle()}>
      <UserProvider>
        <PlayerListProvider> {/* Přidáme PlayerListProvider */}
          <EventListProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<EventList />} />
                  <Route
                    path="eventDetail"
                    element={
                      <EventProvider>
                        <EventRoute />
                      </EventProvider>
                    }
                  />
                  <Route path="*" element={"not found"} />
                </Route>
              </Routes>
            </BrowserRouter>
          </EventListProvider>
        </PlayerListProvider>
      </UserProvider>
    </div>
  );
}

function componentStyle() {
  return {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: "#00578d",
  };
}

export default App;
