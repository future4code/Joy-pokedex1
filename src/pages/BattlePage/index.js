import { Box, Button, Flex, Select, Text, Image } from "@chakra-ui/react"
import React, { useContext, useState } from "react"
import PokemonCardBattle from "../../components/PokemonCardBattle"
import Stats from "../../components/Stats"
import { httpClient } from "../../constants"
import { GlobalContext } from "../../GlobalContext/GlobalContext"
import vsimage from "../../assets/vsimage.png"

const BattlePage = () => {
  const { pokedex } = useContext(GlobalContext)
  const [selectPokemon1, setSelectPokemon1] = useState({})
  const [selectPokemon2, setSelectPokemon2] = useState({})
  const [battle1, setBattle1] = useState({})
  const [battle2, setBattle2] = useState({})
  const [winner, setWinner] = useState(null)

  const handlePokemon1 = ({ target }) => {
    setSelectPokemon1(target.value)
    httpClient.get(`/${target.value}/`).then(({ data }) => {
      const status = data.stats.map((date) => {
        return date.base_stat
      })
      const totalStatus1 = status.reduce((a, b) => {
        return a + b
      })
      setBattle1(totalStatus1)
    })
    setWinner(null)
  }
  const handlePokemon2 = ({ target }) => {
    setSelectPokemon2(target.value)
    httpClient.get(`/${target.value}/`).then(({ data }) => {
      const status = data.stats.map((date) => {
        return date.base_stat
      })
      const totalStatus2 = status.reduce((a, b) => {
        return a + b
      })
      setBattle2(totalStatus2)
    })
    setWinner(null)
  }

  const handleBattle = () => {
    if (battle1 > battle2) {
      setWinner(selectPokemon1 + " VENCEU!")
    } else if (battle1 < battle2) {
      setWinner(selectPokemon2 + " VENCEU!")
    } else {
      setWinner("EMPATE!")
    }
  }

  return (
    <Box p="1em 0">
      <Flex justify={"space-around"}>
        <Select w={"auto"} onChange={handlePokemon1} defaultValue={{}}>
          <option value={{}} disabled>
            Selecione um Pokémon
          </option>
          {pokedex.map((pokemon1) => {
            return (
              <option key={pokemon1.name} value={pokemon1.name}>
                {pokemon1.name}
              </option>
            )
          })}
        </Select>

        <Select w={"auto"} onChange={handlePokemon2} defaultValue={{}}>
          <option value={{}} disabled>
            Selecione um Pokémon
          </option>
          {pokedex.map((pokemon2) => {
            return (
              <option key={pokemon2.name} value={pokemon2.name}>
                {pokemon2.name}
              </option>
            )
          })}
        </Select>
      </Flex>
      <Flex
        p={["2", "2", "2", "2"]}
        justifyContent={["space-between", "space-around"]}
        alignItems={"center"}
      >
        {pokedex
          .filter((pokemon1) => {
            return pokemon1.name.includes(selectPokemon1)
          })
          .map((pokemon1, index) => {
            return (
              <Flex key={index} direction={["column-reverse", "row"]}>
                <Stats pokemonName={pokemon1.name} />,
                <PokemonCardBattle pokemons={pokemon1} />
              </Flex>
            )
          })}

        <Flex
          direction={"column"}
          alignItems={"center"}
          justifyContent={"space-around"}
        >
          {battle2 > 0 && (
            <Flex direction={"column"} gap={8}>
              <Image
                alt="versus image"
                src={vsimage}
                boxSize={["4em", "8em", "6em", "8em", "16em"]}
                m={"0 auto"}
              />
              <Button
                onClick={handleBattle}
                m={"1em 0.1em"}
                fontSize={["smaller", "initial"]}
                p={"0"}
              >
                Batalhar
              </Button>
            </Flex>
          )}
          {winner && (
            <Text textTransform={"uppercase"} textAlign={"center"}>
              {winner}
            </Text>
          )}
        </Flex>

        {pokedex
          .filter((pokemon2) => {
            return pokemon2.name.includes(selectPokemon2)
          })
          .map((pokemon2, index) => {
            return (
              <Flex key={index} direction={["column", "row"]}>
                <PokemonCardBattle pokemons={pokemon2} />,
                <Stats pokemonName={pokemon2.name} />
              </Flex>
            )
          })}
      </Flex>
    </Box>
  )
}
export default BattlePage
