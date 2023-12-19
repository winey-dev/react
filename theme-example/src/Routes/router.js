import { Navigate, useRoutes } from 'react-router-dom'
import MainLayout from '../Layouts/MainLayout'
import { Home, About, Profile } from '../Pages'
const Router = () => {

    return useRoutes([
        {
            path: '/',
            element: <MainLayout />,
            children: [
                {
                    path: '',
                    element: <Navigate to='home' />
                },
                {
                    path: 'home',
                    element: <Home />
                },
                {
                    path: 'about',
                    element: <About />
                },
                {
                    path: 'profile',
                    element: <Profile />
                },
            ]
        },
    ])
}

export default Router