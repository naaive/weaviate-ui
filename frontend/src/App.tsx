import {PageContainer, ProLayout} from '@ant-design/pro-components';
import {useEffect, useState} from "react";
import Welcome from "./Welcome.tsx";
import {CrownFilled, SmileFilled} from "@ant-design/icons";
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
                    icon: <SmileFilled/>,
                    component: <div>123</div>,
                },
                {
                    path: '/class',
                    name: 'Class',
                    icon: <CrownFilled/>,
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
                            icon: <CrownFilled/>,
                            component: './Welcome',
                        },
                        {
                            path: '/admin/sub-page3',
                            name: '三级页面',
                            icon: <CrownFilled/>,
                            component: './Welcome',
                        },
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
                logo="https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*1NHAQYduQiQAAAAAAAAAAABkARQnAQ"
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