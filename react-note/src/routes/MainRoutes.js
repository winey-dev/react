import MainLayout from '../layouts/MainLayout/MainLayout'
import Page from '../layouts/MainLayout/Contents/Page';
import NestedList from '../pages/ListExample';
import Home from '../pages/Home';
const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: 'home',
            element: <Page title='home' element={<Home />} />,
        },
        {
            path: 'example',
            children: [
                {
                    path: 'nested_list_example',
                    element: <Page title='Nested List' element={<NestedList />} />
                }
            ]
        }
    ]
}

export default MainRoutes;