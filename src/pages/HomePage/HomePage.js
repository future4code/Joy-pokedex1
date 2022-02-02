import { Grid } from "@chakra-ui/react";
import React from "react";
import PokemonCard from "../../component/PokemonCard";

function HomePage() {
  return (
    <Grid p={'5em'}>
      <PokemonCard/>
    </Grid>
  );
}

export default HomePage;
