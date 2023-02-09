import React from 'react';
import { Container, Navbar, NavLink } from 'react-bootstrap';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import Main from './components/pages/Main';




function App() {
  return (
    <BrowserRouter>
    <>
          <Navbar bg='primary' expand='sm'variant='dark' className='fw fw-bold'>
            <Container>
              <Navbar.Brand>MAIL-BOX</Navbar.Brand>
              <NavLink as={Link} to='/login'>login</NavLink>
            </Container>
          </Navbar>
          
          
    </>
    <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/main' element={<Main/>}/>
        
    </Routes>
    </BrowserRouter>

    


  );
}

export default App;
