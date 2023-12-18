import { IoHomeOutline } from "react-icons/io5";
import { LuMonitorCheck } from "react-icons/lu";
import { GrUserSettings } from "react-icons/gr";


const OperationMenu = () => {
    const menus = [

        {
            name: 'Home',
            id: 'operation-home-id',
            url: "/home",
            icon: <IoHomeOutline />,
        },
        {
            name: 'Monitoring',
            id: 'operation-monitoring-id',
            type: 'group',
            group_id: 'operation-monitoring-group',
            url: '/monitoring',
            icon: <LuMonitorCheck />,
            children: [
                {
                    name: 'Metrics',
                    id: 'operation-monitoring-metrics-id',
                    url: '/monitoring/metrics',

                },
                {
                    name: 'Settings',
                    id: 'operation-monitoring-settings-id',
                    url: '/monitoring/settings',
                },
            ]
        },
        {
            name: 'Authorization',
            id: 'operation-authorization-id',
            type: 'group',
            group_id: 'operation-authorization-group',
            url: '/authorization',
            icon: <GrUserSettings />,
            children: [
                {
                    name: 'Users',
                    id: 'operation-authorization-users-id',
                    url: '/authorization/users',

                },
                {
                    name: 'Permissions',
                    id: 'operation-authorization-permissions-id',
                    url: '/authorization/permissions',

                }
            ]
        }
    ]
    return menus;
}

export { OperationMenu }