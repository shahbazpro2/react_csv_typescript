import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TableColumn from './TableColumn';
import { allProcessedData } from './../configurations/urls';
import { useSelector, useDispatch } from 'react-redux';
import { setAllProcessedCsv } from '../redux/actions';

const ShowingCsv = () => {
    const user=useSelector(state=>state.user)
    const dispatch=useDispatch()
    const [data, setData] = useState(user.allProcessedCsv)
    const [loading,setLoading]=useState(true)
    useEffect(() => {
if(user.allProcessedCsv.length>0){
    setLoading(false)
}
        axios.get(allProcessedData)
            .then(res => {
                console.log('data',res.data)
                setData(res.data)
                dispatch(setAllProcessedCsv(res.data))
                setLoading(false)

            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }, [])


    const dataSource=()=>{
    let arr=[]
    data.length > 0 && data.forEach((d, i) => {
        if(d.images){
            d.images.forEach(img=>{
                arr.push({...d,'images':'','editted_image':`http://3.138.211.235:8001/media/${img.editted_image}`,'original_image':`http://3.138.211.235:8001/media/${img.original_image}`,'processed_image':`http://3.138.211.235:8001/media/${img.processed_image}`})
            })
        }else{
            arr.push(d)
        }
    })
    return arr
}
    return (
       <TableColumn dataSource={dataSource()} user={user} loading={loading} />
    )
}

export default ShowingCsv
