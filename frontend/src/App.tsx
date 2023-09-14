import {PageContainer, ProLayout} from '@ant-design/pro-components';
import {useEffect, useState} from "react";
import Welcome from "./Welcome.tsx";
import {BorderlessTableOutlined, CrownFilled, DashOutlined, SmileFilled, TableOutlined} from "@ant-design/icons";
import {getSchema} from "./api.ts";

// import loadsh
import _ from 'lodash';
import ClassData from "./ClassData.tsx";

export default () => {
    const [pathname, setPathname] = useState('/');

    const [routes, setRoutes] = useState({
        route: {
            path: '/',
            routes: [
                {
                    path: '/schema',
                    name: 'Schema',
                icon:<BorderlessTableOutlined />,
                    component: <div>123</div>,
                },
                {
                    path: '/class',
                    name: 'Class',
                icon: <TableOutlined />,
                    access: 'canAdmin',
                    component: './Admin',
                    routes: [

                    ],
                },
            ],
        },
        location: {
            pathname: '/',
        },
    })
    const [class2props, setClass2props] = useState({})
    useEffect(() => {
            getSchema().then((schemas) => {
                    let classes = schemas.classes;
                    routes.route.routes[1].routes = classes.map((schema: any) => ({
                        key: schema.class,
                        path: '/class/' + schema.class,
                        name: schema.class,
                        icon: <CrownFilled/>,
                    }))
                    setRoutes(_.cloneDeep(routes))
                    let class2props = {}
                    classes.forEach((schema: any) => {
                        // return a json object,key is schema.class,value is schema.properties
                        let key = `/class/${schema.class}`;
                        class2props[key] = schema.properties
                    });

                    setClass2props(class2props)
                }
            )
        }
        , [])
    return (
        <div
            style={{
                height: '100vh',
            }}
        >
            <ProLayout
                menuItemRender={(item, dom) => (
                    <div
                        onClick={() => {
                            setPathname(item.path || '/welcome');
                        }} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                    }}
                    >
                        {dom}
                    </div>
                )}
                subMenuItemRender={(_, dom) => (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                        }}
                    >
                        {dom}
                    </div>
                )}
                title="Weaviate UI"
                logo="data:image/jpeg;base64,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"
                menuHeaderRender={(logo, title) => (
                    <div
                        id="customize_menu_header"
                        style={{
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                        }}
                        onClick={() => {

                        }}
                    >
                        {logo}
                        {title}
                    </div>
                )}
                {...routes}
                location={{
                    pathname,
                }}
            >
                <PageContainer>
                    {
                        pathname === '/' || pathname === '/schema' ? <Welcome></Welcome> :
                            <ClassData pathname={pathname} propties={class2props[pathname]}></ClassData>
                    }
                </PageContainer>
            </ProLayout>
        </div>
    );
};