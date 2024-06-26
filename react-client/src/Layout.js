import { Outlet } from "react-router-dom";

import NavBar from "./NavBar";

const Layout = () => {
  return (
    <>
      <div className="card-header">
        <NavBar />
      </div>
      <div style={bodyStyle()}>
        <Outlet />
      </div>
      <div className="card-footer" style={footerStyle()}>
        <span style={{ color: "white", fontFamily: "Arial, sans-serif", fontSize: "14px" }}>
          © Adam Kušnir
        </span>
      </div>
    </>
  );
};

function bodyStyle() {
  return {
    overflow: "auto",
    padding: "16px",
    flex: "1",
    //borderTop: "white 4px solid",
    //borderBottom: "white 4px solid",
  };
}

function footerStyle() {
  return { padding: "8px", textAlign: "center", backgroundColor: "#064585" };
}

export default Layout;
