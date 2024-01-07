import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// page imports
import Login from "./pages/Login";
import DailyForm from "./pages/dailyForm";
import SignUp from "./pages/signUp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dailyform" element={<DailyForm />} />
      </Routes>
    </>
  );
}

export default App;
