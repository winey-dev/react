import { AppBar, IconButton, Toolbar, Typography, Avatar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';

// 컴포넌트 style 지정하기


const Header = (props) => {
    const { onOpenHandler } = props

    return (
        <AppBar sx={{ display: 'flex', flexDirection: 'row', position: 'static', backgroundImage: 'none', boxShadow: 'none' }}>
            <Toolbar sx={{ marginRight: 'auto' }}>
                <IconButton sx={{ color: 'white', marginRight: '10px' }} onClick={onOpenHandler}> <MenuIcon /> </IconButton>
                <Typography variant='h6'> SKT cMSS </Typography>
            </Toolbar>
            <Toolbar>
                <Avatar>

                </Avatar>
            </Toolbar>
        </AppBar>
    )
}
export default Header;