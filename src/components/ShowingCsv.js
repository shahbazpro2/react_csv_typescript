import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TableColumn from './TableColumn';
import { getUserData } from './../configurations/urls';

const ShowingCsv = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get(getUserData)
            .then(res => {
                console.log('data',res.data)
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
