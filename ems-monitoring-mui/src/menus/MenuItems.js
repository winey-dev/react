import { IoHomeOutline } from "react-icons/io5";
import { LuMonitorCheck } from "react-icons/lu";
import { GrUserSettings } from "react-icons/gr";


const OperationMenu = () => {
    const menus = [

        {
            name: 'Home',
            id: 'operation-home-id',
            url: "/operation/home",
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
                    url: '/operation/authorization/users',

                },
                {
                    name: 'Permissions',
                    id: 'operation-authorization-permissions-id',
                    url: '/operation/authorization/permissions',

                }
            ]
        }
    ]
    return menus;
}

export { OperationMenu }