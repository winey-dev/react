import Dummy from '../../pages/Dummy';


const ProjectRoutes = {
    path: 'project',
    children: [
        {
            path: '',
            element: <Dummy name='project list view' />,
        },
        {
            path: 'detail/:project_id',
            element: <Dummy name='project detailed view page' />
        }
    ]
}

export default ProjectRoutes;