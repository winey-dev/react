import ScrollTop from './components/ScrollTop';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes'
import { GlobalStyles, ThemeProvider } from '@mui/material';
import { useState } from 'react';



const theme = {}
const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <BrowserRouter>
                <ScrollTop>
                    <AppRoutes />
                </ScrollTop>
            </BrowserRouter>
        </ThemeProvider>
    )
}
export default App;