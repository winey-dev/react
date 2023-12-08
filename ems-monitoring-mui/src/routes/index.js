import { useRoutes } from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';


const AppRoutes = () => {
    return useRoutes([MainRoutes, LoginRoutes]);
}

export default AppRoutes;