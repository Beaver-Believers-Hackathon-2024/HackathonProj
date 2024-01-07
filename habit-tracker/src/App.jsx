import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// page imports
import Login from "./pages/Login";
import DailyForm from './pages/dailyForm'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/dailyForm' element={<DailyForm />}/>
      </Routes>
    </>
  );
}

export default App;
