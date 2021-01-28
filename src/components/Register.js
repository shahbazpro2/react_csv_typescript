import React, { useState } from 'react'
import { Form, Input, InputNumber, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Navbar from './Navbar';
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import { userPreferences } from '../configurations/urls';
import { getUserData } from './../configurations/urls';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../redux/actions';
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
const Register = (props) => {
    const [newfile, setNewfile] = useState('')
    const [oldfile, setOldFile] = useState('')
    const [success, setSuccess] = useState(null)
    const dispatch = useDispatch()
    const onFinish = (values) => {
        console.log(values.user);
        const formData = new FormData()
        for (var key in values.user) {
            var value = values.user[key];
            formData.append(key, value)
        }
        /* formData.append('hello','hy') */
        formData.append('new_background_image', newfile)
        formData.append('used_background_image', oldfile)
        formData.append('new_enhance_all', true)
        formData.append('used_enhance_all', true)
        console.log(formData)
        axios.post(userPreferences, formData)
            .then(res => {
                setSuccess(true)
                axios.get(getUserData)
                    .then(res=>{
                        dispatch(setCurrentUser(res.data))
                        localStorage.setItem('type', 'public')
                        props.history.push('/')
                    }).catch(err=>{
                        console.log(err)
                    })
               
            })
            .catch(err => console.log(err))
    };
    const customRequestFun = (options) => {
        const { onSuccess, file } = options;
        setNewfile(file)
        onSuccess(file)
    };
    const customRequestFun1 = (options) => {
        const { onSuccess, file } = options;
        setOldFile(file)
        onSuccess(file)
    };

    return (
        <>
            <Navbar />
            <div className="container py-2">
                <div className="row py-5 justify-content-center">
                    <div className="col-md-8">
                        <div className="box">
                            <Form name="nest-messages" layout="horizontal" onFinish={onFinish} validateMessages={validateMessages}>
                                <h5 className="mt-4">Exterior Background</h5>
                                <h6>New Vehicles</h6>
                                <Form.Item name={['user', 'new_num_images']} label="Num images to enchance per vehicle">
                                    <Input />
                                </Form.Item>
                                <Form.Item name={['user', 'new_only_enhance_min_num']} label="Only enhance if vehicle has a minimun of" >
                                    <InputNumber />
                                </Form.Item>
                                <Form.Item name={['user', 'new_enhance_all']} label="Enhance all existing inventory">
                                    <Input type="checkbox" />
                                </Form.Item>
                                <Form.Item name={['user', 'new_enhance_after']} label="Enhance inventory only after">
                                    <Input type="date" format={'YYYY-MM-DD'}  />
                                </Form.Item>
                                <Form.Item label="Upload background image">
                                    <Upload customRequest={customRequestFun}>
                                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                    </Upload>
                                </Form.Item>
                                <h6 className="pt-4">Used Vehicles</h6>
                                <Form.Item name={['user', 'used_num_images']} label="Num images to enchance per vehicle">
                                    <Input />
                                </Form.Item>
                                <Form.Item name={['user', 'used_only_enhance_min_num']} label="Only enhance if vehicle has a minimun of" >
                                    <InputNumber />
                                </Form.Item>
                                <Form.Item name={['user', 'used_enhance_all']} label="Enhance all existing inventory">
                                    <Input type="checkbox" />
                                </Form.Item>
                                <Form.Item name={['user', 'used_enhance_after']} label="Enhance inventory only after">
                                    <Input type="date" format={'YYYY-MM-DD'} />
                                </Form.Item>
                                <Form.Item label="Upload background image">
                                    <Upload customRequest={customRequestFun1}>
                                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                    </Upload>
                                </Form.Item>
                                <h6 className="pt-4">Notes/Comments:</h6>
                                <Form.Item name={['user', 'notes']} >
                                    <Input.TextArea />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Save Info
                                </Button>
                                </Form.Item>
                                {success && <p className="text-success">
                                    Information Successfully Submitted
                                    </p>}
                            </Form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(Register)