import { AppBar, Avatar, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';




const Header = (props) => {
    const { onOpenHandler } = props

    return (
        <AppBar sx={{ display: 'flex', flexDirection: 'row', position: 'static', backgroundImage: 'none', boxShadow: 'none' }}>
            <Toolbar sx={{ marginRight: 'auto' }}>
                <IconButton sx={{ color: 'white', marginRight: '10px' }} onClick={onOpenHandler}> <MenuIcon /> </IconButton>
                <Typography> THEME EXAMPLE </Typography>
            </Toolbar>
            <Toolbar>
                <Avatar>

                </Avatar>
            </Toolbar>
        </AppBar>
    )
}
export default Header;