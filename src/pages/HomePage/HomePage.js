import { Box, Grid } from "@chakra-ui/react"
import React, { useContext } from "react"
import PokemonCard from "../../components/PokemonCard"
import { GlobalContext } from "../../GlobalContext/GlobalContext"

function HomePage() {
  //já está sendo recebida as props de pesquisa do header.

  const { pokemons, searchPokemon, pokedex, setPokedex } =
    useContext(GlobalContext)

  const addToPokedex = (pokemon) => {
    setPokedex([...pokedex, pokemon])
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
  })

  return (
    <Box display={"flex"} justifyContent={"center"}>
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
