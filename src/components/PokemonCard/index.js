import { Box, Button, Center, Flex, Image, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { httpClient } from "../../constants"
import "../../index.css"
import { goToPokemonDetailsPage } from "../../routes/coordinator"
const PokemonCard = ({ pokemons, handleClick, textButton }) => {
  const [pokemon, setPokemon] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    httpClient.get(`${pokemons.name}`).then((res) => {
      const { id, types, sprites } = res.data
      
      setPokemon({
        id,
        image: sprites.other["official-artwork"].front_default,
        type: types.map((type) => {
          return {
            name: type["type"].name,
          }
        }),
      })
    })
  }, [pokemons.name])

  return (
    <Box
      boxShadow="rgb(0 0 0 / 30%) 0px 4px 8px 0px"
      rounded={"md"}
      p={"1em"}
      w={"16em"}
      h={"auto"}
      fontFamily={"Flexo-Demi"}
      _hover={{ transform: `translate(0px, -5px)` }}
      cursor={"pointer"}
    >
      <Image
        src={pokemon.image}
        onClick={() => goToPokemonDetailsPage(navigate, pokemon.id)}
      />
      <Text color={"text.gray"}>Nº{pokemon.id}</Text>
      <Text fontSize="2xl">{pokemons.name}</Text>
      <Flex>
        {pokemon.type?.length >= 2 ? (
          pokemon.type.map((type) => {
            return (
              <Box
                key={type.name}
                bg={`type.${type.name}`}
                m={"0.5em"}
                borderRadius={"8"}
                w={"10em"}
                h={"1.5em"}
              >
                <Text color={"white"} textAlign={"center"}>
                  {type.name}
                </Text>
              </Box>
            )
          })
        ) : (
          <Box
            bg={`type.${pokemon?.type?.[0].name}`}
            m={"0.5em auto"}
            borderRadius={"8"}
            w={"10em"}
            h={"1.5em"}
          >
            <Text color={"white"} textAlign={"center"}>
              {pokemon?.type?.[0].name}
            </Text>
          </Box>
        )}
      </Flex>
      <Center>
        <Button
          bg={"background.blue"}
          color={"white"}
          p={2}
          mt={2}
          _hover={{ bg: "blue.500" }}
          onClick={handleClick}
        >
          {textButton}
        </Button>
      </Center>
    </Box>
  )
}
export default PokemonCard
