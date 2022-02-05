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
} from "@chakra-ui/react"
import Marca from "../../assets/pokedex.png"
import Pokebola from "../../assets/pokeball-white2.png"
import Pokemon from "../../assets/pikachu-white.png"
import { goToHomePage, goToPokedexPage } from "../../routes/coordinator"
import { useNavigate } from "react-router-dom"
import { SearchIcon } from "@chakra-ui/icons"
import { useContext } from "react"
import { GlobalContext } from "../../GlobalContext/GlobalContext"

const Header = () => {
  const { searchPokemon, setSearchPokemon} = useContext(GlobalContext)

  const navigate = useNavigate()

  const handlePokemon = ({ target }) => {
    setSearchPokemon(target.value)
  }

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
        w={"10em"}
        h={"5.5em"}
        p={"0.5em"}
        m={3}
        cursor={"pointer"}
        onClick={() => {
          goToHomePage(navigate)
        }}
      />
      <InputGroup>
        <InputRightElement 
          pointerEvents="none"
          children={<SearchIcon color="white" />}
        />
        <Input
          value={searchPokemon}
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
                onClick={() => goToPokedexPage(navigate)}
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
                onClick={() => {
                  goToHomePage(navigate)
                }}
              >
                <Image src={Pokemon} w={"2em"} h={"2em"} ml={"1.5em"} />
                <Text> Pokémons</Text>
              </ListItem>
            </Flex>
          </UnorderedList>
        </nav>
      </Menu>
    </Flex>
  )
}
export default Header
