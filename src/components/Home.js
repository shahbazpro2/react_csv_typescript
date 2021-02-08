import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { useLocation, withRouter } from 'react-router-dom';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UnorderedListOutlined,
    FundViewOutlined,
    UploadOutlined,
    ScissorOutlined
} from '@ant-design/icons';
import ShowingCsv from './ShowingCsv';
import Summary from './Summary';
import ManualCutout from './ManualCutout';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions';

const { Header, Sider, Content } = Layout;
const Home = (props) => {
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const [collapsed, setCollapsed] = useState(false);
    const [active, setActive] = useState(null);
    const { pathname } = useLocation();
    useEffect(() => {
        /* if (pathname === '/clients') {
            setActive('1')
        } else */ 
        if (pathname === '/inventory-list') {
            setActive('1')
        } else if (pathname === '/summary') {
            setActive('2')
        }
        else if (pathname === '/cutout') {
            setActive('3')
        } else {
            props.history.push('/inventory-list')
        }
    }, [pathname])

    useEffect(() => {
        if(user.is_admin===false){
            props.history.push('/public')
        }
    }, [])
    const toggle = () => {
        setCollapsed(!collapsed)
    };
    const changeLink = (e) => {
        /* if (e.key === '1') {
            props.history.push('/clients')
        } else */ 
        if (e.key === '1') {
            props.history.push('/inventory-list')
        } else if (e.key === '2') {
            props.history.push('/summary')
        } else if (e.key === '3') {
            props.history.push('/cutout')
        } else if (e.key === '4') {
            dispatch(logoutUser())
            window.location.replace('/login')
        }
    }
    const showContent = () => {
        /* if (active === '1') {

            return <ListUsers user={user} />
        } else  */
        if (active === '1') {
console.log('here')
            return  <ShowingCsv />
                
                
            
        } else if (active === '2') {
            return <Summary />
        }
        else if (active === '3') {
            return <ManualCutout />
        }
    }
    return (
        <>
            {active !== null ?
                <Layout>
                    <Sider trigger={null} collapsible collapsed={collapsed}>
                        <div className="logo">
                            {!collapsed && <small className="text-white mb-0">{user.email}</small>}
                        </div>
                        <Menu theme="dark" mode="inline" onClick={changeLink} defaultSelectedKeys={active}>
                           {/*  <Menu.Item key="1" icon={<TeamOutlined />}>
                                Clients
            </Menu.Item> */}
                            <Menu.Item key="1" icon={<UnorderedListOutlined />}>
                                Inventory Lists
            </Menu.Item>
                            <Menu.Item key="2" icon={<FundViewOutlined />}>
                                View Summary
            </Menu.Item>
                            <Menu.Item key="3" icon={<ScissorOutlined />}>
                                Manual Cutout
            </Menu.Item>
                            <Menu.Item key="4" icon={<UploadOutlined />}>
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
                </Layout > : null }
        </>
    )
}

export default withRouter(Home)
