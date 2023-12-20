import Dummy from '../../pages/Dummy';


const MonitoringRoutes = {
    path: 'monitoring',
    children: [
        {
            path: 'topolgy',
            element: <Dummy name='topolgy' />
        },
        {
            path: 'metrics',
            element: <Dummy name='metrics' />
        },
        {
            path: 'dashboards',
            element: <Dummy name='dashboards' />
        },
        {
            path: 'alerting',
            element: <Dummy name='alerting' />
        },

    ]
}

export default MonitoringRoutes;