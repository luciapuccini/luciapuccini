import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import Container from 'react-bootstrap/Container'
function App() {
  return (
     <Container >
       <div style={{marginTop:'20px'}}></div>
        <h1>Lucia Puccini</h1>
        <Alert variant='info' style ={{width: '300px', textAlign: 'center'}} >
            Under Development
         </Alert>
        <Button
          variant="dark"
          href='https://github.com/luciapuccini/'
        >
        Get To know me!
      </Button>
      <div style={{marginTop:'110px'}}></div>

      <div style={{marginTop:'20px'}}>
      <Button
          href='https://app.dashboard.testingnet.com/app?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJIaWJ1Iiwic3ViIjoicGVyZm9ybWFuY2UuZGFzaGJvYXJkQGhpYnUuY29tIiwiZXhwIjoxNTY2OTM3OTYxMTA1LCJpYXQiOjE1NjY5Mzc5NTc1MDUsImxhc3ROYW1lIjoiZGF0IiwiZmlyc3ROYW1lIjoibWF0dCIsImludGVybmFsVXNlckVtYWlsIjoianVuLnpoYW5nQGhpYnUuY29tIiwiaW50ZXJuYWxVc2VyTGFzdE5hbWUiOiJaaGFuZyIsImludGVybmFsVXNlckZpcnN0TmFtZSI6Ikp1biIsInJlZ2lvbktleSI6IjgiLCJyZWdpb25Db2RlIjoiTUlEQVRMIiwiZGlhZEFjY291bnRJZCI6IkEyMURMRCIsInNvdXJjZSI6InNhbGVmb3JjZSIsImJ1c2luZXNzTmFtZSI6Ik1hdCdzIDk5IEN0ciIsImludGVybmFsVXNlciI6dHJ1ZSwicm9sZSI6InJlYWR3cml0ZSIsImJ1c2luZXNzSWQiOiI5ODQ3NTYiLCJpbnRlZ3JhdGlvbklkIjoiOTg0NzU2IiwidXNlckd1aWQiOiIwMDUzMTAwMDAwN2oySFhBQVkiLCJlbWFpbElkIjoibWF0ZGF0QHFhdGVzdGluZy5jb20ifQ.Um-BkWILGJ0JyvSFgHFAhWPNHx9Alch3dp9jWziLe09JAzzBTNsQksXhxU5baSkLCKdKQx5tvNLFINnivJt3mlWP4ukCp_KyZoJyeYXLxq3K8We_nMLVeIq2eo9fq9XN6V01A8L8iee_4ms9jQ4VFg4iJK46995rzcOQZDM7zvw'
        >
        SSO UAT
      </Button>
      </div>

      <div style={{marginTop:'20px'}}>
      <Button
          href='https://app.dashboard.hibu.com/app?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJIaWJ1Iiwic3ViIjoicGVyZm9ybWFuY2UuZGFzaGJvYXJkQGhpYnUuY29tIiwiZXhwIjoxNTY2OTM3OTYxMTA1LCJpYXQiOjE1NjY5Mzc5NTc1MDUsImxhc3ROYW1lIjoiZGF0IiwiZmlyc3ROYW1lIjoibWF0dCIsImludGVybmFsVXNlckVtYWlsIjoianVuLnpoYW5nQGhpYnUuY29tIiwiaW50ZXJuYWxVc2VyTGFzdE5hbWUiOiJaaGFuZyIsImludGVybmFsVXNlckZpcnN0TmFtZSI6Ikp1biIsInJlZ2lvbktleSI6IjgiLCJyZWdpb25Db2RlIjoiTUlEQVRMIiwiZGlhZEFjY291bnRJZCI6IkEyMURMRCIsInNvdXJjZSI6InNhbGVmb3JjZSIsImJ1c2luZXNzTmFtZSI6Ik1hdCdzIDk5IEN0ciIsImludGVybmFsVXNlciI6dHJ1ZSwicm9sZSI6InJlYWR3cml0ZSIsImJ1c2luZXNzSWQiOiI5ODQ3NTYiLCJpbnRlZ3JhdGlvbklkIjoiOTg0NzU2IiwidXNlckd1aWQiOiIwMDUzMTAwMDAwN2oySFhBQVkiLCJlbWFpbElkIjoibWF0ZGF0QHFhdGVzdGluZy5jb20ifQ.Um-BkWILGJ0JyvSFgHFAhWPNHx9Alch3dp9jWziLe09JAzzBTNsQksXhxU5baSkLCKdKQx5tvNLFINnivJt3mlWP4ukCp_KyZoJyeYXLxq3K8We_nMLVeIq2eo9fq9XN6V01A8L8iee_4ms9jQ4VFg4iJK46995rzcOQZDM7zvw '
        >
        SSO Prod
      </Button> 
     </div>
      

     </Container>
  );
}

export default App;
