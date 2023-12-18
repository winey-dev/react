
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
    min-width: ${({ toggle }) => toggle === 'open' ? '18vw' : '0vw'};

    background-color: ${({ theme }) => theme.palette.background};
    border-right: solid 1px ${({ theme }) => theme.palette.divider};
`
const fontSize = {
    fontSize: '18px'
}

const iconSize = {
    fontSize: '20px'
}
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

    const menuList = OperationMenu()

    const sideMenuList = menuList.map((menu, index) => {
        switch (menu.type) {
            case "group":
                return (
                    <>
                        {menu.children &&
                            <>
                                <ListItemButton key={menu.id} onClick={() => menuGroupClick(index)}>
                                    {menu.icon && <ListItemIcon sx={iconSize}>
                                        {menu.icon}
                                    </ListItemIcon>}
                                    <ListItemText primary={menu.name} primaryTypographyProps={fontSize} />
                                    {open[index] ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>

                                <Collapse in={open[index]} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {menu.children.map((child) => (
                                            <ListItemButton key={child.id} sx={{ pl: 4 }} component={NavLink} to={child.url}>
                                                <ListItemText primary={child.name} />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </Collapse>
                                <Divider />
                            </>
                        }
                    </>
                )
            default:
                return (
                    <>
                        <ListItemButton key={menu.id} component={NavLink} to={menu.url} >
                            {menu.icon && <ListItemIcon sx={iconSize}>
                                {menu.icon}
                            </ListItemIcon>}
                            <ListItemText primary={menu.name} primaryTypographyProps={fontSize} />
                        </ListItemButton >
                        <Divider />
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