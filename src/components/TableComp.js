import React from 'react'
import { Table } from 'antd'

const TableComp = ({ dataSource, columns,loading }) => {
    return (
        <div>
            <Table dataSource={dataSource} columns={columns} scroll={{ x: 2300 }} loading={loading} />
        </div>
    )
}

export default TableComp
