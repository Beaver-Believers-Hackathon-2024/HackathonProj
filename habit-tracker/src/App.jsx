import { useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css'

// page imports
import login from './pages/login';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<login />} />
      </Routes>
    </>
  )
}

export default App
