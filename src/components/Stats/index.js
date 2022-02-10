import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { httpClient } from "../../constants";
const Stats = ({pokemonName}) => {
  const [pokemonDetails, setPokemonDetails] = useState({});
  const icons = ["❤️", "⚔️", "🛡️", "💥", "🧬", "⚡️"];
  useEffect(() => {
    httpClient
      .get(`/${pokemonName}/`)
      .then(({ data }) => {
        const { stats } = data;
        setPokemonDetails({
          stats: stats.map((date) => {
            return {
              name: date.stat.name,
              number: date.base_stat,
            };
          }),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pokemonName]);
  return (
    <Box>
      <Box bg={"background.white"} borderRadius={8} w={"16em"} boxShadow="rgb(0 0 0 / 30%) 0px 4px 8px 0px">
        <Center>
        </Center>
        <Flex direction={"column"}>
          {pokemonDetails &&
            pokemonDetails.stats &&
            pokemonDetails.stats.map((stat) => {
              return (
                <>
                  <Text
                    pl={2}
                    pb={2}
                    mt={2}
                    ml={3}
                    color={"#000000"}
                    fontSize="1xl"
                  >
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

                  <Text pl={3} ml={5} mb={2} fontSize="1xl">
                    
                    {stat.number}
                  </Text>
                </>
              );
            })}
        </Flex>
      </Box>
    </Box>
  );
};
export default Stats;
