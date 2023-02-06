import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import './App.css';
import Login from './components/Login/Login';


function App() {
  return (
    <>
          <Navbar bg='primary' expand='sm'variant='dark' className='fw fw-bold'>
            <Container>
              <Navbar.Brand>MAIL-BOX</Navbar.Brand>
            </Container>
          </Navbar>
          <Login/>
    </>
  );
}

export default App;
