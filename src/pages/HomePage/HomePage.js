import { Box, Grid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import PokemonCard from "../../components/PokemonCard";
import { httpClient, url } from "../../constants";

function HomePage(props) {

//já está sendo recebida as props de pesquisa do header.

  const [pokemons, setPokemons] = useState([]);



  useEffect(() => {
    httpClient.get(`${url}`).then(({data}) => {
      setPokemons(data.results);
    });
  }, []);


  return (
    <Box display={"flex"} justifyContent={"center"}>
    <Grid p={"2em"} templateColumns='repeat(4, 1fr)' gap={10} >
      {pokemons?.filter(pokemon => {
        return  pokemon.name.toLowerCase().includes(props.searchPokemon.toLowerCase())
      }).map((pokemon) => {
        return <PokemonCard key={pokemon.name} pokemons={pokemon} />;
      })}
    </Grid>
    </Box>
  );
}

export default HomePage;
