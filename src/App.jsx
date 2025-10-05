// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/Navbar";
import Footer from "./components/Footer"; 
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import CreateEdit from "./pages/CreateEdit";
import Listado from "./pages/Listado";


function App() {
  return (
    <Router>
      <AppNavbar />
      <div className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateEdit />} />
          <Route path="/edit/:id" element={<CreateEdit />} />
          <Route path="/item/:id" element={<Detail />} />
          <Route path="/listado" element={<Listado />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
