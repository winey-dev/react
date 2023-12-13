import { IoHomeOutline } from "react-icons/io5";
import { FaTerminal } from "react-icons/fa6";


const OperationMenu = () => {
    const menus = [
        {
            name: 'Home',
            id: 'operation-home-id',
            url: "/home",
            icon: <IoHomeOutline />,
        },
        {
            name: 'Example',
            id: 'example-id',
            type: 'group',
            url: '/example',
            icon: <FaTerminal />,
            children: [
                {
                    name: 'NestedList',
                    id: 'nestedlist',
                    url: '/example/nested_list_example',
                }
            ]
        }
    ]
    return menus;
}

export { OperationMenu }