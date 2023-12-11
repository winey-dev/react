import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import AppHeader from './AppHeader/AppHeader';
import SideMenu from './SideMenu/SideMenu';
import { useState } from 'react';
const MainLayout = () => {
    const [toggle, setToggle] = useState(false);

    const onClose = () => {
        setToggle(!toggle)
    }

    return (
        <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
            <AppHeader onClose={onClose} />
            <Box sx={{ display: 'flex', width: '100%', flexDirection: 'row' }}>
                <SideMenu onClose={onClose} toggle={toggle} />
                <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    )
}
export default MainLayout