import { Image } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { httpClient } from "../../constants"
import "../../index.css"
import { goToPokemonDetailsPage } from "../../routes/coordinator"
const PokemonCardBattle = ({ pokemons }) => {
  const [pokemon, setPokemon] = useState({})

  const navigate = useNavigate()

  useEffect(() => {

    httpClient.get(`${pokemons.name}`).then((res) => {
      const { id, types, sprites } = res.data

      setPokemon({
        id,
        image: sprites.other["official-artwork"].front_default,
        type: types.map((type) => {
          return {
            name: type["type"].name,
          }
        }),
      })
    })
  }, [pokemons.name])

  return (
     
        <>
        <Image
        src={pokemon.image}
        p={["0.4em", "1em"]}
        w={["6em", "10em", "10em", "16em"]}
        h={["auto", "12em", "15em", "18em"]}
        mt={20}
        onClick={() => goToPokemonDetailsPage(navigate, pokemon.id)
        }
      />
    </>
  )
}
export default PokemonCardBattle
