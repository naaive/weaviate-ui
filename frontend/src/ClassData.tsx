import React, {useEffect, useRef, useState} from "react";
import {getClass} from "./api.ts";
import {ActionType, ProTable} from "@ant-design/pro-components";

export default function ({pathname, propties}: any) {
    let propertyNames = propties.map(x => x.name);
    const [keyword, setKeyword] = useState("none")
    const [clzData, setClzData] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(() => {

            getClass(pathname, 0, 20, keyword, propertyNames).then(({data, count}) => {
                setClzData(data)
                setTotal(count)
            })
        }
        , [pathname, keyword]
    )
    let columns = [];
    columns.push({
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
    const ref = useRef<ActionType>();
    return <div>
        <ProTable
            actionRef={ref}
            params={{pathname:pathname}}
            columns={columns}
            // dataSource={data}
            request={async (
                // 第一个参数 params 查询表单和 params 参数的结合
                // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
                params: any,
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
                console.log(clzData)
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
                    onSearch: async (value: string) => {
                        setKeyword(value)
                        ref.current?.reload()

                    },
                },
            }}
            search={false}
            toolBarRender={() => []}
        />
    </div>
}

