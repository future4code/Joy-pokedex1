import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "../components/Header"
import { GlobalStorage } from "../GlobalContext/GlobalContext"
import HomePage from "../pages/HomePage/HomePage"
import PokedexPage from "../pages/PokedexPage/PokedexPage"
import PokemonDetailsPage from "../pages/PokemonDetailsPage/PokemonDetailsPage"
import BattlePage from "../pages/BattlePage"
const ConfigRoutes = () => {
  return (
    <BrowserRouter>
      <GlobalStorage>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokedex" element={<PokedexPage />} />
          <Route path="/pokemon/details/:id" element={<PokemonDetailsPage />} />
          <Route path='/arena' element={<BattlePage/>}/>
        </Routes>
      </GlobalStorage>
    </BrowserRouter>
  )
}

export default ConfigRoutes
