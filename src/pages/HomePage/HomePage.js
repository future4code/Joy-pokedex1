import { Box, Button, Grid } from "@chakra-ui/react"
import axios from "axios"
import React, { useContext } from "react"
import PokemonCard from "../../components/PokemonCard"
import { GlobalContext } from "../../GlobalContext/GlobalContext"

function HomePage() {
  //já está sendo recebida as props de pesquisa do header.

  const {
    pokemons,
    setPokemons,
    searchPokemon,
    pokedex,
    setPokedex,
    setLoadMore,
    loadMore,
  } = useContext(GlobalContext)

  const addToPokedex = (pokemon) => {
    setPokedex([...pokedex, pokemon])
  }

  const LoadMorePokemons = (loadMore) => {
    axios
      .get(`${loadMore}`)
      .then((res) => {
        setPokemons([...pokemons, ...res.data.results])
        setLoadMore(res.data.next)
        console.log(loadMore)
        console.log(pokemons)
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  const notInPokedex = pokemons?.filter((pokemon) => {
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
    <Box
      display={"flex"}
      justifyContent={"center"}
      flexFlow={"column"}
      alignItems={"center"}
    >
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
      <Box>
        <Button onClick={() => LoadMorePokemons(loadMore)}>
          Carregar Mais
        </Button>
      </Box>
    </Box>
  )
}

export default HomePage
