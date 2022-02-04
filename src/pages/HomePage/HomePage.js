import { Box, Grid, Select } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PokemonCard from "../../components/PokemonCard";
import { SelectContainer } from './styled'


function HomePage(props) {

  const [pokemons, setPokemons] = useState([]);
  const [sortParameter, setsortParameter] = useState ("default")

  const handleSortParameter = ({target}) => {
    setsortParameter(target.value)
    console.log(target.value)
  }

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon").then((res) => {
      setPokemons(res.data.results);
    });
  }, []);

console.log(pokemons)
  return (
    <div>
      <SelectContainer display={"flex"}>
        <Select 
        value={sortParameter}
        onChange={handleSortParameter}
        fontFamily={"Flexo-Demi"}
        >
          <option value={"default"} disabled >Ordenar por</option>
          <option value={"a-z"}>A-Z</option>
          <option value={"tipo"}>Tipo</option>
        </Select>
      </SelectContainer>
      <Box display={"flex"} justifyContent={"center"} >
        <Grid p={"2em"} templateColumns='repeat(4, 1fr)' gap={4} >

          {pokemons?.filter(pokemon => {
            return pokemon.name.includes(props.searchPokemon)
          })
          .sort((currentPokemon, nextPokemon)=>{
            if (sortParameter === "a-z"){
              return currentPokemon.name.localeCompare(nextPokemon.name)
            }
            // if (sortParameter === ""){}
          })
          .map((pokemon) => {
            return <PokemonCard key={pokemon.name} pokemons={pokemon} />;
          })
          
          }
        </Grid>
      </Box></div>
  );
}

export default HomePage;
