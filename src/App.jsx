

import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Aktif from "./components/Aktif"
import Selesai from "./components/Selesai"


function App() {


  return (
    <>
  <Routes>
      <Route path="/" element={<Home/> }/>
      <Route path="/aktif" element={<Aktif/> }/>
      <Route path="/selesai" element={<Selesai/> }/>
  </Routes>
   
      
    </>
  )
}

export default App
