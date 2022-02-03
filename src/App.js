import Routes from "./routes/routes";
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from "./styles/theme/theme";
import Footer from "./components/Footer/index"

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes/>
      <Footer />
    </ChakraProvider>
  );
}

export default App;
