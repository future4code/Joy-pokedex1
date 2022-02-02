import { Box, Flex, Image, Text } from "@chakra-ui/react";
import "../../index.css";
const PokemonCard = () => {
  return (
    <Box
      boxShadow="rgb(0 0 0 / 30%) 0px 4px 8px 0px"
      rounded={"md"}
      p={"1em"}
      w={"17em"}
      h={"auto"}
      fontFamily={"Flexo-Demi"}
      _hover={{transform: `translate(0px, -5px)`}}
      cursor={'pointer'}
    >
      <Image src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png" />
      <Text color={"gray.500"}>Nº001</Text>
      <Text fontSize="2xl">Bulbasaur</Text>
      <Flex>
        <Box
          bg={"green.300"}
          m={"0.5em"}
          borderRadius={"8"}
          w={"10em"}
          h={"1.5em"}
        >
          <Text color={"white"} pl={"1.9em"}>
            Grass
          </Text>
        </Box>
        <Box
          bg={"purple.300"}
          m={"0.5em"}
          borderRadius={"8"}
          w={"10em"}
          h={"1.5em"}
        >
          <Text color={"white"} pl={"1.6em"}>
            Poison
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};
export default PokemonCard;
