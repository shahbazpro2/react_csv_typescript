import React, { useState, useEffect, useRef } from 'react'
import { Form, Input, InputNumber, Button, Upload, message, Checkbox, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import { userPreferences } from '../configurations/urls';
import { getAdminUserPreferences } from './../configurations/urls';
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
const Settings = ({ active, id }) => {
    const user = useSelector(state => state.user.user)
    const [preview,setPreview]=useState({newfile:'',oldfile:''})
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    const [form] = Form.useForm();
    useEffect(() => {
        if (id) {
            axios.get(`${getAdminUserPreferences}${id}`)
                .then(res => {
                    let data = { ...res.data, ...res.data.user_preferences }
                    console.log('d', data)
                    data.new_enhance_all = true
                    data.used_enhance_all = true
                    form.setFieldsValue({ user: data })
                    setPreview({newfile:data.new_background_image,oldfile:data.used_background_image})
                })
                .catch(err => console.log(err))
        } else {
            axios.get(userPreferences)
                .then(res => {
                    let data = { ...user, ...res.data }
                    console.log('d', data)
                    data.new_enhance_all = true
                    data.used_enhance_all = true
                    form.setFieldsValue({ user: data })
                    setPreview({newfile:data.new_background_image,oldfile:data.used_background_image})
                })
                .catch(err => console.log(err))
        }

    }, [active, id])

    const onFinish = (values) => {
        console.log(values.user);
        setError(null)
        const formData = new FormData()
        for (var key in values.user) {
            var value = values.user[key];
            formData.append(key, value)
        }
        /* formData.append('hello','hy') */
        formData.append('new_background_image', preview.newfile)
        formData.append('used_background_image', preview.oldfile)
        console.log(formData)
        axios.put(userPreferences, formData)
            .then(res => {
                setSuccess(true)
                setTimeout(() => {
                    setSuccess(null)
                }, 2000)

            })
            .catch(err => {
                console.log(err)
                setError(true)
            })
    };
    const customRequestFun = (options) => {
        const { onSuccess, file } = options;
        let reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = function() {
    setPreview({...preview,newfile:reader.result})
  };
        onSuccess(file)
    };
    const customRequestFun1 = (options) => {
        const { onSuccess, file } = options;
        let reader = new FileReader();

        reader.readAsDataURL(file);
      
        reader.onload = function() {
          setPreview({...preview,oldfile:reader.result})
        };
        onSuccess(file)
    };
    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="box">
                            <Form name="nest-messages" form={form} layout="horizontal" onFinish={onFinish} validateMessages={validateMessages}>
                                <h5>Dealer Information</h5>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Item name={['user', 'dealer_name']} label="Dealer Name">
                                            <Input disabled />
                                        </Form.Item>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Item name={['user', 'address']} label="Address">
                                            <Input disabled />
                                        </Form.Item>
                                    </div>


                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
                                            <Input disabled />
                                        </Form.Item>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Item name={['user', 'city']} label="City">
                                            <Input disabled />
                                        </Form.Item>
                                    </div>


                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Item name={['user', 'phone']} label="Phone">
                                            <Input disabled />
                                        </Form.Item>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Item name={['user', 'state']} label="State">
                                            <Input disabled />
                                        </Form.Item>
                                    </div>


                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Item name={['user', 'website']} label="Website">
                                            <Input disabled />
                                        </Form.Item>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Item name={['user', 'zip_code']} label="Zip">
                                            <Input disabled />
                                        </Form.Item>
                                    </div>


                                </div>
                                <h5 className="mt-4">Exterior Background</h5>
                                <h6>New Vehicles</h6>
                                <Form.Item name={['user', 'new_num_images']} label="Num images to enchance per vehicle">
                                    <Input />
                                </Form.Item>
                                <Form.Item name={['user', 'new_only_enhance_min_num']} label="Only enhance if vehicle has a minimun of" >
                                    <InputNumber />
                                </Form.Item>
                             {/* <Form.Item name={['user', 'new_enhance_all']} valuePropName="checked" label="Enhance all existing inventory">
                                    <Checkbox></Checkbox>
                                </Form.Item> */}
                                {/* <Form.Item name={['user', 'new_enhance_after']} label="Enhance inventory only after">
                                    <Input type="date" format={'YYYY-MM-DD'} />
                                </Form.Item> */}
                                <Form.Item label="Upload background image">
                                    <div className="d-flex">
                                    <Upload customRequest={customRequestFun}>
                                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                    </Upload>
                                    <div className="ml-3">
                                    <Image
                                        width={80}
                                        src={preview.newfile}
                                    />
                                    </div>
                                    
                                    </div>
                                    
                                </Form.Item>
                                <h6 className="pt-4">Used Vehicles</h6>
                                <Form.Item name={['user', 'used_num_images']} label="Num images to enchance per vehicle">
                                    <Input />
                                </Form.Item>
                                <Form.Item name={['user', 'used_only_enhance_min_num']} label="Only enhance if vehicle has a minimun of" >
                                    <InputNumber />
                                </Form.Item>
                                {/* <Form.Item name={['user', 'used_enhance_all']} valuePropName="checked" label="Enhance all existing inventory">
                                    <Input type="checkbox" />
                                </Form.Item> */}
                                {/* <Form.Item name={['user', 'used_enhance_after']} label="Enhance inventory only after">
                                    <Input type="date" format={'YYYY-MM-DD'} />
                                </Form.Item> */}
                                <Form.Item label="Upload background image">
                                    <div className="d-flex">
                                    <Upload customRequest={customRequestFun1}>
                                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                    </Upload>
                                    <div className="ml-3">
                                    <Image
                                        width={80}
                                        src={preview.oldfile}
                                    />
                                    </div>
                                    </div>
                                   
                                    
                                </Form.Item>
                                <h6 className="pt-4">Notes/Comments:</h6>
                                <Form.Item name={['user', 'notes']} >
                                    <Input.TextArea />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Update Info
                                </Button>
                                </Form.Item>
                                {success ? <h6 className="text-success">Information is updated</h6> : null}
                                {error ? <h6 className="text-danger">There is something wrong</h6> : null}
                            </Form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Settings
