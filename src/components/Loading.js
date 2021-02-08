import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendToEditor } from './../Actions/index';

const Loading = (props) => {
    const [orgImage,setOrgImage]=useState(null)
    const [remImage,setRemImage]=useState(null)
    const editor = useSelector(state => state.editor)
    const dispatch=useDispatch()
    useEffect(()=>{
        if (editor.editor.orignalImage !== '' && editor.editor.orignalImage !== null){
            
            imageToBase64(editor.editor.orignalImage,'orignal')
            imageToBase64(editor.editor.removedImage,'removed')
            
            }
    },[])
    useEffect(()=>{
        console.log(orgImage,remImage)
        if(orgImage!==null && remImage!==null){
            /* dispatch(sendToEditor({...editor.editor, orignalImage: orgImage, removedImage: remImage})) */
            props.history.push('/editor')
        }
    },[orgImage,remImage])
    
    return (
       
    )
}

export default Loading
