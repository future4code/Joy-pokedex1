import { Box, Grid } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PokemonCard from "../../components/PokemonCard";

function HomePage() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon").then((res) => {
      setPokemons(res.data.results);
    });
  }, []);

  return (
    <Box display={"flex"} justifyContent={"center"}>
    <Grid p={"2em"} templateColumns='repeat(4, 1fr)' gap={4} >
      {pokemons?.map((pokemon) => {
        return <PokemonCard key={pokemon.name} pokemons={pokemon} />;
      })}
    </Grid>
    </Box>
  );
}

export default HomePage;
