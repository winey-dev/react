import Dummy from '../../pages/Dummy';


const BuildsRoutes = {
    path: 'builds',
    children: [
        {
            path: '',
            element: <Dummy name='builds list view' />,
        }
    ]
}

export default BuildsRoutes;