import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import Icon from "@mdi/react";
import { mdiSoccer } from "@mdi/js";
import Button from "react-bootstrap/esm/Button";

function NavBar() {
  const navigate = useNavigate();
  const [showWhiteLine, setShowWhiteLine] = useState(false);

  const handleMouseEnter = () => {
    setShowWhiteLine(true);
  };

  const handleMouseLeave = () => {
    setShowWhiteLine(false);
  };

  return (
    <Navbar expand="lg" style={componentStyle()}>
      <Container>
        <Navbar.Brand>
          <Button
            style={brandStyle()}
            onClick={() => navigate("/")}
            variant="dark"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Icon path={mdiSoccer} size={0.8} color={"#eff5fb"} spin={3} />
            CHELSEA SCORED BOARD
            {showWhiteLine && <div style={whiteLineStyle()}></div>}
          </Button>
        </Navbar.Brand>
        <div style={logoStyle()}>
          <img
            src="https://img.chelseafc.com/image/upload/f_auto,c_pad,w_230,h_230,ar_1,q_auto:best/Site%20Chelsea%20Badges/Main_Website_Badge_-_Colour.png"
            alt="Chelsea FC Badge"
            style={{ width: "40px", height: "40px", position: "absolute", top: "30%", right: "10px", transform: "translateY(-20%)" }}
          />
        </div>
      </Container>
    </Navbar>
  );
}

function componentStyle() {
  return {
    backgroundColor: "#064585",
    paddingTop: "10px",
    paddingBottom: "10px",
    position: "relative",
  };
}

function brandStyle() {
  return {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#eff5fb",
    backgroundColor: "#064585",
    borderRadius: "5px",
    padding: "1px 10px",
    fontSize: "14px",
    fontFamily: "Arial, sans-serif",
    fontWeight: "bold",
    border: "none",
    marginLeft: "10px",
    position: "relative",
  };
}

function whiteLineStyle() {
  return {
    position: "absolute",
    bottom: "0",
    left: "50%",
    transform: "translateX(-50%)",
    width: "95%",
    height: "2px",
    backgroundColor: "#eff5fb",
  };
}

function logoStyle() {
  return {
    position: "absolute",
    top: "10px",
    right: "10px",
  };
}

export default NavBar;
