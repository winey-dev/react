import LoginLayout from '../layouts/LoginLayout/LoginLayout'
import Pages from '../pages/pages';
const LoginRoutes = {
    path: '/',
    element: <LoginLayout />,
    children: [
        {
            path: 'login',
            element: <Pages name='login' />,
        }
    ]
}

export default LoginRoutes;