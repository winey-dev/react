import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { ListItemIcon, ListItemText, ListItemButton, Collapse } from '@mui/material';
import NavItemList from '../NavItem/NavItemList';
const NavGroup = (props) => {
    const { index, open, item, onClick } = props;
    return (
        <>
            <ListItemButton onClick={() => onClick(index)}>
                <ListItemIcon sx={{ color: '#fff' }}>
                    {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <NavItemList items={item.children} />
            </Collapse>
        </>
    )
}
export default NavGroup;