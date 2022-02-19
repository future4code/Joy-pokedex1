import { Box, Button, Flex, Select, Image } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import PokemonCardBattle from "../../components/PokemonCardBattle";
import Stats from "../../components/Stats";
import { httpClient } from "../../constants";
import { GlobalContext } from "../../GlobalContext/GlobalContext";
import vsimage from "../../assets/vsimage.png";
import Arena from "../../assets/arena1.jfif";
import BattleLoader from "../../components/BattleLoader";
import useLocalStorage from "../../hooks/useLocalStorage";

const BattlePage = () => {
  const { pokedex } = useContext(GlobalContext);
  const [selectedPokemon1, setSelectedPokemon1] = useLocalStorage("selectedPokemon1",null);
  const [selectedPokemon2, setSelectedPokemon2] = useLocalStorage("selectedPokemon2",null);
  const [battle1, setBattle1] =useLocalStorage("pokemon1",null);
  const [battle2, setBattle2] = useLocalStorage("pokemon2",null);
  const [battleModal, setBattleModal] = useState(false);
  const handlePokemon = (onSelect, onTotal) => {
    return async ({ target }) => {
      onSelect(target.value);
      const { data } = await httpClient.get(`/${target.value}`);
      const totalStats = data.stats
        .map(({ base_stat }) => base_stat)
        .reduce((x, y) => x + y);
        const image= data.sprites.other["official-artwork"].front_default;
      onTotal({ ...data, totalStats, image });
    };
  };

  const handlePokemon1 = handlePokemon(setSelectedPokemon1, setBattle1);
  const handlePokemon2 = handlePokemon(setSelectedPokemon2, setBattle2);

  return (
    <Box p="1em 0">
      <Flex justify={"space-around"}>
        <Select
          w={"auto"}
          onChange={handlePokemon1}
          defaultValue={{}}
          fontFamily={"Flexo-Demi"}
        >
          <option value={{}} disabled>
            Selecione um Pokémon
          </option>
          {pokedex.map((pokemon1) => {
            return (
              <option key={pokemon1.name} value={pokemon1.name}>
                {pokemon1.name.toUpperCase()}
              </option>
            );
          })}
        </Select>

        <Select
          w={"auto"}
          onChange={handlePokemon2}
          defaultValue={{}}
          fontFamily={"Flexo-Demi"}
          mb={'1em'}
        >
          <option value={{}} disabled>
            Selecione um Pokémon
          </option>
          {pokedex.map((pokemon2) => {
            return (
              <option key={pokemon2.name} value={pokemon2.name}>
                {pokemon2.name.toUpperCase()}
              </option>
            );
          })}
        </Select>
      </Flex>
      <Flex
        p={["2", "2", "2", "2"]}
        justifyContent={["space-between", "space-around"]}
        alignItems={"center"}
        backgroundImage={Arena}
        minH="100vh"
        backgroundPosition={"center"}
        backgroundSize="cover"
        h="100%"
      >
        {pokedex
          .filter((pokemon1) => {
            return pokemon1.name === selectedPokemon1;
          })
          .map((pokemon1, index) => {
            return (
              <Flex key={index} direction={["column-reverse", "row"]}>
                <Stats pokemonName={pokemon1.name} />,
                <PokemonCardBattle pokemons={pokemon1} />
              </Flex>
            );
          })}

        <Flex
          direction={"column"}
          alignItems={"center"}
          justifyContent={"space-around"}
        >
          {battle1  && battle2 && (
            <Flex direction={"column"} gap={8} zIndex="1">
              <Image
                alt="versus image"
                src={vsimage}
                boxSize={["4em", "8em", "6em", "8em", "16em"]}
                m={"0 auto"}
              />
              <Button
                onClick={()=>setBattleModal(true)}
                m={"1em 0.1em"}
                fontSize={["smaller", "initial"]}
               
                bg={"#f36609"}
                color={"white"}
                _hover={{ bg: "#d1651d" }}
                fontFamily={"Flexo-Demi"}
              >
                Batalhar
              </Button>
            </Flex>
          )}
         
        </Flex>

        {pokedex
          .filter((pokemon2) => {
            return pokemon2.name === selectedPokemon2;
          })
          .map((pokemon2, index) => {
            return (
              <Flex key={index} direction={["column", "row"]}>
                <PokemonCardBattle pokemons={pokemon2} />,
                <Stats pokemonName={pokemon2.name} />
              </Flex>
            );
          })}

        <BattleLoader open={battleModal} pokemon1={battle1} pokemon2={battle2} onClose={()=>setBattleModal(false)} />
      </Flex>
    </Box>
  );
};
export default BattlePage;
