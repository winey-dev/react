import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MenuItems from '../MenuItems/MenuItem';
import { NavLink } from 'react-router-dom';



const SideMenu = () => {
    const items = MenuItems.map((item) => (
        <ListItemButton key={item.name} component={NavLink} to={item.url}>
            <ListItemIcon>
                {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} />
        </ListItemButton>
    ))
    return (
        <Box display={'flex'} flexDirection={'row'}>
            <List>
                {items && items}
            </List>
        </Box>


    )
}

export default SideMenu;