import { ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';


const CustomIconListItem = ({ icon, to, primary }) => {
    const location = useLocation()

    return (
        // <ListItem onSelect={() => (to === location.pathname)} component={NavLink} to={to} sx={{ pl: 4 }}>
        <ListItem selected={to === location.pathname} component={NavLink} to={to} sx={{ color: '#fff' }}>
            <ListItemIcon sx={{ color: '#fff', fontSize: 30 }}>
                {icon}
            </ListItemIcon>
            <ListItemText primary={primary} />
        </ListItem>
    )
}

const NavItem = (props) => {
    const { item } = props;
    console.log(item)
    return (
        <CustomIconListItem icon={item.icon} to={item.url} primary={item.name} />
    )
}

// const NavItem = (props) => {
//     const { item } = props;
//     console.log(item)
//     return (
//         <ListItem component={NavLink} to={item.url}>
//             {item.icon &&
//                 <ListItemIcon>
//                     {item.icon}
//                 </ListItemIcon>}
//             <ListItemText primary={item.name} />
//         </ListItem>
//     )
// }
export default NavItem;