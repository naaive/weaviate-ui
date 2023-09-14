export default [
    {
        path: '/',
        name: '😈 欢迎',
        routes: [
            {
                path: '/welcome',
                name: 'one',
                routes: [
                    {
                        path: '/welcome/welcome',
                        name: 'two',
                        exact: true,
                    },
                ],
            },
        ],
    },
    {
        path: '/demo',
        name: '例子',
        component: './Welcome',
    },
];