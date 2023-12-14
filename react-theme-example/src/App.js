import { GlobalStyles, Button, ThemeProvider, Typography } from '@mui/material';
import { Box, AppBar } from '@mui/material';
import { lightTheme, darkTheme } from './themes';
import { useState } from 'react';
import Page from './Page';



function App() {
  const [theme, setTheme] = useState(lightTheme)

  const onChageTheme = () => {
    theme === lightTheme ? setTheme(darkTheme) : setTheme(lightTheme)
  }
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Box sx={{margin: 10, padding: 10, display: 'flex'}}>
        <Button variant="contained" onClick={onChageTheme}> Color Change {theme.palette.mode} </Button>

        <Button  color="primary"  variant="contained"> primary {theme.palette.mode} </Button>
        <Button  color="secondary"  variant="contained"> secondary {theme.palette.mode} </Button>
       
        <Box sx={{backgroundColor: theme.palette.background }}> Main Box다 </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
