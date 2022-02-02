import Routes from "./routes/routes";
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from "./styles/theme/theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes/>
    </ChakraProvider>
  );
}

export default App;
