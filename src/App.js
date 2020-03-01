import React from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import Container from "react-bootstrap/Container";
function App() {
  return (
    <Container style={{ marginTop: "100px" }}>
      <h1>Lucia Puccini</h1>
      <Alert variant="info" style={{ width: "300px", textAlign: "center" }}>
        Under Development
      </Alert>
      <Button variant="dark" href="https://github.com/luciapuccini/">
        Get To know me!
      </Button>
    </Container>
  );
}

export default App;
