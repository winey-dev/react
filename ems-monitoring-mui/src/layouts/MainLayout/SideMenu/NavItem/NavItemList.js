import { List, ListItem, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const CustomListItem = ({ to, primary }) => {
    const location = useLocation()

    return (
        <ListItem selected={to === location.pathname} component={NavLink} to={to} sx={{ pl: 4, color: '#fff' }}>
            <ListItemText primary={primary} />
        </ListItem>
    )
}
const NavItemList = (props) => {
    const { items } = props;
    const menuList = items.map((item) => {
        return (
            <CustomListItem key={item.id} to={item.url} primary={item.name} />
        )
    }
    )

    return (
        <List component="div" disablePadding>
            {menuList && menuList}
        </List>

    )
}

export default NavItemList;