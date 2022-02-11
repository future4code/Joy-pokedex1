import React, { createContext, useEffect, useState } from "react"
import { httpClient, url } from "../constants"

export const GlobalContext = createContext()

export const GlobalStorage = ({ children }) => {
  
  const [pokemons, setPokemons] = useState([])
  const [searchPokemon, setSearchPokemon] = useState("")
  const [pokedex, setPokedex] = useState([])
  const [sortParameter, setSortParameter] = useState("a-z")
  const [loadMore, setLoadMore] = useState(null)

  useEffect(() => {
    httpClient.get(`${url}`).then(({ data }) => {
      setLoadMore(data.next)
      setPokemons(data.results)
    })
  }, [])


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
        setLoadMore,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
