import { Button, Flex, Grid, Select, Text } from "@chakra-ui/react";
import { useContext, useState } from "react";
import PokemonCardBattle from "../../components/PokemonCardBattle";
import Stats from "../../components/Stats";
import { GlobalContext } from "../../GlobalContext/GlobalContext";
const BattlePage = () => {
  const { pokedex } = useContext(GlobalContext);
  const [selectPokemon1, setSelectPokemon1] = useState({});
  const [selectPokemon2, setSelectPokemon2] = useState({});

  const handlePokemon1 = ({ target }) => {
    setSelectPokemon1(target.value);
  };
  const handlePokemon2=({target})=>{
	  setSelectPokemon2(target.value)
  }
  console.log(selectPokemon1);
  console.log(selectPokemon2);
  return (
    <>
      <Flex justify={"space-around"}>
        <Select w={"auto"} onChange={handlePokemon1}>
          <option value={"default"} disabled selected="selected">
            Selecione um Pokémon
          </option>
          {pokedex.map((pokemon1) => {
            return (
              <option key={pokemon1.name} value={pokemon1.name}>
                {pokemon1.name}
              </option>
            );
          })}
        </Select>
        <Select w={"auto"} onChange={handlePokemon2}>
          <option value={"default"} disabled selected="selected">
            Selecione um Pokémon
          </option>
          {pokedex.map((pokemon2) => {
            return (
              <option key={pokemon2.name} value={pokemon2.name}>
                {pokemon2.name}
              </option>
            );
          })}
        </Select>
      </Flex>
      <Grid templateColumns={"300px 310px 100px 300px 250px"}  p={10}>
	      
        {pokedex.filter((pokemon1)=>{
		return pokemon1.name.includes(selectPokemon1)
	}).map((pokemon1) => {
		
          return [<Stats pokemonName={pokemon1.name}/>,<PokemonCardBattle key={pokemon1.name} pokemons={pokemon1} />
	];
        })}
        <Text fontSize="4xl">VS</Text>
        
	{pokedex.filter((pokemon2)=>{
		return pokemon2.name.includes(selectPokemon2)
	}).map((pokemon2) => {
	
		return [<PokemonCardBattle key={pokemon2.name} pokemons={pokemon2}/>, <Stats pokemonName={pokemon2.name}/> ];
	      })}
      </Grid>
    </>
  );
};
export default BattlePage;
