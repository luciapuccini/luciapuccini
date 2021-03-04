import React from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import logo from "./assets/GitHub_Logo.png";

import Container from "react-bootstrap/Container";
function App() {
  return (
    <Container style={{ marginTop: "100px" }}>
      <h1>Lucia Puccini</h1>
      <Alert variant="info" style={{ width: "300px", textAlign: "center" }}>
        Testing page
      </Alert>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <a href="zoommtg://updateai/?meetingid=123">update test </a>
        <a href="updateai://updateai/?meetingid=123">update test </a>
      </div>
      <br />
      <Button href="./assets/sample-zoom-app.zip" download="sample-zoom-app">
        download app
      </Button>
      <div style={{ position: "fixed", bottom: 0, right: 0 }}>
        <a href="https://github.com/luciapuccini/">
          <Image src={logo} roundedCircle style={{ height: "30px" }} />
        </a>
      </div>
    </Container>
  );
}

export default App;
