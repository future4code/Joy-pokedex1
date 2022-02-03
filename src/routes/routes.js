import React , {useState} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import HomePage from "../pages/HomePage/HomePage";
import PokedexPage from "../pages/PokedexPage/PokedexPage";
import PokemonDetailsPage from "../pages/PokemonDetailsPage/PokemonDetailsPage";

const ConfigRoutes = () => {

  const [searchPokemon, setSearchPokemon] = useState("")

  return (
    <BrowserRouter>
      <Header  searchPokemon={searchPokemon} setSearchPokemon={setSearchPokemon}/>
      <Routes>
        <Route path="/" element={<HomePage searchPokemon={searchPokemon} />} />
        <Route path="/pokedex" element={<PokedexPage />} />
        <Route path="/pokemon/details" element={<PokemonDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default ConfigRoutes;
