import { AppBar, IconButton, Toolbar, Typography, useTheme } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';

import styled from 'styled-components'


const Header = (props) => {
    const { onOpenHandler } = props
    // return (
    //     <WrapperHeader color={theme.palette.primary.main}>
    //         <Toolbar>
    //             <HeaderItem> <IconButton sx={{ color: 'white' }} onClick={onToggle}> <MenuIcon /> </IconButton> </HeaderItem>
    //         </Toolbar>
    //     </WrapperHeader>
    // )
    return (
        <AppBar enableColorOnDark sx={{ display: 'flex', flexDirection: 'row', position: 'static', backgroundImage: 'none', boxShadow: 'none' }}>
            <Toolbar>
                <IconButton sx={{ color: 'white' }} onClick={onOpenHandler}> <MenuIcon /> </IconButton>
                <Typography > THEME EXAMPLE </Typography>
            </Toolbar>
        </AppBar>
    )
}
export default Header;