import { Box, Button, Center, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { httpClient } from "../../constants";
import "../../index.css";
const PokemonCard = ({ pokemons }) => {
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    httpClient.get(`/${pokemons.name}`).then((res) => {
      const { id, types, sprites } = res.data;
      setPokemon({
        id,
        image: sprites.other["official-artwork"].front_default,
        type: types.map((type) => {
          return {
            name: type["type"].name,
          };
        }),
      });
    });
  }, [pokemons.name]);

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
      <Image src={pokemon.image} />
      <Text color={"text.gray"}>Nº{pokemon.id}</Text>
      <Text fontSize="2xl">{pokemons.name.toUpperCase()}</Text>
      <Flex>
        {pokemon.type?.length >= 2
          ? pokemon.type.map((type) => {
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
              );
            })
          : pokemon.type?.map((type) => {
              return (
                <Box
                  key={type.name}
                  bg={`type.${type.name}`}
                  m={"0.5em auto"}
                  borderRadius={"8"}
                  w={"10em"}
                  h={"1.5em"}
                >
                  <Text color={"white"} textAlign={"center"}>
                    {type.name}
                  </Text>
                </Box>
              );
            })}
      </Flex>
      <Center>
        <Button
          bg={"background.blue"}
          color={"white"}
          p={1}
          _hover={{ bg: "blue.500" }}
        >
          Adicionar à Pokédex
        </Button>
      </Center>
    </Box>
  );
};
export default PokemonCard;
