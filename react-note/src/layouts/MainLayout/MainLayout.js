import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import AppHeader from './AppHeader/AppHeader';
import SideMenu from './SideMenu/SideMenu';
import { useState } from 'react';

const MainLayout = () => {
    const [toggle, setToggle] = useState(false);
    const onToggleHandler = () => {
        setToggle(!toggle)
    }

    return (
        <Box sx={{ display: 'flex', height: '100%', flexDirection: 'column' }} color='inherit'>
            <AppHeader onClose={onToggleHandler} />
            <Box sx={{ display: 'flex', height: '100%', flexDirection: 'row' }}>
                <SideMenu onClose={onToggleHandler} toggle={toggle} />
                <Outlet />
                {/* <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                   
                </Box> */}
            </Box>
        </Box>
    )
}
export default MainLayout