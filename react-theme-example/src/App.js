import { GlobalStyles, ThemeProvider } from '@mui/material';
import { Box, AppBar } from '@mui/material';

const theme = {}
function App() {
  return (

    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Box>
        <AppBar> AppBar </AppBar>
      </Box>

    </ThemeProvider>
  );
}

export default App;
