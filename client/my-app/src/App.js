import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Header } from './components/Header';
import {Container} from 'react-bootstrap'
import { Home } from './pages/Home'
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Aboutus } from './pages/Aboutus';
function App() {
    return (
        <BrowserRouter>
        <Header/>
        <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/aboutus" element={<Aboutus />} />
        </Routes>
        </Container>
        </BrowserRouter>
    );
  }
  
export default App;
