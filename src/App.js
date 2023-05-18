import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Navbar from "./components/Navbar";
import Masyarakat from "./components/dashboard/masyarakat/Masyarakat";

function App() {
  return (
    <>
    <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
        <Route path="/masyarakat" element={<Masyarakat />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
