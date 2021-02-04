import { useState, useEffect } from 'react'
import TableColumn from './TableColumn';
import axios from 'axios'
import { singleProcessedData } from '../configurations/urls';


const ListUsers = ({ user,id }) => {
    const [data, setData] = useState([])
    useEffect(() => {
        console.log(id)
        if (user.is_admin === false) {
            axios.get(`${singleProcessedData}${user.dealer_id}`)
            .then(res => {
                console.log('data',res.data)
                setData(res.data)
            }).catch(err => {
                console.log(err)
            })
        } else {
            console.log(id)
            axios.get(`${singleProcessedData}${id}`)
                .then(res => {
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
                arr.push({...d,'images':'','editted_image':`http://3.138.211.235:8001/media/${img.editted_image}`,'original_image':`http://3.138.211.235:8001/media/${img.original_image}`,'processed_image':`http://3.138.211.235:8001/media/${img.processed_image}`})
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
