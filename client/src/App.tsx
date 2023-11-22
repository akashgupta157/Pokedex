import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import SinglePokemon from "./Pages/SinglePokemon";
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:pokemon/:id" element={<SinglePokemon />} />
      </Routes>
    </>
  )
}
