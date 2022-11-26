import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { AddModifyTrip } from './pages/AddModifyTrip';
import { Home } from './pages/Home'
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Welcome } from './pages/Welcome';
import { AddVehicle } from './pages/AddVehicle';
import { SearchTrip } from './pages/SearchTrip';
import { Account } from './pages/Account'

function App() {
    return (
        <BrowserRouter>
        
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addmodify" element={<AddModifyTrip />} />
          <Route path="/addvehicle" element={<AddVehicle />} />
          <Route path="/searchtrip" element={<SearchTrip />} />
          <Route path="/account/:id" element={<Account />} />
          
        </Routes>
        </BrowserRouter>
    );
  }
  
export default App;
