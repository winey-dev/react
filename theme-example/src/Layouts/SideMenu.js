import { Box, List, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import MenuItems from '../MenuItems/MenuItem';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';

const MySideMenu = styled(Box)`
    display: ${({ open }) => open ? 'flex' : 'none'};
    flex-direction: row;
    max-width: ${({ open }) => open ? '20vw' : '0vw'};
    min-width: ${({ open }) => open ? '15vw' : '0vw'};
    background-color: ${({ theme }) => theme.palette.background};
    border-right: solid  ${({ theme }) => theme.palette.divider};
`




const SideMenu = (props) => {
    const theme = useTheme()
    const navigate = useNavigate();
    const [selectedIndex, setSelectedIndex] = useState(0)

    const onClickEvent = (index, path) => {
        console.log("navigation to ", path)
        setSelectedIndex(index)
        navigate(path);
    }

    const items = MenuItems.map((item, index) => (
        <ListItemButton
            key={item.name}
            selected={selectedIndex === index}
            onClick={() => onClickEvent(index, item.url)}
            sx={{
                "&.Mui-selected": {
                    borderLeft: "solid 1rem",
                    borderLeftColor: theme.palette.primary.light,
                },
            }}
        >
            <ListItemIcon>
                {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} />
        </ListItemButton>
    ))
    return (
        <MySideMenu theme={theme} open={props.open} >
            <List sx={{ width: '100%', padding: 0 }}>
                {items && items}
            </List>
        </MySideMenu>


    )
}

export default SideMenu;