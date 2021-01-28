import React, { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd';
import {withRouter,useParams} from 'react-router-dom'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    UploadOutlined,
    RollbackOutlined
} from '@ant-design/icons'
import ListUsers from './ListUsers';
import { useSelector } from 'react-redux';

const { Header, Sider, Content } = Layout;
const SingleUser = ({history}) => {
    const user =useSelector(state=>state.user.user)
    const [collapsed, setCollapsed] = useState(false);
    const [active, setActive] = useState('2');
    const [email, setEmail] = useState('');
    let {id}=useParams()
    useEffect(() => {
       setEmail(user.email)
    }, [])
    const toggle = () => {
        setCollapsed(!collapsed)
    };
    const changeLink = (e) => {
        setActive(e.key)
    }
    const showContent = () => {
        if (active === '1') {
            history.push('/')
        } else if (active === '2') {
            return <ListUsers id={id} user={user} single={true} />
        } 
        else if (active === '3') {
            localStorage.removeItem('email');
            window.location.replace('/login')
        }
    }
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                    {!collapsed && <small className="text-white mb-0">{email}</small>}
                </div>
                <Menu theme="dark" mode="inline" onClick={changeLink} defaultSelectedKeys={['2']}>
                    <Menu.Item key="1" icon={<RollbackOutlined />}>
                        Back
            </Menu.Item>
                    <Menu.Item key="2" icon={<UserOutlined />}>
                        Client
            </Menu.Item>
                    <Menu.Item key="3" icon={<UploadOutlined />}>
                        Logout
            </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: toggle,
                    })}
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: '100vh',

                    }}
                >
                    {showContent()}


                </Content>
            </Layout>
        </Layout >
    )
}

export default withRouter(SingleUser)
