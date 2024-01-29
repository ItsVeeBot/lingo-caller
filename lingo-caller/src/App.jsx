import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Ball from './Ball'
import Backend from './Backend'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Backend></Backend>} />
        <Route path="/display" element={<Ball></Ball>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
