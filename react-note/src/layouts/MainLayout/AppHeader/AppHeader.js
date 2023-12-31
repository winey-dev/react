import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
const AppHeader = (props) => {
    return (
        <AppBar position='static'>
            {/* <AppBar position='static' sx={{ bgcolor: 'text.primary' }}> */}
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={props.onClose}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    My Web
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default AppHeader;