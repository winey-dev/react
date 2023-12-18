import { useRoutes } from 'react-router-dom';

// project import

import MainRoutes from './MainRoutes';


const Router = () => {
    return useRoutes([MainRoutes]);
}

export default Router;