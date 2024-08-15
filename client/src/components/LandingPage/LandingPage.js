import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

const loginBg = "/login_bg.jpg"; 
const loginBgUser = "/bg_login_user.webp"; 

const css = {
  container: {
    height: "100vh",
    overflow: "hidden",
  },
  row: {
    height: "100%",
  },
  image: {
    objectFit: "cover",
  },
  title: {
    marginBottom: "2rem",
    color: "#FFFFFF", 
    fontFamily: "'Press Start 2P', cursive",
    textShadow: "2px 2px #000",
  },
  colBgUserLogin: {
    background: `linear-gradient(90deg, #000000dd, #00000088), url(${loginBgUser})`,
    height: "100%",
  },
  button: {
    backgroundColor: "#FFFFFF", // White background
    borderColor: "#FFFFFF", // White border
    color: "#000000", // Black text
    fontFamily: "'Press Start 2P', cursive",
    boxShadow: "0px 0px 10px 2px rgba(255, 255, 255, 0.8)", // White glow
    textShadow: "1px 1px #000", 
    transition: "transform 0.2s",
  },
  buttonHover: {
    transform: "scale(1.1)",
  },
};

export default function LandingPage() {
  const [hovered, setHovered] = useState(null);

  return (
    <Container fluid style={css.container} className="mt-0 position-absolute w-100">
      <Row className="vh-100" style={css.row}>
        <Col className="p-0 d-none d-md-block d-lg-block" md={6} lg={6}>
          <Image
            src={loginBg}
            fluid
            className="w-100 h-100"
            style={css.image}
          />
        </Col>
        <Col
          style={css.colBgUserLogin}
          className="p-0 d-flex flex-column justify-content-center align-items-center"
          sm={12}
          md={6}
          lg={6}
        >
          <h2 className="title" style={css.title}>
            Welcome
          </h2>

          <Row className="justify-content-center">
            <Col xs="auto">
              <Button
                variant="outline-light"
                size="lg"
                style={{ 
                  ...css.button, 
                  ...(hovered === "login" && css.buttonHover) 
                }}
                href="/login"
                onMouseEnter={() => setHovered("login")}
                onMouseLeave={() => setHovered(null)}
              >
                Login
              </Button>
            </Col>
            <Col xs="auto">
              <Button
                variant="outline-light"
                size="lg"
                style={{ 
                  ...css.button, 
                  ...(hovered === "signup" && css.buttonHover) 
                }}
                href="/signup"
                onMouseEnter={() => setHovered("signup")}
                onMouseLeave={() => setHovered(null)}
              >
                Signup
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
