import React, { createContext, useEffect, useState } from "react"
import { httpClient, url } from "../constants"
import useLocalStorage from "../hooks/useLocalStorage"

export const GlobalContext = createContext()

export const GlobalStorage = ({ children }) => {
  
  const [pokemons, setPokemons] = useState([])
  const [searchPokemon, setSearchPokemon] = useState("")
  const [pokedex, setPokedex] = useLocalStorage("pokedex",[])
  const [sortParameter, setSortParameter] = useState("a-z")
  const [loadMore, setLoadMore] = useState(null)
  const [isLoading,setIsLoading]=useState(false)
  useEffect(() => {
    setIsLoading(true)
    httpClient.get(`${url}`).then(({ data }) => {
      
      setLoadMore(data.next)
      setPokemons(data.results)
      setIsLoading(false)
    })
  }, [])

console.log(pokedex);
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
        loadMore,
        setLoadMore, isLoading
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
