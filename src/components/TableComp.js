import React from 'react'
import { Table } from 'antd'

const TableComp = ({ dataSource, columns }) => {
    return (
        <div>
            <Table dataSource={dataSource} columns={columns} scroll={{ x: 2300 }} />
        </div>
    )
}

export default TableComp
