import React, {useEffect, useState} from "react";
import {getClass} from "./api.ts";
import {ProTable} from "@ant-design/pro-components";

export default function ({pathname, propties}: any) {
    console.log(pathname, propties)
    let propertyNames = propties.map(x => x.name);
    const [keyword, setKeyword] = useState("none")
    const [clzData, setClzData] = useState([])
    useEffect(() => {

            getClass(pathname, 0, 10, keyword, propertyNames).then(({data}) => {
                setClzData(data)
            })
        }
        , [pathname,keyword]
    )
    let columns = [];
    columns.push( {
        title: 'Id',
        dataIndex: 'index',
        width: 48,
    },)

    propties.forEach((proptie: any) => {
        columns.push({
            title: proptie.name,
            dataIndex: proptie.name,
        })
    });

    let data = clzData.map((clz: any) => {
        let res = {};
        propertyNames.forEach((proptie: any) => {
            res[proptie] = clz[proptie];
        });
        res['index'] = clz['_additional']['id'];
        // set res['key'] a random value
        res['key'] = Math.random();
        return res;
    });
    return <div>
        <ProTable
            columns={columns}
            dataSource={data}
            request={async (
                // 第一个参数 params 查询表单和 params 参数的结合
                // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
                params: {
                    pageSize: number;
                    current: number;
                },
                sort,
                filter,
            ) => {

                let clzData = await getClass(pathname, (params.current - 1) * params.pageSize, params.pageSize, keyword, propertyNames);
                let data = clzData.data.map((clz: any) => {
                    let res = {};
                    propertyNames.forEach((proptie: any) => {
                        res[proptie] = clz[proptie];
                    });
                    res['index'] = clz['_additional']['id'];

                    // set res['key'] a random value
                    res['key'] = Math.random();
                    return res;
                });
                return {
                    data: data,
                    success: true,
                    total: clzData.count,
                };
            }}
            rowKey="key"
            dateFormatter="string"
            toolbar={{
                title: 'Class',
                tooltip: '',
                search: {
                    onSearch:async (value: string) => {
                        setKeyword(value)

                    },
                },
            }}
            search={false}
            toolBarRender={() => []}
        />
    </div>
}

