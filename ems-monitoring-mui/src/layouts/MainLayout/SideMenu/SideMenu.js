
import { List, Box } from '@mui/material';
import { OperationMenu } from '../../../menus/MenuItems';
import { useState } from 'react';
import NavItem from './NavItem/NavItem';
import NavGroup from './NavGroup/NavGroup';

const SideMenu = ({ toggle, onClose }) => {

    const [isMenuClose, setMenuClose] = useState([]);

    const onMenuClose = (index) => {

        const copyClose = [...isMenuClose];

        if (isMenuClose[index] === undefined) {
            copyClose[index] = true
        } else if (!isMenuClose[index]) {
            copyClose[index] = true
        } else {
            copyClose[index] = false
        }

        setMenuClose(copyClose)
    }


    const sideMenuList = OperationMenu().map((menu, index) => {
        switch (menu.type) {
            case "group":
                return (
                    <NavGroup key={menu.id} index={index} open={isMenuClose[index]} onClick={onMenuClose} item={menu} />
                )
            default:
                return (
                    <NavItem key={menu.id} item={menu} />
                )

        }
    })

    return (
        <Box
            anchor='left'
            open={toggle}
            variant="temperay"
            onClose={onClose}
        >
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
            >
                {sideMenuList}

            </List>
        </Box>

    )
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