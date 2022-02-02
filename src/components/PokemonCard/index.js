import { Box, Flex, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import "../../index.css";
const PokemonCard = ({ pokemons }) => {
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemons.name}`)
      .then((res) => {
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
  },[pokemons.name]);

  return (
    <Box
      boxShadow='rgb(0 0 0 / 30%) 0px 4px 8px 0px'
      rounded={"md"}
      p={"1em"}
      w={"16em"}
      h={"auto"}
      fontFamily={"Flexo-Demi"}
      _hover={{ transform: `translate(0px, -5px)` }}
      cursor={"pointer"}
    >
      <Image src={pokemon.image}/>
      <Text color={"text.gray"}>Nº{pokemon.id}</Text>
      <Text fontSize='2xl'>{pokemons.name.toUpperCase()}</Text>
      <Flex>
        {pokemon.type?.map((type) => {
          return (
            <Box
              key={type.name}
              bg={`type.${type.name}`}
              m={"0.5em"}
              borderRadius={"8"}
              w={"10em"}
              h={"1.5em"}
            >
              <Text color={"white"} pl={"1.6em"}>
                {type.name}
              </Text>
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
};
export default PokemonCard;
