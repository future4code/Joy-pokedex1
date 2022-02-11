import { Box, Button, Flex, Grid, Select, Text, Image } from "@chakra-ui/react"
import React, { useContext, useState } from "react"
import PokemonCardBattle from "../../components/PokemonCardBattle"
import Stats from "../../components/Stats"
import { httpClient } from "../../constants"
import { GlobalContext } from "../../GlobalContext/GlobalContext"
import vsimage from '../../assets/vsimage.png'

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
      console.log(data)
      const status = data.stats.map((date) => {
        return date.base_stat
      })
      const totalStatus1 = status.reduce((a, b) => {
        return a + b
      })
      console.log(totalStatus1)
      setBattle1(totalStatus1)
    })
    setWinner(null)
  }
  const handlePokemon2 = ({ target }) => {
    setSelectPokemon2(target.value)
    httpClient.get(`/${target.value}/`).then(({ data }) => {
      console.log(data)
      const status = data.stats.map((date) => {
        return date.base_stat
      })
      console.log(status)
      const totalStatus2 = status.reduce((a, b) => {
        return a + b
      })
      console.log(totalStatus2)
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
    <Box>
      <Flex justify={"space-around"}>
        <Select w={"auto"} onChange={handlePokemon1} defaultValue={{}}>
          <option  value={{}} disabled>
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
      <Grid
        templateColumns={"1fr 1fr 1fr 1fr 1fr"}
        p={10}
        justifyContent={"center"}
        justifyItems={"center"}
      >
        {pokedex
          .filter((pokemon1) => {
            return pokemon1.name.includes(selectPokemon1)
          })
          .map((pokemon1, index) => {
            return [
              <Stats key={index} pokemonName={pokemon1.name} />,
              <PokemonCardBattle key={pokemon1.name} pokemons={pokemon1} />,
            ]
          })}

        <Flex
          direction={"column"}
          alignItems={"center"}
          justifyContent={"space-around"}
        >
          {battle2 > 0 && <Image 
          alt="versus image" 
          src={vsimage}
          boxSize='16em'
          />}
          <Button onClick={handleBattle}>Battle</Button>
          {winner && <Text textTransform={"uppercase"}>{winner}</Text>}
        </Flex>

        {pokedex
          .filter((pokemon2) => {
            return pokemon2.name.includes(selectPokemon2)
          })
          .map((pokemon2, index) => {
            return [
              <PokemonCardBattle key={pokemon2.name} pokemons={pokemon2} />,
              <Stats key={index} pokemonName={pokemon2.name} />,
            ]
          })}
      </Grid>
    </Box>
  )
}
export default BattlePage
