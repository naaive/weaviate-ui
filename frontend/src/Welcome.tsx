import React, {useEffect, useState} from "react";
import {getSchema} from "./api";
import {ProColumns, ProTable} from "@ant-design/pro-components";
import ReactJson from 'react-json-view'

export default function () {
    const [schemas, setSchemas] = useState([])
    useEffect(() => {
            getSchema().then((schemas) => {


                    setSchemas(schemas.classes)
                }
            )
        }
        , [])
    // transform from foreach to map of below
    const tableListDataSource = schemas.map((schema: any) => ({
        className: schema.class,
        description: schema.description,
        vectorIndexType: schema.vectorIndexType,
        vectorizer: schema.vectorizer,
        key: schema.class,
        detail: schema
    }));
    const columns: ProColumns<any>[] = [
        {
            title: 'Class',
            dataIndex: 'className',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'VectorIndexType',
            dataIndex: 'vectorIndexType',
        },
        {
            title: 'Vectorizer',
            dataIndex: 'vectorizer',
        },
        {
            title: 'Detail',
            dataIndex: 'detail',
            render: (_, record) => {
                return <ReactJson src={record.detail} collapsed={0} enableClipboard={false} displayDataTypes={false}/>
            }
        }

    ];

    return <div>
        <ProTable
            columns={columns}
            dataSource={tableListDataSource}

            rowKey="key"
            pagination={{
                showQuickJumper: true,
            }}
            search={false}
            dateFormatter="string"
            toolbar={{
                title: 'Schema',
                tooltip: 'All classes in the schema',
            }}
            toolBarRender={() => []}
        />
    </div>
}