import React, { useState, useEffect } from 'react'
import TableColumn from './TableColumn';
import { tbData } from './sample';
import axios from 'axios'
import ClientTableColumn from './ClientTableColumn';
import { useSelector, useDispatch } from 'react-redux';
import { allUsersData, singleProcessedData } from '../configurations/urls';
import { setAllUsers } from './../redux/actions/index';


const ListUsers = ({ id,user,single }) => {
    const allUsers = useSelector(state => state.user.allUsersData)
    const dispatch = useDispatch()
    const [data, setData] = useState(allUsers)
    useEffect(() => {
        
        if (user.is_admin === false||single===true) {
            axios.get(`${singleProcessedData}${user.dealer_id}`)
            .then(res => {
                console.log('data',res.data)
                setData(res.data)
            }).catch(err => {
                console.log(err)
            })
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

const dataSource=()=>{
    let arr=[]
    data.length > 0 && data.forEach((d, i) => {
        if(d.images){
            d.images.forEach(img=>{
                arr.push({...d,'images':'','processed_image':`http://3.138.211.235:8001/media/${img.processed_image}`,'original_image':`http://3.138.211.235:8001/media/${img.original_image}`})
            })
        }else{
            arr.push(d)
        }
    })
    return arr
}
     
    return (
        <>
            <TableColumn dataSource={dataSource()} />
        </>
    )
}



export default ListUsers
