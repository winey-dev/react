import { Box, List, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import MenuItems from '../MenuItems/MenuItem';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const MySideMenu = styled(Box)`
    display: ${({ toggle }) => toggle === 'open' ? 'flex' : 'none'};
    flex-direction: row;

    max-width: ${({ toggle }) => toggle === 'open' ? '20vw' : '0vw'};
    min-width: ${({ toggle }) => toggle === 'open' ? '15vw' : '0vw'};

    background-color: ${({ theme }) => theme.palette.background};
    border-right: solid  ${({ theme }) => theme.palette.divider};
`
const SideMenu = (props) => {
    const theme = useTheme()
    const items = MenuItems.map((item) => (
        <ListItemButton key={item.name} component={NavLink} to={item.url} sx={{ borderBottom: 'solid 1px', borderBottomColor: theme.palette.divider }}>
            <ListItemIcon>
                {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} />
        </ListItemButton>
    ))
    return (
        <MySideMenu theme={theme} toggle={props.toggle} >
            <List sx={{ width: '100%', padding: 0 }}>
                {items && items}
            </List>
        </MySideMenu>


    )
}

export default SideMenu;