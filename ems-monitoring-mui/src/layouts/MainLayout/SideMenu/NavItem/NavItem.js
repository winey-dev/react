import { ListItemButton, ListItemText, ListItemIcon } from '@mui/material';

const NavItem = (props) => {
    const { item } = props;
    console.log(item)
    return (
        <ListItemButton to={item.url}>
            {item.icon &&
                <ListItemIcon>
                    {item.icon}
                </ListItemIcon>}
            <ListItemText primary={item.name} />
        </ListItemButton>
    )
}
export default NavItem;