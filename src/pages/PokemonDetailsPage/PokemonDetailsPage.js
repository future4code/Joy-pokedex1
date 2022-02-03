import { Box, Center, Flex, Image, Text } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { httpClient } from "../../constants"

function PokemonDetailsPage() {
  const [pokemonDetails, setPokemonDetails] = useState({})
  const params = useParams()
  useEffect(() => {
    httpClient
      .get(`/${params.id}/`)
      .then(({ data }) => {
        console.log(data)
        const { stats, types, sprites, moves, forms } = data
        setPokemonDetails({
          stats: stats.map((date) => {
            return {
              name: date.stat.name,
              number: date.base_stat,
            }
          }),
          type: types.map((type) => {
            return {
              nameType: type["type"].name,
            }
          }),
          moves: moves.map((move) => {
            return {
              moveName: move.move.name,
            }
          }),
          forms: forms.map((pokemon) => {
            return {
              pokemonName: pokemon.name,
            }
          }),
          image: sprites.front_default,
          image2: sprites.back_default,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }, [params.id])
  console.log(pokemonDetails && pokemonDetails)
  return (
    <Flex justify={"center"} p={8} m={8} gap={40} fontFamily={"Flexo-Demi"}>
      <Box>
        <Image w={"10em"} h={"10em"} src={pokemonDetails.image} />
        <Image w={"10em"} h={"10em"} src={pokemonDetails.image2} />
        {pokemonDetails &&
          pokemonDetails.forms &&
          pokemonDetails.forms.map((data) => {
            return (
              <Text fontSize="3xl" m={3} p={1}>
                {data.pokemonName.toUpperCase()}
              </Text>
            )
          })}
        <Box>
          {pokemonDetails &&
            pokemonDetails.type &&
            pokemonDetails.type.map((type) => {
              return (
                <Center
                  m={"1em"}
                  p={1}
                  borderRadius={"8"}
                  w={"7em"}
                  h={"auto"}
                  bg={`type.${type.nameType}`}
                  color={"white"}
                >
                  <Text>{type.nameType}</Text>
                </Center>
              )
            })}
        </Box>
      </Box>

      <Box bg={"background.blue"} borderRadius={8} w={"20em"}>
        <Center>
          <Text fontSize="3xl" pt={3} pl={3} pr={3} color={"#e8e8e8"}>
            Poderes
          </Text>
        </Center>
        {pokemonDetails &&
          pokemonDetails.stats &&
          pokemonDetails.stats.map((stat) => {
            return (
              <>
                <Text
                  pl={3}
                  pb={3}
                  mt={3}
                  ml={5}
                  color={"#e8e8e8"}
                  fontSize="2xl"
                >
                  {stat.name.toUpperCase()}
                </Text>
                <Text pl={3} ml={5} mb={2} fontSize="2xl">
                  {" "}
                  {stat.number}
                </Text>
              </>
            )
          })}
      </Box>

      <Box bg={"#D04164"} borderRadius={8} color={"#e8e8e8"} w={"20em"}>
        <Center>
          <Text fontSize="3xl" p={3}>
            Principais Ataques
          </Text>
        </Center>
        {pokemonDetails &&
          pokemonDetails.moves &&
          pokemonDetails.moves.slice(0, 5).map((move) => {
            return (
              <>
                <Text p={3} m={5} fontSize="2xl">
                  {move.moveName.toUpperCase()}
                </Text>
              </>
            )
          })}
      </Box>
    </Flex>
  )
}

export default PokemonDetailsPage
