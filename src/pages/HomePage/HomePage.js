import { Box, Button, Grid, Select } from "@chakra-ui/react"
import axios from "axios"
import React, { useContext, useState } from "react"
import PokemonCard from "../../components/PokemonCard"
import { GlobalContext } from "../../GlobalContext/GlobalContext"
import { SelectContainer } from "./styled"

function HomePage() {
  const [sortParameter, setSortParameter] = useState("default")
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

  const handleSortParameter = ({ target }) => {
    setSortParameter(target.value)
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
      justifyContent={["center"]}
      flexFlow={"column"}
      alignItems={["center"]}
      w={"full"}
      gap={5}
    >
      <SelectContainer>
        <Select
          value={sortParameter}
          onChange={handleSortParameter}
          fontFamily={"Flexo-Demi"}
        >
          <option value={"default"} disabled>
            Ordenar por
          </option>
          <option value={"a-z"}>A-Z</option>
        </Select>
      </SelectContainer>
      <Grid
        p={[0, "1em"]}
        templateColumns={[
          "1fr",
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
          "repeat(3, 1fr)",
          "repeat(4, 1fr)",
        ]}
        gap={[10]}
      >
        {notInPokedex
          ?.filter((pokemon) => {
            return pokemon.name
              .toLowerCase()
              .includes(searchPokemon.toLowerCase())
          })
          .filter((pokemon) => {
            return pokemon.name.includes(searchPokemon)
          })
          .sort((currentPokemon, nextPokemon) => {
            if (sortParameter === "a-z") {
              return currentPokemon.name.localeCompare(nextPokemon.name)
            }
          })
          .map((pokemon) => {
            return pokemon !== 0 ? (
              <PokemonCard
                key={pokemon.name}
                pokemons={pokemon}
                handleClick={() => addToPokedex(pokemon)}
                textButton={"Adicionar à Pokédex"}
              />
            ) : (
              <p> Nenhum Pokemon Localizado</p>
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
