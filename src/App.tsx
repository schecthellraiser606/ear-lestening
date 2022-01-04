import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter} from 'react-router-dom';
import theme from './theme/theme';
import { Router } from './routes/Router'
import { RecoilRoot } from 'recoil';

function App() {
  return ( 
  <ChakraProvider theme={theme}>
    <BrowserRouter>
    <RecoilRoot>
      <Router />
    </RecoilRoot>
    </BrowserRouter>
  </ChakraProvider>
   );
}

export default App;
