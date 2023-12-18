import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import Router from './router';
//import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './themes';
import ScrollTop from './components/ScrollTop';


function App() {
    const isDark = true;
    return (
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
            <CssBaseline />
            <BrowserRouter>
                <ScrollTop>
                    <Router />
                </ScrollTop>
            </BrowserRouter>

        </ThemeProvider>

    );
}

export default App;