import React from "react";
import { Routes, Route } from "react-router";
import LoginSignup from "./pages/LoginSignup";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginSignup />} />
      <Route path="/auth" element={<LoginSignup />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="*" element={<LoginSignup />} />
    </Routes>
  );
}

export default App;
