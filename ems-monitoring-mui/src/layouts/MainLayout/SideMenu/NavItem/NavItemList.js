import { List, ListItemButton, ListItemText } from '@mui/material';
const NavItemList = (props) => {
    const { items } = props;
    const menuList = items.map((menu) => {
        console.log(menu)
        return (
            <ListItemButton key={menu.id} to={menu.url} sx={{ pl: 4 }}>
                <ListItemText primary={menu.name} />
            </ListItemButton>
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