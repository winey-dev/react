import { useRoutes } from 'react-router-dom';

// project import
import MainRoutes from './MainRoutes';


const AppRoutes = () => {
    return useRoutes([MainRoutes]);
}

export default AppRoutes;