import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AddTrip } from './pages/AddTrip';
import { Home } from './pages/Home'
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Welcome } from './pages/Welcome';
import { AddVehicle } from './pages/AddVehicle';
import { SearchTrip } from './pages/SearchTrip';
import { Account } from './pages/Account'
import { SearchTripResult } from './pages/SearchTripResult';

function App() {
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addtrip" element={<AddTrip />} />
          <Route path="/addvehicle" element={<AddVehicle />} />
          <Route path="/search" element={<SearchTrip />} />
          <Route path="/searchresult" element={<SearchTripResult />} />
          <Route path="/account" element={<Account />} />
        </Routes>
        </BrowserRouter>
    );
  }
  
export default App;
