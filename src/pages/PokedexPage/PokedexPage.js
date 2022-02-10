import { Box, Center, Flex, Grid, Image, Text } from "@chakra-ui/react"
import React, { useContext } from "react"
import PokemonCard from "../../components/PokemonCard"
import { GlobalContext } from "../../GlobalContext/GlobalContext"
import PokebolaCinza from '../../assets/pokeball-gray.png'
function PokedexPage() {
  const { pokedex, searchPokemon, setPokedex } = useContext(GlobalContext)

  const removeFromPokedex = (pokemonName) => {
    const newPokedex = pokedex.filter((pokemon) => {
      return pokemonName !== pokemon.name
    })
    setPokedex(newPokedex)
  }
console.log(pokedex)
  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Grid p={"2em"} templateColumns="repeat(4, 1fr)" gap={10}>
     { pokedex.length === 0 ? 
     <Grid pl={'30em'} pt={'5em'} templateColumns="350px"  templateRows={'330px 170px'}>
    
     <Image src={PokebolaCinza} />
     <Center>
     <Text fontFamily={"Flexo-Demi"} textAlign={'center'} fontSize="4xl" color={'gray'}>Pokédex vazia</Text>
     </Center>
     </Grid>:
        pokedex
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
          })
          }
         
      </Grid>
    </Box>
  )
}

export default PokedexPage
