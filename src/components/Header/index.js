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
import {
  goToBattlePage,
  goToHomePage,
  goToPokedexPage,
} from "../../routes/coordinator"
import { useNavigate } from "react-router-dom"
import { SearchIcon } from "@chakra-ui/icons"
import { useContext } from "react"
import { GlobalContext } from "../../GlobalContext/GlobalContext"
import Batalha from "../../assets/poke-chocke.png"

const Header = () => {
  const { searchPokemon, setSearchPokemon } = useContext(GlobalContext)

  const navigate = useNavigate()

  const handlePokemon = ({ target }) => {
    setSearchPokemon(target.value)
  }

  return (
    <Flex
      direction={["column", "row"]}
      justify={["space-between"]}
      align={"center"}
      bg={"background.blue"}
      borderBottom={"solid 2px #dedede"}
      p={[".5em", 0]}
      w={["full"]}
      gap={[2, 0]}
    >
      <Image
        src={Marca}
        w={["8em", "10em"]}
        h={["4em", "5.5em"]}
        p={[0, "0.5em"]}
        m={[0, 3]}
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
        />
      </InputGroup>
      <Menu isLazy>
        <nav>
          <UnorderedList styleType={"none"} m={["0 auto"]}>
            <Flex gap={[5, 0]}>
              <ListItem
                bg={"background.blue"}
                _hover={{ bg: "#E3350D" }}
                color={"white"}
                p={[".5em", "2em"]}
                cursor={"pointer"}
                onClick={() => goToPokedexPage(navigate)}
                display={"flex"}
                alignItems={"center"}
                flexFlow={"column"}
              >
                <Image
                  src={Pokebola}
                  _hover={{ fill: "red" }}
                  w={["1em", "2em"]}
                  h={["1em", "2em"]}
                />
                Pokédex
              </ListItem>
              <ListItem
                display={"flex"}
                alignItems={"center"}
                flexFlow={"column"}
                p={[".5em", "2em"]}
                bg={"background.blue"}
                _hover={{ bg: "#DAA520" }}
                color={"white"}
                cursor={"pointer"}
                onClick={() => {
                  goToHomePage(navigate)
                }}
              >
                <Image src={Pokemon} w={["1em", "2em"]} h={["1em", "2em"]} />
                <Text> Pokémons</Text>
              </ListItem>
              <ListItem
                display={"flex"}
                alignItems={"center"}
                flexFlow={"column"}
                p={[".5em", "2em"]}
                bg={"background.blue"}
                _hover={{ bg: "#e65f05" }}
                color={"white"}
                cursor={"pointer"}
                onClick={() => {
                  goToBattlePage(navigate)
                }}
              >
                <Image src={Batalha} w={["2em", "2em"]} h={["1em", "2em"]} />
                <Text> Batalha</Text>
              </ListItem>
            </Flex>
          </UnorderedList>
        </nav>
      </Menu>
    </Flex>
  )
}
export default Header
