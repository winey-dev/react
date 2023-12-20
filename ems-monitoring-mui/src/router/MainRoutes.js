import MainLayout from '../layouts/MainLayout/MainLayout'
import { Navigate } from 'react-router-dom';
import HomePage from './Home';
import UserManagementRoutes from './UserManagement/UserRoutes';
import ProjectRoutes from './Project/ProjectRoutes';
import BuildsRoutes from './Builds/BuildsRoutes';
import ExcuteTaskRoutes from './ExcuteTask/ExcuteTaskRoutes';
import MonitoringRoutes from './Monitoring/Monitoring';



const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '',
            element: <Navigate to='home' />,
        },
        {
            path: 'home',
            element: <HomePage />,
        },
        MonitoringRoutes,
        ExcuteTaskRoutes,
        UserManagementRoutes,
        ProjectRoutes,
        BuildsRoutes,
    ]
}

export default MainRoutes;