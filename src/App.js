import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const profilePhoto = require('./assets/profile-photo.png')
function App() {
  return (
     <Container >
       <div style={{marginTop:'20px'}}></div>
        <Row style={{ justifyContent:'center', alignItems:'center'}}>
        <h1>Lucia Puccini</h1>
        <Image src={profilePhoto} style={{marginLeft: '20px',height:'100px', width:'100px'}} roundedCircle thumbnail />
        </Row>
      
       <Alert variant='info' style ={{width: '300px', textAlign: 'center'}} >
            Under Development
         </Alert>
        <Button
          variant="dark"
          href='https://github.com/luciapuccini/'
        >
        Get To know me!
      </Button>
       

     </Container>
  );
}

export default App;
