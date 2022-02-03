import {
  Flex,
  Menu,
  UnorderedList,
  ListItem,
  Image,
  Text,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import Marca from "../../assets/pokedex.png";
import Pokebola from "../../assets/icons8-pokebola-100-white.png";
import Pokemon from "../../assets/pikachu-white.png";
import { goToHomePage, goToPokedexPage } from "../../routes/coordinator";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "@chakra-ui/icons";

const Header = (props) => {
  const navigate = useNavigate();

  const handlePokemon = ({target}) => {
    props.setSearchPokemon(target.value)
  }

  console.log(props.searchPokemon)

  return (
    <Flex
      direction={"row"}
      justify={"space-between"}
      align={"center"}
      bg={"background.blue"}
      borderBottom={"solid 2px #dedede"}
    >
      <Image
        src={Marca}
        w={"9em"}
        h={"5.5em"}
        p={"1em"}
        m={3}
        cursor={"pointer"}
        onClick={()=>{goToHomePage(navigate)}}
      />
      <InputGroup>
        <InputRightElement
          pointerEvents="none"
          children={<SearchIcon color="white" />}
        />
        <Input
          value={props.searchPokemon}
          onChange={handlePokemon}
          type={"text"}
          variant="flushed"
          placeholder="Procure um Pokémon..."
          _placeholder={{ color: "white" }}
          color={"white"}
          ml={5}
        />
      </InputGroup>
      <Menu isLazy>
        <nav>
          <UnorderedList styleType={"none"}>
            <Flex>
              <ListItem
                bg={"background.blue"}
                _hover={{ bg: "#E3350D" }}
                color={"white"}
                p="2em"
                cursor={"pointer"}
                onClick={()=>goToPokedexPage(navigate)}
              >
                <Image
                  src={Pokebola}
                  _hover={{ fill: "red" }}
                  w={"2em"}
                  h={"2em"}
                  ml={"0.8em"}
                />
                Pokédex
              </ListItem>
              <ListItem
                p="2em"
                bg={"background.blue"}
                _hover={{ bg: "#DAA520" }}
                color={"white"}
                cursor={"pointer"}
                onClick={()=>{goToHomePage(navigate)}}
              >
                <Image src={Pokemon} w={"2em"} h={"2em"} ml={"1.5em"} />
                <Text> Pokémons</Text>
              </ListItem>
            </Flex>
          </UnorderedList>
        </nav>
      </Menu>
    </Flex>
  );
};
export default Header;
