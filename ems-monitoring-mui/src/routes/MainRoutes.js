import MainLayout from '../layouts/MainLayout/MainLayout'
import Pages from '../pages/pages';
const MainRoutes = {
    path: 'operation',
    element: <MainLayout />,
    children: [
        {
            path: 'home',
            element: <Pages name='home' />,
        },
        {
            path: 'monitoring',
            children: [
                {
                    path: 'metrics',
                    element: <Pages name='metrics' />
                },
                {
                    path: 'alerts',
                    element: <Pages name='alerts' />
                },
                {
                    path: 'settings',
                    element: <Pages name='settings' />
                }
            ]
        },
        {
            path: 'authorization',
            children: [
                {
                    path: 'users',
                    element: <Pages name='user page' />
                },
                {
                    path: 'permissions',
                    element: <Pages name='permission page' />
                }
            ],
        },
    ]
}

export default MainRoutes;