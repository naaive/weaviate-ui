import {
    CrownFilled,
    SmileFilled,
} from '@ant-design/icons';

export default {
    route: {
        path: '/',
        routes: [
            {
                path: '/schema',
                name: 'Schema',
                icon: <SmileFilled />,
                component: <div>123</div>,
            },
            {
                path: '/class',
                name: 'Class',
                icon: <CrownFilled />,
                access: 'canAdmin',
                component: './Admin',
                routes: [
                    {
                        path: '/admin/sub-page1',
                        name: '一级页面',
                        icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
                        component: './Welcome',
                    },
                    {
                        path: '/admin/sub-page2',
                        name: '二级页面',
                        icon: <CrownFilled />,
                        component: './Welcome',
                    },
                    {
                        path: '/admin/sub-page3',
                        name: '三级页面',
                        icon: <CrownFilled />,
                        component: './Welcome',
                    },
                ],
            },
        ],
    },
    location: {
        pathname: '/',
    },
};