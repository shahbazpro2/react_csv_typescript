import React from 'react'
import TableComp from './TableComp'
import { Input, Button, Space, Image } from 'antd'
import { withRouter } from 'react-router-dom'
import Highlighter from 'react-highlight-words';
import { SearchOutlined, EditOutlined } from '@ant-design/icons';

class ClientTableColumn extends React.Component {
    state = {
        searchText: '',
        searchedColumn: '',
        type: localStorage.getItem('type'),
        isModalVisible: false,
        visible: false,
        index: 0,
        source: ''
    };

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
              </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
              </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                    text
                ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };
    openSingle = (val) => {
        this.props.history.push(`/client/${val}`)
    }
    columns = [
        
        {
            title: 'Dealer ID',
            dataIndex: 'dealer_id',
            key: 'DealerID',
            ...this.getColumnSearchProps('DealerID'),
            sorter: (a, b) => a.DealerID - b.DealerID,
            render: text => <div style={{ cursor: 'pointer', color: 'blue' }} onClick={() => this.openSingle("8970")}>{text}</div> 
        },
        {
            title: 'Dealer Name',
            dataIndex: 'dealer_name',
            key: 'DealerName',
            ...this.getColumnSearchProps('DealerName'),
            sorter: (a, b) => a.DealerName - b.DealerName
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            ...this.getColumnSearchProps('address'),
            sorter: (a, b) => a.address - b.address
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ...this.getColumnSearchProps('email'),
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            ...this.getColumnSearchProps('phone'),
        },
        {
            title: 'State',
            dataIndex: 'state',
            key: 'state',
            ...this.getColumnSearchProps('state'),
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
            ...this.getColumnSearchProps('city'),
        },
        {
            title: 'Zip Code',
            dataIndex: 'zip_code',
            key: 'zip_code',
            ...this.getColumnSearchProps('zip_code'),
        },
        {
            title: 'Website',
            dataIndex: 'website',
            key: 'website',
            ...this.getColumnSearchProps('website'),
        }
    ];
    handleCancel = () => {
        this.setState({ isModalVisible: true })
    };
    showModal = () => {
        this.setState({ isModalVisible: true })
    };
    handleTriggle = () => {
        console.log('c')
        this.setState(prevState => ({ visible: !prevState.visible }))}
    render() {
        return (
            <div>

                {/* <Editor original={this.state.originalImage} removed={this.state.removedImage} /> */}
                <TableComp columns={this.columns} dataSource={this.props.dataSource} />
               
                   
                


            </div>
        )
    }
}

export default withRouter(ClientTableColumn)
