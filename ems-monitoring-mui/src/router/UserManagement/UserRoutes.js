import Dummy from '../../pages/Dummy';
import { UsersPage } from '../../pages/UserManagement';

const UserManagementRoutes = {
    path: 'user_management',
    children: [
        {
            path: 'users',
            element: <UsersPage />
        },
        {
            path: 'users/create',
            element: <Dummy name='user create' />
        },
        {
            path: 'users/update/:id',
            element: <Dummy name='user update' />
        },
        {
            path: 'authorizations',
            element: <Dummy name='authorizations' />
        },
        {
            path: 'authorizations/create',
            element: <Dummy name='authorizations create' />
        },
        {
            path: 'authorizations/update/:id',
            element: <Dummy name='authorizations update' />
        },
    ]
}

export default UserManagementRoutes;