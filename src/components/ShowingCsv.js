import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TableColumn from './TableColumn';

const ShowingCsv = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('http://3.138.211.235:8000/bgremove/result/')
            .then(res => {

                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    const dataSource = data.length > 0 && data.map((d, i) => (d))
    return (
       <TableColumn dataSource={dataSource} />
    )
}

export default ShowingCsv
