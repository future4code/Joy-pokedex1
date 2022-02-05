import { Box, Center, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { httpClient } from "../../constants";
import whosthatpok from '../../assets/whosthat.png'
import {DetailImgContainer} from './styled'

function PokemonDetailsPage() {
  const [pokemonDetails, setPokemonDetails] = useState({});
  const params = useParams();
  const icons = ["❤️", "⚔️", "🛡️", "💥", "🧬", "⚡️"];
  useEffect(() => {
    httpClient
      .get(`/${params.id}/`)
      .then(({ data }) => {
        console.log(data);
        const { stats, types, sprites, moves, forms } = data;
        setPokemonDetails({
          stats: stats.map((date) => {
            return {
              name: date.stat.name,
              number: date.base_stat,
            };
          }),
          type: types.map((type) => {
            return {
              nameType: type["type"].name,
            };
          }),
          moves: moves.map((move) => {
            return {
              moveName: move.move.name,
            };
          }),
          forms: forms.map((pokemon) => {
            return {
              pokemonName: pokemon.name,
            };
          }),
          image: sprites.front_default,
          image2: sprites.back_default,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id]);
  console.log(pokemonDetails && pokemonDetails);
  return (
    <div>
      <DetailImgContainer>
        <Image src={whosthatpok} h={"15vh"} w={"90vw"} />
        </DetailImgContainer>

    <Flex justify={"center"} p={8} m={8} gap={40} fontFamily={"Flexo-Demi"}>
      
      <Box>
      <Flex direction="column"  justify={"center"}>
      

        {pokemonDetails &&
          pokemonDetails.forms &&
          pokemonDetails.forms.map((data) => {
            return (
              <Text fontSize="5xl" m={3} p={1}>
                {data.pokemonName.toUpperCase()}
              </Text>
            );
          })}
          <Flex direction="row">
        <Image w={"10em"} h={"10em"} src={pokemonDetails.image} />
        <Image w={"10em"} h={"10em"} src={pokemonDetails.image2} />
        </Flex>
          </Flex>
        <Box><Flex>
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
              );
            })}
            </Flex>
        </Box>
      </Box>

      <Box bg={"background.blue"} borderRadius={8} w={"25em"}>
        <Center>
          <Text fontSize="3xl" pt={3} pl={3} pr={3} color={"#e8e8e8"}>
            Poderes
          </Text>
        </Center>
        <Flex direction={'column'}>
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
                    {stat.name === 'hp' ? 
                    stat.name.toUpperCase() +' '+ icons[0]:
                    stat.name === 'attack' ? stat.name.toUpperCase()  +' '+ icons[1]:
                    stat.name === 'defense' ? stat.name.toUpperCase() +' '+ icons[2]:
                    stat.name === 'special-attack' ? stat.name.toUpperCase() +' '+ icons[3]:
                    stat.name === 'special-defense' ? stat.name.toUpperCase() +' '+ icons[4]:
                    stat.name.toUpperCase() +' '+ icons[5]}
                  </Text>

                  <Text pl={3} ml={5} mb={2} fontSize="2xl">
                    {" "}
                    {stat.number}
                  </Text>
                </>
              );
            })}
         
        </Flex>
      
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
            );
          })}
      </Box>
    </Flex>
    </div>
  );
}

export default PokemonDetailsPage;
