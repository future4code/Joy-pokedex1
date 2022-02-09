import { Text } from "@chakra-ui/react"
import React, { createContext, useEffect, useState } from "react"
import { httpClient, url} from "../constants"

export const GlobalContext = createContext()

export const GlobalStorage = ({ children }) => {
  const [pokemons, setPokemons] = useState([])
  const [searchPokemon, setSearchPokemon] = useState("")
  const [pokedex, setPokedex] = useState([])

         const [sortParameter,setSortParameter]=useState('a-z')
  const [pokemonType,setPokemonType]=useState({})
  const [filterTypeParameter,setFilterTypeParameter]=useState('')
 
  const [loadMore, setLoadMore] = useState(null)

  useEffect(() => {
    httpClient.get(`${url}`).then(({ data }) => {
      setLoadMore(data.next)

      setPokemons(data.results)
      getPokemonTypes()
    })
   
    
  }, [])
  

  const getPokemonTypes=()=>{
     pokemons?.map((pokemon)=>{

      httpClient.get(`/${pokemon.name}`).then((res) => {
        const {  types}=res.data
      
        setPokemonType({
          type: types.map((type) => {
            return {
              name: type["type"].name,
            }
          })
        })
      })
     })
  }

console.log(pokemonType);

  return (
    <GlobalContext.Provider
      value={{
        pokemons,
        setPokemons,
        searchPokemon,
        setSearchPokemon,
        pokedex,
        setPokedex,

     sortParameter,
        setSortParameter,
        pokemonType,
        filterTypeParameter,
        setFilterTypeParameter,
        loadMore,
        setLoadMore,

      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
