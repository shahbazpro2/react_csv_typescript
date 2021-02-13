import React from 'react'
import { Table } from 'antd'

const TableComp = ({ dataSource, columns,loading,scrollBar=true }) => {
    
    return (
        <div>
            {scrollBar ?
            <Table dataSource={dataSource} columns={columns} scroll={{ x: 2300 }} loading={loading} />:
            <Table dataSource={dataSource} columns={columns} loading={loading} />}
        </div>
    )
}

export default TableComp
