import { Box, Grid } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PokemonCard from "../../components/PokemonCard";

function HomePage(props) {

//já está sendo recebida as props de pesquisa do header.

  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon").then((res) => {
      setPokemons(res.data.results);
    });
  }, []);

  console.log(pokemons[0].name)
  console.log(props.searchPokemon)

  return (
    <Box display={"flex"} justifyContent={"center"}>
    <Grid p={"2em"} templateColumns='repeat(4, 1fr)' gap={4} >
      {pokemons?.filter(pokemon => {
        return  pokemon.name.includes(props.searchPokemon)
      }).map((pokemon) => {
        return <PokemonCard key={pokemon.name} pokemons={pokemon} />;
      })}
    </Grid>
    </Box>
  );
}

export default HomePage;
