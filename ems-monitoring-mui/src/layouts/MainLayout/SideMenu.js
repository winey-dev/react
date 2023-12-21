
import { Box, Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { OperationMenu } from '../../menus/MenuItems';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// const WrapperSideMenu = styled(Box)`
// display: ${({ open }) => open ? 'flex' : 'none'};
// flex-direction: row;
// max-width: ${({ open }) => open ? '20vw' : '0vw'};
// min-width: ${({ open }) => open ? '15vw' : '0vw'};
// background-color: ${({ theme }) => theme.palette.background};
// border-right: solid 0.1rem ${({ theme }) => theme.palette.divider};
// `

const WrapperSideMenu = styled(Box)`
    display: ${({ open }) => open ? 'flex' : 'none'};
    flex-direction: row;
    height: 100%;
    max-width: ${({ open }) => open ? '20vw' : '0vw'};
    min-width: ${({ open }) => open ? '15vw' : '0vw'};
    background-color: ${({ theme }) => theme.palette.background.paper};
    border-right: solid 0.1rem ${({ theme }) => theme.palette.divider};
`

const fontSize = {
    fontSize: '18px',
    fontWeight: '500'
}

const iconSize = {
    fontSize: '20px',
}

const SideMenu = ({ open }) => {
    const theme = useTheme()
    const [groupOpen, setGroupOpen] = useState([]);
    const navigate = useNavigate();
    const [selectedID, setSelectedID] = useState('home-id')
    const menuList = OperationMenu()

    const menuGroupClick = (index) => {
        const copyGroupOpen = [...groupOpen];
        if (groupOpen[index]) {
            copyGroupOpen[index] = false
        } else {
            copyGroupOpen[index] = true
        }
        setGroupOpen(copyGroupOpen)
    }

    const onClickEvent = (id, path) => {
        setSelectedID(id)
        navigate(path)
    }

    const sideMenuList = menuList.map((menu, index) => {
        switch (menu.type) {
            case "group":
                return (
                    <>
                        {menu.children &&
                            <>
                                <ListItemButton
                                    key={menu.id}
                                    onClick={() => menuGroupClick(index)}
                                    sx={{
                                        marginTop: '5px',
                                    }}
                                >
                                    {menu.icon && <ListItemIcon sx={iconSize}>
                                        {menu.icon}
                                    </ListItemIcon>}
                                    <ListItemText primary={menu.name} primaryTypographyProps={fontSize} />
                                    {groupOpen[index] ? <KeyboardArrowUpIcon fontSize='small' /> : <KeyboardArrowRightIcon fontSize='small' />}
                                </ListItemButton>

                                <Collapse in={groupOpen[index]} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {menu.children.map((child) => (
                                            <ListItemButton
                                                key={child.id}
                                                selected={selectedID === child.id}
                                                onClick={() => onClickEvent(child.id, child.url)}
                                                sx={{
                                                    pl: 4,
                                                    marginTop: '4px',
                                                    "&.Mui-selected": {
                                                        borderLeft: "solid 0.5rem",
                                                        borderLeftColor: theme.palette.primary.dark,
                                                    },
                                                }}
                                            >
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
                        <ListItemButton
                            key={menu.id}
                            selected={selectedID === menu.id}
                            onClick={() => onClickEvent(menu.id, menu.url)}
                            sx={{
                                marginTop: '5px',
                                "&.Mui-selected": {
                                    borderLeft: "solid 0.5rem",
                                    borderLeftColor: theme.palette.primary.dark,
                                },
                            }}
                        >
                            {menu.icon && <ListItemIcon sx={iconSize}>
                                {menu.icon}
                            </ListItemIcon>}
                            <ListItemText primary={menu.name} primaryTypographyProps={fontSize} />
                        </ListItemButton >
                    </>


                )
        }
    })

    return (
        <WrapperSideMenu
            key={'side-menu'}
            theme={theme}
            open={open}
            sx={{
                overflow: "auto",
                scrollbarWidth: 'thin',
                '&::-webkit-scrollbar': {
                    width: '10px',
                    borderRadius: '100px',
                },
                '&::-webkit-scrollbar-track': {
                    background: "#f1f1f1",
                    borderRadius: '100px',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#888',
                    borderRadius: '100px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    background: '#555'
                }
            }}>
            <List key={'side-menu'} sx={{ width: '100%', padding: 0 }}>
                {sideMenuList && sideMenuList}
            </List>
        </WrapperSideMenu>
    )
}

export default SideMenu;