import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../component/Header";
import HomePage from "../pages/HomePage/HomePage";
import PokedexPage from "../pages/PokedexPage/PokedexPage";
import PokemonDetailsPage from "../pages/PokemonDetailsPage/PokemonDetailsPage";

const routes = () => {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
      
        <Route path="/" element={<HomePage />} />
        <Route path="/pokedex" element={<PokedexPage />} />
        <Route path="/pokemon/details" element={<PokemonDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default routes;
