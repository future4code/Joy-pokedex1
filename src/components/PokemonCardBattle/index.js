import { Box, Center, Flex, Image, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { httpClient } from "../../constants"
import "../../index.css"
import { goToPokemonDetailsPage } from "../../routes/coordinator"
const PokemonCardBattle = ({ pokemons, handleClick, textButton }) => {
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
      p={["0.4em", "1em"]}
      w={["6em", "10em", "10em", "13em"]}
      h={["auto", "12em", "15em", "18em"]}
      fontFamily={"Flexo-Demi"}
      _hover={{ transform: `translate(0px, -5px)` }}
      cursor={"pointer"}
    >
      <Image
        src={pokemon.image}
        onClick={() => goToPokemonDetailsPage(navigate, pokemon.id)}
      />
      <Text color={"text.gray"}>Nº{pokemon.id}</Text>
      <Text fontSize={["small", "2xl"]}>{pokemons.name}</Text>
      <Flex gap={2}>
        {pokemon.type?.length >= 2 ? (
          pokemon.type.map((type) => {
            return (
              <Box
                key={type.name}
                bg={`type.${type.name}`}
                borderRadius={"8"}
                w={["5em", "5em", "10em"]}
                p={["0.1em"]}
              >
                <Text
                  fontSize={["small", "1xl", "initial"]}
                  color={"white"}
                  textAlign={"center"}
                >
                  {type.name}
                </Text>
              </Box>
            )
          })
        ) : (
          <Box
            bg={`type.${pokemon?.type?.[0].name}`}
            m={"0 auto"}
            borderRadius={"8"}
            w={["5em", "5em", "10em"]}
            p={["0.1em"]}
          >
            <Text
              fontSize={["small", "1xl", "initial"]}
              color={"white"}
              textAlign={"center"}
            >
              {pokemon?.type?.[0].name}
            </Text>
          </Box>
        )}
      </Flex>
      <Center></Center>
    </Box>
  )
}
export default PokemonCardBattle
