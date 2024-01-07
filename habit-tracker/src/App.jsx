import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// page imports
import Login from "./pages/Login";
import DailyForm from './pages/dailyForm'
import Dashboard from './pages/dashboard'
import SignUp from "./pages/signUp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/dailyForm' element={<DailyForm />}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
