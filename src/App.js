import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/auth/Login";
import Navbar from "./components/Navbar";
import Masyarakat from "./components/dashboard/masyarakat/Masyarakat";
import Consultasion from "./components/dashboard/masyarakat/Consultasion";
import Vaksinasi from "./components/dashboard/masyarakat/Vaksinasi";
import Doctor from "./components/dashboard/doctor/Doctor";
import TempatVaksinasi from "./components/dashboard/masyarakat/TempatVaksinasi";
import DetailTempat from "./components/dashboard/masyarakat/DetailTempat";

function App() {


  return (
    <>
    <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/masyarakat" element={<Masyarakat />} />
          <Route path="/masyarakat/consultasion" element={<Consultasion />} />
          <Route path="/masyarakat/vaksinasi" element={<Vaksinasi />} />
          <Route path="/masyarakat/tempat/vaksinasi" element={<TempatVaksinasi />} />
          <Route path="/masyarakat/tempat/vaksinasi/:id" element={<DetailTempat />} />


          {/* doctor route */}
          <Route path="/doctor" element={<Doctor />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
