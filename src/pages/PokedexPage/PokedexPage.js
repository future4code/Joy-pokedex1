import { Box, Grid } from "@chakra-ui/react"
import React, { useContext } from "react"
import PokemonCard from "../../components/PokemonCard"
import { GlobalContext } from "../../GlobalContext/GlobalContext"

function PokedexPage() {
  const { pokedex, searchPokemon, setPokedex } = useContext(GlobalContext)

  const removeFromPokedex = (pokemonName) => {
    const newPokedex = pokedex.filter((pokemon) => {
      return pokemonName !== pokemon.name
    })
    setPokedex(newPokedex)
  }

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Grid p={"2em"} templateColumns="repeat(4, 1fr)" gap={10}>
        {pokedex
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
                textButton={"Remover da Pokédex"}
                handleClick={() => removeFromPokedex(pokemon.name)}
              />
            )
          })}
      </Grid>
    </Box>
  )
}

export default PokedexPage
