import { Box, Button, Grid, Select, Spinner, Text } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import PokemonCard from "../../components/PokemonCard";
import { httpClient } from "../../constants";
import { GlobalContext } from "../../GlobalContext/GlobalContext";
import { SelectContainer } from "./styled";

function HomePage() {
  const [sortParameter, setSortParameter] = useState("default");

  const {
    pokemons,
    setPokemons,
    searchPokemon,
    pokedex,
    setPokedex,
    setLoadMore,
    loadMore,
    isLoading,
  } = useContext(GlobalContext);

  const addToPokedex = (pokemon) => {
    setPokedex([...pokedex, pokemon]);
  };

  const handleSortParameter = ({ target }) => {
    setSortParameter(target.value);
  };

  const LoadMorePokemons = (loadMore) => {
    httpClient
      .get(`${loadMore}`)
      .then((res) => {
        setPokemons([...pokemons, ...res.data.results]);
        setLoadMore(res.data.next);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const notInPokedex = pokemons?.filter((pokemon) => {
    const inPokedex = pokedex.find((pokedex) => {
      return pokemon.name === pokedex.name;
    });
    if (inPokedex) {
      return false;
    } else {
      return true;
    }
  });

  const filteredPokemons = notInPokedex

    ?.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(searchPokemon.toLowerCase());
    })
    .sort((currentPokemon, nextPokemon) => {
      if (sortParameter === "a-z") {
        return currentPokemon.name.localeCompare(nextPokemon.name);
      }
      if (sortParameter === "z-a") {
        return nextPokemon.name.localeCompare(currentPokemon.name);
      }
    });

  return (
    <Box
      display={"flex"}
      justifyContent={["center"]}
      flexFlow={"column"}
      alignItems={["center"]}
      w={"full"}
      gap={5}
    >
      <SelectContainer>
        <Select
          value={sortParameter}
          onChange={handleSortParameter}
          fontFamily={"Flexo-Demi"}
        >
          <option value={"default"} disabled>
            Ordenar por
          </option>
          <option value={"a-z"}>A-Z</option>
          <option value={"z-a"}>Z-A</option>
        </Select>
      </SelectContainer>
      <Grid
        p={[0, "1em"]}
        templateColumns={[
          "1fr",
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
          "repeat(3, 1fr)",
          "repeat(4, 1fr)",
        ]}
        gap={[10]}
      >
        {!filteredPokemons.length && (
          <>
            <Text
              align={"center"}
              gridArea="1/1/3/5"
              fontSize="4xl"
              fontFamily={"Flexo-Demi"}
            >
              Pokémon não encontrado!
            </Text>
          </>
        )}
        {isLoading ? (
          <Spinner color="blue.500" size="xl" />
        ) : (
          filteredPokemons.map((pokemon) => {
            return (
              <PokemonCard
                key={pokemon.name}
                pokemons={pokemon}
                handleClick={() => addToPokedex(pokemon)}
                textButton={"Adicionar à Pokédex"}
              />
            );
          })
        )}
      </Grid>
      <Box>
        <Button
          bg={"background.blue"}
          color={"white"}
          p={2}
          mt={2}
          _hover={{ bg: "blue.500" }}
          onClick={() => LoadMorePokemons(loadMore)}
        >
          Carregar Mais
        </Button>
      </Box>
    </Box>
  );
}

export default HomePage;
