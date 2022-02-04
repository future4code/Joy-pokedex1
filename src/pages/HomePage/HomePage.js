import { Box, Grid, Select } from "@chakra-ui/react"
import React, { useContext } from "react"
import PokemonCard from "../../components/PokemonCard"
import { GlobalContext } from "../../GlobalContext/GlobalContext"

function HomePage() {
  //já está sendo recebida as props de pesquisa do header.

  const { pokemons, searchPokemon, pokedex, setPokedex,sortParameter,setSortParameter,pokemonType,filterTypeParameter,setFilterTypeParameter } =
    useContext(GlobalContext)

  const addToPokedex = (pokemon) => {
    setPokedex([...pokedex, pokemon])
  }

  const updateSortParameter=({target})=>{
    setSortParameter(target.value)
  }

  const updateFilterTypeParameter=({target})=>{
    setFilterTypeParameter(target.value)
    console.log(target.value);
  }
  const notInPokedex = pokemons.filter((pokemon) => {
    const inPokedex = pokedex.find((pokedex) => {
      return pokemon.name === pokedex.name
    })
    if (inPokedex) {
      return false
    } else {
      return true
    }
  }
  )
console.log(notInPokedex);

  return (
    
    <Box display={"flex"} justifyContent={"center"}>
     {/* <Select name="sort" value={sortParameter} onChange={updateSortParameter}>
        <option value={'a-z'}>A-Z</option>
        <option value={'z-a'}>Z-A</option>
      </Select>
      <Select name='filterType' onChange={updateFilterTypeParameter} value={filterTypeParameter}>
       <option value={'grass'}>Grass</option>
       <option value={'poison'}>Poison</option>
       <option value={'fire'}>Fire</option>
       <option value={'water'}>Water</option>
       <option value={'flying'}>Flying</option>
       <option value={'bug'}>Bug</option>
       <option value={'normal'}>Normal</option>
      </Select>*/}
      <Grid p={"2em"} templateColumns="repeat(4, 1fr)" gap={10}>
        {notInPokedex
          ?.filter((pokemon) => {
            return pokemon.name
              .toLowerCase()
              .includes(searchPokemon.toLowerCase())
          })
          .map((pokemon) => {
            return (
              <PokemonCard
                key={pokemon.name}
                pokemons={pokemon}
                handleClick={() => addToPokedex(pokemon)}
                textButton={"Adicionar à Pokédex"}
              />
            )
          })}
      </Grid>
    </Box>
  )
}

export default HomePage
