import { IoHomeOutline } from "react-icons/io5";
import { IoTerminalOutline } from "react-icons/io5";
import { IoBuildOutline } from "react-icons/io5";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { LuMonitorCheck } from "react-icons/lu";
import { GrDocumentUser, GrUserSettings } from "react-icons/gr";

const OperationMenu = () => {
    const menus = [
        {
            name: 'Home',
            id: 'home-id',
            url: "/home",
            icon: <IoHomeOutline />,
        },
        {
            name: 'Monitoring',
            id: 'monitoring-id',
            type: 'group',
            group_id: 'monitoring-group',
            icon: <LuMonitorCheck />,
            children: [
                {
                    name: 'Topolgy',
                    id: 'monitoring-topolgy-id',
                    url: '/monitoring/topolgy',
                    //url: '#',
                },
                {
                    name: 'Metrics',
                    id: 'monitoring-metrics-id',
                    url: '/monitoring/metrics',
                    //url: '#',
                },
                {
                    name: 'Dashboards',
                    id: 'monitoring-dashboards-id',
                    url: '/monitoring/dashboards',
                    //url: '#',
                },
                {
                    name: 'Alerting',
                    id: 'monitoring-alerting-id',
                    url: '/monitoring/alerting',
                    //url: '#',
                },
            ]
        },
        {
            name: 'Excute Task',
            id: 'excute_task-id',
            type: 'group',
            group_id: 'excute_task-group',
            icon: <IoTerminalOutline />,
            children: [
                {
                    name: 'Excute',
                    id: 'excute_task-excute-id',
                    url: '/excute_task/excute',
                    //url: '#',
                },
                {
                    name: 'Batches',
                    id: 'excute_task-batches-id',
                    url: '/excute_task/batches',
                    //url: '#',
                },
                {
                    name: 'Taskes',
                    id: 'excute_task-tasks-id',
                    url: '/excute_task/tasks',
                    //url: '#',
                },
                {
                    name: 'Reports',
                    id: 'excute_task-reports-id',
                    url: '/excute_task/reports',
                    //url: '#',
                },
            ]
        },
        {
            name: 'User Management',
            id: 'user_management-id',
            type: 'group',
            group_id: 'user_management-group',
            icon: <GrUserSettings />,
            children: [
                {
                    name: 'Users',
                    id: 'user_management-users-id',
                    url: '/user_management/users',
                    //url: '#',
                },
                {
                    name: 'Authorizations',
                    id: 'user_management-authorizations-id',
                    url: '/user_management/authorizations',
                    //url: '#',
                }
            ]
        },
        {
            name: 'History',
            id: 'history-id',
            type: 'group',
            group_id: 'history-group',
            icon: <GrDocumentUser />,
            children: [
                {
                    name: 'Audit',
                    id: 'history-audit-id',
                    url: '#',
                },
                {
                    name: 'Authorization',
                    id: 'history-authorization-id',
                    url: '#',
                },
                {
                    name: 'Excute Task',
                    id: 'history-excute_task-id',
                    url: '#',
                }
            ]
        },
        {
            name: 'Project',
            id: 'project-id',
            url: "/project",
            //url: '#',
            icon: <IoDocumentAttachOutline />,
        },
        {
            name: 'Builds',
            id: 'builds-id',
            url: "/builds",
            //url: '#',
            icon: <IoBuildOutline />,
        },
    ]
    return menus;
}

export { OperationMenu }