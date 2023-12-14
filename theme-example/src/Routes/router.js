import { useRoutes } from 'react-router-dom'
import MainLayout from '../Layouts/MainLayout'
import Page from '../Components/Page/Page'
import { Home, About, Profile } from '../Pages'
const Router = () => {
    return useRoutes([
        {
            path: '/',
            element: <MainLayout />,
            children: [
                {
                    element: <Page title='home' element={<Home />} />
                },
                {
                    path: 'about',
                    element: <Page title='about' element={<About />} />
                },
                {
                    path: 'profile',
                    element: <Page title='profile' element={<Profile />} />
                },
            ]
        },
    ])
}

export default Router