import MainLayout from '../layouts/MainLayout/MainLayout'
import Pages from '../pages/pages';
import { Navigate } from 'react-router-dom';
import { PermissionsPage, UserCreatePage, UsersPage } from '../pages/Authorization';
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
                    element: <UsersPage />,
                    children: [
                        {
                            path: 'create',
                            element: <UserCreatePage />
                        }
                    ]
                },
                {
                    path: 'permissions',
                    element: <PermissionsPage />
                }
            ],
        }
    ]
}

export default MainRoutes;