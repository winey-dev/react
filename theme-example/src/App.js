import { GlobalStyles, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import Router from './Routes/router';

const theme = {}
function App() {
  return (

    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;