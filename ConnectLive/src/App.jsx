import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import Room from './pages/Room/Room'

function App() {
  const [count, setCount] = useState(0)


  return (
    <>
   



    <div className="wrapper bg-[#3c3c3c] text-white min-h-screen w-full">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/room/:roomid" element={<Room />} />



    </Routes>
    </div>
    </>
  )
}

export default App
