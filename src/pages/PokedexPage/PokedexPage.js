import { Box, Center, Flex, Grid, Image, Text } from "@chakra-ui/react"
import React, { useContext } from "react"
import PokemonCard from "../../components/PokemonCard"
import { GlobalContext } from "../../GlobalContext/GlobalContext"
import PokebolaCinza from "../../assets/pokeball-gray.png"
function PokedexPage() {
  const { pokedex, searchPokemon, setPokedex } = useContext(GlobalContext)

  const removeFromPokedex = (pokemonName) => {
    const newPokedex = pokedex.filter((pokemon) => {
      return pokemonName !== pokemon.name
    })
    setPokedex(newPokedex)
  }

  return (
    <Box display={"flex"} justifyContent={"center"} mt={4} mb={4}>
      {pokedex.length === 0 ? (
        <Flex direction={"column"} width={"20em"} pt={"2em"}>
          <Image src={PokebolaCinza} />
          <Center>
            <Text
              fontFamily={"Flexo-Demi"}
              textAlign={"center"}
              fontSize="4xl"
              color={"gray"}
            >
              Pokédex vazia
            </Text>
          </Center>
        </Flex>
      ) : (
        <Grid  p={[0, "2em"]} templateColumns={["1fr",  "repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"]} gap={[10]}>
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
      )}
    </Box>
  )
}

export default PokedexPage
