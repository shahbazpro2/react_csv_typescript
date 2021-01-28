import React, { useState, useEffect } from 'react'
import TableColumn from './TableColumn';
import { tbData } from './sample';
import axios from 'axios'
import ClientTableColumn from './ClientTableColumn';
import { useSelector, useDispatch } from 'react-redux';
import { allUsersData } from '../configurations/urls';
import { setAllUsers } from './../redux/actions/index';


const ListUsers = ({ id,user,single }) => {
    const allUsers = useSelector(state => state.user.allUsersData)
    const dispatch = useDispatch()
    const [data, setData] = useState(allUsers)
    useEffect(() => {
        console.log('user',user)
        if (user.is_admin === false||single===true) {
            setData(tbData)
        } else {
            axios.get(allUsersData)
                .then(res => {
                    dispatch(setAllUsers(res.data))
                    setData(res.data)
                }).catch(err => {
                    console.log(err)
                })
        }

    }, [])


    const dataSource = data.length > 0 && data.map((d, i) => (d))
    return (
        <>
            {id ? <TableColumn dataSource={dataSource.length > 0 && dataSource.filter(t => t.DealerID === id)} /> : <ClientTableColumn dataSource={dataSource} />}
        </>
    )
}



export default ListUsers
