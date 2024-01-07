import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// page imports
import Login from "./pages/Login";
import ALogin from "./pages/ALogin";
import DailyForm from "./pages/dailyForm";
import SignUp from "./pages/signUp";
import ADailyForm from "./pages/AdailyForm"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Alogin" element={<ALogin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dailyform" element={<DailyForm />} />
        <Route path="/Adailyform" element={<ADailyForm />} />


      </Routes>
    </>
  );
}

export default App;
