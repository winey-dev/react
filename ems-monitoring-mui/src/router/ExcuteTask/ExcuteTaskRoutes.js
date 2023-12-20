import Dummy from '../../pages/Dummy';


const ExcuteTaskRoutes = {
    path: 'excute_task',
    children: [
        {
            path: 'excute',
            element: <Dummy name='excute' />
        },
        {
            path: 'batches',
            element: <Dummy name='batches' />
        },
        {
            path: 'tasks',
            element: <Dummy name='tasks' />
        },
        {
            path: 'reports',
            element: <Dummy name='reports' />
        }
    ]
}

export default ExcuteTaskRoutes;