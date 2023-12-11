import { useRoutes } from 'react-router-dom'
import Layout from './Layouts/Layout'
import Page from './Pages/Page'
const Router = () => {
    const noneRoutes = {
        path: '/',
        element: <Layout />,

    }

    const mainRoutes = {
        path: 'authorization',
        element: <Layout />,
        children: [
            {
                path: 'users',
                element: <Page name='users page' />
            },
            {
                path: 'permissions',
                element: <Page name='permission page' />
            },
        ]
    }

    return useRoutes([noneRoutes, mainRoutes])
}
export default Router