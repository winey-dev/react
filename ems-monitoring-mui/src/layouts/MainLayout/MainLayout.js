import { Outlet, useNavigate } from 'react-router-dom'
import { AppBar, Box, Button } from '@mui/material'
const MainLayout = () => {
    const navitate = useNavigate();

    return (
        <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
            <AppBar>

            </AppBar>
            <div style={{ display: 'flex', width: '100vh' }}>
                <Button onClick={() => navitate('/')}> Home </Button>
                <Button onClick={() => navitate('/monitoring/metrics')}> Application/Metrics </Button>
                <Button onClick={() => navitate('/monitoring/alerts')}> Application/Alerts </Button>
                <Button onClick={() => navitate('/monitoring/settings')}> Application/Settings </Button>
                <Button onClick={() => navitate('/monitoring/users')}> Authorization/Users </Button>
                <Button onClick={() => navitate('/monitoring/permissions')}> Authorization/Permissions </Button>
            </div>

            {/* Navigation Item List */}

            <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                <Outlet />
            </Box>
        </Box>
    )
}
export default MainLayout