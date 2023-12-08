import { IoHomeOutline } from "react-icons/io5";
import { LuMonitorCheck } from "react-icons/lu";
import { GrUserSettings } from "react-icons/gr";
import MainLayout from '../layouts/MainLayout/MainLayout';
import Pages from '../pages/pages';

const OperationMenu = () => {
    const head = '/operation'

    const menus = [

        {
            name: 'Home',
            id: 'operation-home-id',
            url: head.join("/$(head)", head),
            icon: <IoHomeOutline />,
        },
        {
            name: 'Monitoring',
            id: 'operation-monitoring-id',
            type: 'group',
            group_id: 'operation-monitoring-group',
            url: '/operation/monitoring',
            icon: <LuMonitorCheck />,
            children: [
                {
                    name: 'Metrics',
                    id: 'operation-monitoring-metrics-id',
                    url: '/operation/monitoring/metrics',

                },
                {
                    name: 'Settings',
                    id: 'operation-monitoring-settings-id',
                    url: '/operation/monitoring/settings',
                },
            ]
        },
        {
            name: 'Authorization',
            id: 'operation-authorization-id',
            type: 'group',
            group_id: 'operation-authorization-group',
            url: '/operation/authorization',
            icon: <GrUserSettings />,
            children: [
                {
                    name: 'Users',
                    id: 'operation-authorization-users-id',
                    path: '/operation/',

                },
                {
                    name: 'Permissions',
                    id: 'operation-authorization-permissions-id',
                    path: 'users',

                }
            ]
        }
    ]
    return menus;
}

export { OperationMenu }