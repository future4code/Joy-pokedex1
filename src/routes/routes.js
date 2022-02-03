import React, { useContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import { GlobalStorage } from "../GlobalContext/GlobalContext";
import HomePage from "../pages/HomePage/HomePage";
import PokedexPage from "../pages/PokedexPage/PokedexPage";
import PokemonDetailsPage from "../pages/PokemonDetailsPage/PokemonDetailsPage";

const ConfigRoutes = () => {
  const [searchPokemon, setSearchPokemon] = useState("");

  return (
    <BrowserRouter>
      <GlobalStorage>
        <Header
          searchPokemon={searchPokemon}
          setSearchPokemon={setSearchPokemon}
        />
        <Routes>
          <Route
            path="/"
            element={<HomePage searchPokemon={searchPokemon} />}
          />
          <Route path="/pokedex" element={<PokedexPage />} />
          <Route path="/pokemon/details/:id" element={<PokemonDetailsPage />} />
        </Routes>
      </GlobalStorage>
    </BrowserRouter>
  );
};

export default ConfigRoutes;
