
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { OperationMenu } from '../../../menus/MenuItems';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const ListColorStyle = {
    width: '100%', maxWidth: 360,
    // bgcolor: 'text.primary', color: '#fff'
}

const ListGroupTextStyle = {
    fontSize: '15px',
}


const IconStyle = {
    // color: '#fff',
    fontSize: 30,
}


const SideMenu = ({ toggle, onClose }) => {
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
                                <ListItemButton key={menu.id} onClick={() => menuGroupClick(index)}>
                                    {menu.icon && <ListItemIcon sx={IconStyle}>
                                        {menu.icon}
                                    </ListItemIcon>}
                                    <ListItemText primary={menu.name} primaryTypographyProps={ListGroupTextStyle} />
                                    {open[index] ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={open[index]} timeout="auto" unmountOnExit>
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
                    <ListItemButton key={menu.id} component={NavLink} to={menu.url}>
                        {menu.icon && <ListItemIcon sx={IconStyle}>
                            {menu.icon}
                        </ListItemIcon>}
                        <ListItemText primary={menu.name} primaryTypographyProps={ListGroupTextStyle} />
                    </ListItemButton >
                )
        }
    })
    return (
        <List
            key={'side-menu'}
            sx={ListColorStyle}
            component="nav"
        >
            {sideMenuList && sideMenuList}

        </List>
    )
    // return (
    //     <List
    //         sx={{
    //             width: '100%', maxWidth: 360, bgcolor: 'text.primary',
    //             // selected and (selected + hover) states
    //             '&& .Mui-selected, && .Mui-selected:hover': {
    //                 bgcolor: 'red',
    //                 '&, & .MuiListItemIcon-root': {
    //                     color: 'pink',
    //                 },
    //             },
    //             // hover states
    //             '& .MuiListItemButton-root:hover': {
    //                 bgcolor: 'orange',
    //                 '&, & .MuiListItemIcon-root': {
    //                     color: 'yellow',
    //                 },
    //             },

    //         }}
    //         component="nav"
    //     >
    //         {sideMenuList}

    //     </List>
    // )
}

export default SideMenu;

//const navitate = useNavigate();
// <div style={{ display: 'flex', width: '100vh' }}>
//     <Button onClick={() => navitate('/')}> Home </Button>
//     <Button onClick={() => navitate('/monitoring/metrics')}> Application/Metrics </Button>
//     <Button onClick={() => navitate('/monitoring/alerts')}> Application/Alerts </Button>
//     <Button onClick={() => navitate('/monitoring/settings')}> Application/Settings </Button>
//     <Button onClick={() => navitate('/monitoring/users')}> Authorization/Users </Button>
//     <Button onClick={() => navitate('/monitoring/permissions')}> Authorization/Permissions </Button>
// </div>