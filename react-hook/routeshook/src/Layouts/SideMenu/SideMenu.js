import '../Layout.css'
import { NavLink } from 'react-router-dom'
const SideMenu = (props) => {
    return (
        <div className={props.isOpen}>
            <ul>
                <li><NavLink to='/authorization/users' style={({ isActive }) => ({ color: isActive ? 'black' : 'red' })}> Users</NavLink></li>
                <li><NavLink to='/authorization/permissions' style={({ isActive }) => ({ color: isActive ? 'black' : 'red' })}> Permissions</NavLink></li>
            </ul>
        </div>
    )
}
export default SideMenu