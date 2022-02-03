import React, { createContext, useEffect, useState } from "react"
import { httpClient, url } from "../constants"

export const GlobalContext = createContext()

export const GlobalStorage = ({ children }) => {
  const [pokemons, setPokemons] = useState([])
  const [searchPokemon, setSearchPokemon] = useState("")
  const [pokedex, setPokedex] = useState([])

  useEffect(() => {
    httpClient.get(`${url}`).then(({ data }) => {
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
