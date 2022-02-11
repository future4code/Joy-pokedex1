import { Box, Center, Flex, Image, Text } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { httpClient } from "../../constants"
import whosthatpok from "../../assets/whosthat.png"
import { DetailImgContainer } from "./styled"

function PokemonDetailsPage() {
  const [pokemonDetails, setPokemonDetails] = useState({})
  const params = useParams()
  const icons = ["❤️", "⚔️", "🛡️", "💥", "🧬", "⚡️"]

  useEffect(() => {
    httpClient
      .get(`/${params.id}/`)
      .then(({ data }) => {
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

  return (
    <Box>
      <DetailImgContainer>
        <Image
          src={whosthatpok}
          h={["8vh", "15vh"]}
          w={["", "90vw"]}
          mt={"1em"}
        />
      </DetailImgContainer>

      <Flex
        direction={["column", "collumn", "row"]}
        gap={[2, 0, 4, 0]}
        justify={"space-around"}
        p={"2em"}
        fontFamily={"Flexo-Demi"}
        alignItems={"center"}
      >
        <Box w={["17em", "20em", "16em"]} p={"1em"} borderRadius={8}>
          <Flex direction="column" justify={"center"}>
            {pokemonDetails?.forms?.map((data, index) => {
              return (
                <Text key={index} fontSize={"4xl"} margin={"0 auto"}>
                  {data.pokemonName.toUpperCase()}
                </Text>
              )
            })}
            <Flex direction="column" margin={"0 auto"}>
              <Image w={["12em"]} h={"11em"} src={pokemonDetails.image} />
              <Image w={["12em"]} h={"11em"} src={pokemonDetails.image2} />
            </Flex>
          </Flex>
          <Box>
            <Flex gap={[2, 0, 2, 2]}>
              {pokemonDetails?.type?.map((type, index) => {
                return (
                  <Center
                    key={index}
                    margin={"0 auto"}
                    p={1}
                    borderRadius={"8"}
                    w={["8em"]}
                    bg={`type.${type.nameType}`}
                    color={"white"}
                  >
                    <Text fontSize="1xl">{type.nameType}</Text>
                  </Center>
                )
              })}
            </Flex>
          </Box>
        </Box>

        <Box
          bg={"background.blue"}
          borderRadius={8}
          w={["17em", "20em", "15em", "20em"]}
          p={"1em"}
          height={"max-content"}
        >
          <Center>
            <Text fontSize="2xl" color={"#e8e8e8"}>
              Status
            </Text>
          </Center>
          <Flex direction={"column"}>
            {pokemonDetails?.stats?.map((stat, index) => {
              return (
                <Box key={index} p={".5em 0"}>
                  <Text color={"#e8e8e8"} fontSize="1xl">
                    {stat.name === "hp"
                      ? stat.name.toUpperCase() + " " + icons[0]
                      : stat.name === "attack"
                      ? stat.name.toUpperCase() + " " + icons[1]
                      : stat.name === "defense"
                      ? stat.name.toUpperCase() + " " + icons[2]
                      : stat.name === "special-attack"
                      ? stat.name.toUpperCase() + " " + icons[3]
                      : stat.name === "special-defense"
                      ? stat.name.toUpperCase() + " " + icons[4]
                      : stat.name.toUpperCase() + " " + icons[5]}
                  </Text>
                  <Text fontSize="1xl">{stat.number}</Text>
                </Box>
              )
            })}
          </Flex>
        </Box>

        <Box
          bg={"#D04164"}
          borderRadius={8}
          color={"#e8e8e8"}
          w={["17em", "20em", "15em", "20em"]}
          p={"1em"}
          display={"flex"}
          flexDirection={"column"}
          height={"max-content"}
        >
          <Center>
            <Text fontSize="2xl">Principais Ataques</Text>
          </Center>
          {pokemonDetails?.moves?.slice(0, 5).map((move, index) => {
            return (
              <Box key={index} p={".5em 0"}>
                <Text fontSize="1xl">{move.moveName.toUpperCase()}</Text>
              </Box>
            )
          })}
        </Box>
      </Flex>
    </Box>
  )
}

export default PokemonDetailsPage
