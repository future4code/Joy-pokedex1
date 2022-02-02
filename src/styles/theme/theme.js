import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    type: {
      bug: "#8CB230",
      dark: "#58575F",
      dragon: "#0F6AC0",
      electric: "#EED535",
      fairy: "#ED6EC7",
      fighting: "#D04164",
      fire: "#FD7D24",
      flying: "#748FC9",
      ghost: "#556AAE",
      grass: "#62B957",
      ground: "#DD7748",
      ice: "#61CEC0",
      normal: "#9DA0AA",
      poison: "#A552CC",
      psychic: "#EA5D60",
      rock: "#BAAB82",
      steel: "#417D9A",
      water: "#4A90DA",
    },
    background: {
      white: "#FFFFFF",
      blue: "#54A6F3",
    },
    text: {
      white: "#FFFFFF",
      black: "#17171B",
      gray: "#747476",
      number: "#17171B",
    },
    height: {
      short: "#FFC5E6",
      medium: "#AEBFD7",
      tall: "#AAACB8",
    },
    weight: {
      light: "#99CD7C",
      normal: "#57B2DC",
      heavy: "#5A92A5",
    },
  },
});