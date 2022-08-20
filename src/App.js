import React from "react";
import { Alert, Col, Row, Container, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

const mailIcon = <FontAwesomeIcon icon={faEnvelopeOpen} />;
const linkedinIcon = <FontAwesomeIcon icon={faLinkedinIn} />;

const App = () => (
  <Container style={{ marginTop: "100px" }}>
    <h1>Lucia Puccini</h1>
    <Alert variant="danger" style={{ width: "300px", textAlign: "center" }}>
      Under development
    </Alert>
    <Row sm="1" md="1" lg="1">
      <Col md="6" lg="6">
        <h2>About me</h2>
        <p>
          I'm a front-end developer mainly working with React.JS and React
          Native. I consider myself an experienced engineer, who can adapt
          quickly to new challenges using up-and-comming technologies. 
        </p>
        <p>
          <b>Feel free to contact me at:</b>
        </p>
        <p>
          <a href="mailto:puccinilucia@gmail.com">
            {mailIcon} puccinilucia@gmail.com
          </a>
        </p>
        <p>
          <a href="https://www.linkedin.com/in/luciapuccini/">
            {linkedinIcon} linkedin
          </a>
        </p>
      </Col>
      <Col md="5" lg="5">
        <h2>Some of my work</h2>

        <ListGroup>
          <ListGroup.Item
            className="listItem"
            action
            href="http://cyselectronics.com"
          >
            controles y sistemas electronics - website
          </ListGroup.Item>
          <ListGroup.Item
            className="listItem"
            action
            href="http://totoracingteam.com"
          >
            Toto Racing Team - website
          </ListGroup.Item>
          <ListGroup.Item
            className="listItem"
            action
            href="https://github.com/luciapuccini/Consultas"
          >
            Consultas - mobile app
          </ListGroup.Item>
        </ListGroup>
        <br></br>
        <p>
          Checkout more at{" "}
          <a href="https://github.com/luciapuccini/">Github &rarr;</a>
        </p>
      </Col>
    </Row>
  </Container>
);

export default App;
