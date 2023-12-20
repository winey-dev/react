import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import Router from './Routes/router';
//import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './Themes';


function App() {
  const isDark = false;
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;