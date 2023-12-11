import { useState } from 'react';
import './Layout.css'
import { Outlet } from 'react-router-dom';
import SideMenu from './SideMenu/SideMenu';
import Header from './Header/Header';
const Layout = () => {
    const [isOpen, setIsOpen] = useState('sidebar-open')
    const onEventSideMenu = () => {
        console.log(isOpen)
        if (isOpen === 'sidebar-open') {
            setIsOpen('sidebar-close')
        } else {
            setIsOpen('sidebar-open')
        }
    }
    return (
        <div className='layout'>
            <Header onClick={onEventSideMenu} />
            <SideMenu />
            <div className='main'>
                <Outlet />
            </div>
        </div >
    )
}
export default Layout;