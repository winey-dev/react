
import { Box, Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { OperationMenu } from '../../menus/MenuItems';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
const WrapperSideMenu = styled(Box)`
    display: ${({ toggle }) => toggle === 'open' ? 'flex' : 'none'};
    flex-direction: row;

    max-width: ${({ toggle }) => toggle === 'open' ? '20vw' : '0vw'};
    min-width: ${({ toggle }) => toggle === 'open' ? '15vw' : '0vw'};

    background-color: ${({ theme }) => theme.palette.background};
    border-right: solid 1px ${({ theme }) => theme.palette.divider};
`

const SideMenu = ({ toggle }) => {
    const theme = useTheme()
    const [open, setOpen] = useState([]);
    const menuGroupClick = (index) => {
        const copyOpen = [...open];
        if (open[index] === undefined || !open[index]) {
            copyOpen[index] = true
        } else {
            copyOpen[index] = false
        }
        setOpen(copyOpen)
    }


    const sideMenuList = OperationMenu().map((menu, index) => {
        switch (menu.type) {
            case "group":
                return (
                    <>
                        {menu.children &&
                            <>
                                <ListItemButton key={menu.id} onClick={() => menuGroupClick(index)} sx={{ borderBottom: 'solid 1px', borderBottomColor: theme.palette.divider }}>
                                    {menu.icon && <ListItemIcon >
                                        {menu.icon}
                                    </ListItemIcon>}
                                    <ListItemText primary={menu.name} />
                                    {open[index] ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={open[index]} timeout="auto" unmountOnExit sx={{ borderBottom: 'solid 1px', borderBottomColor: theme.palette.divider }}>
                                    <List component="div" disablePadding>
                                        {menu.children.map((child) => (
                                            <ListItemButton key={child.id} sx={{ pl: 6 }} component={NavLink} to={child.url}>
                                                {child.icon && <ListItemIcon>
                                                    {child.icon}
                                                </ListItemIcon>}
                                                <ListItemText primary={child.name} />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </Collapse>
                            </>
                        }
                    </>
                )
            default:
                return (
                    <>
                        <ListItemButton key={menu.id} component={NavLink} to={menu.url} sx={{ borderBottom: 'solid 1px', borderBottomColor: theme.palette.divider }}>
                            {menu.icon && <ListItemIcon >
                                {menu.icon}
                            </ListItemIcon>}
                            <ListItemText primary={menu.name} />
                        </ListItemButton >
                    </>


                )
        }
    })

    return (
        <WrapperSideMenu key={'wrapper-side-menu'} theme={theme} toggle={toggle}>
            <List sx={{ width: '100%', padding: 0 }}>
                {sideMenuList && sideMenuList}
            </List>
        </WrapperSideMenu>
    )
}

export default SideMenu;