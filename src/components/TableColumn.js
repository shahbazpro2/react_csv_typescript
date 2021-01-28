import React from 'react'
import TableComp from './TableComp'
import { Input, Button, Space, Image } from 'antd'
import { withRouter } from 'react-router-dom'
import Highlighter from 'react-highlight-words';
import { SearchOutlined, EditOutlined } from '@ant-design/icons';
import { sendToEditor } from './../Actions/index';
import { connect } from 'react-redux'

class TableColumn extends React.Component {
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
            title: 'Orignal Image',
            dataIndex: 'Original',
            key: 'Original',
            render: img =>  <Image
            width={80}
            src={img}
        />
        },
        {
            title: 'Removed Image',
            dataIndex: 'BackgroundRemoved',
            key: 'BackgroundRemoved',
            render: img => <Image
            width={80}
            src={img}
        />
        },
        {
            title: 'Dealer ID',
            dataIndex: 'DealerID',
            key: 'DealerID',
            ...this.getColumnSearchProps('DealerID'),
            sorter: (a, b) => a.DealerID - b.DealerID,
            render: text => this.state.type === 'admin' ? <div style={{ cursor: 'pointer', color: 'blue' }} onClick={() => this.openSingle(text)}>{text}</div> : text
        },
        {
            title: 'Dealer Name',
            dataIndex: 'DealerName',
            key: 'DealerName',
            ...this.getColumnSearchProps('DealerName'),
            sorter: (a, b) => a.DealerName - b.DealerName
        },
        {
            title: 'VIN',
            dataIndex: 'VIN',
            key: 'VIN',
            ...this.getColumnSearchProps('VIN'),
            sorter: (a, b) => a.VIN - b.VIN
        },
        {
            title: 'Stock Number',
            dataIndex: 'StockNumber',
            key: 'StockNumber',
            ...this.getColumnSearchProps('StockNumber'),
            sorter: (a, b) => a.StockNumber - b.StockNumber
        },
        {
            title: 'Year',
            dataIndex: 'Year',
            key: 'Year',
            ...this.getColumnSearchProps('Year'),
            sorter: (a, b) => a.Year - b.Year
        },
        {
            title: 'Make',
            dataIndex: 'Make',
            key: 'Make',
        },
        {
            title: 'Model',
            dataIndex: 'Model',
            key: 'Model',
            ...this.getColumnSearchProps('Model'),
        },
        {
            title: 'Trim',
            dataIndex: 'Trim',
            key: 'Trim',
        },
        {
            title: 'Vehicle Type',
            dataIndex: 'VehicleType',
            key: 'VehicleType',
            ...this.getColumnSearchProps('VehicleType'),
        },
        {
            title: 'Certified',
            dataIndex: 'Certified',
            key: 'Certified',
        },
        {
            title: 'Vehicle Age',
            dataIndex: 'VehicleAge',
            key: 'VehicleAge',
            ...this.getColumnSearchProps('VehicleAge'),
            sorter: (a, b) => a.VehicleAge - b.VehicleAge
        },
        {
            title: 'Image Modified',
            dataIndex: 'ImageModified',
            key: 'ImageModified',
        },
        {
            title: 'Lot Location',
            dataIndex: 'LotLocation',
            key: 'LotLocation',
        },
        {
            title: 'Address',
            dataIndex: 'Address',
            key: 'Address',
        },
         {

            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: (a) => <div style={{ cursor: 'pointer' }} onClick={() => {
                this.setState({ isModalVisible: true, originalImage: a.Original, removedImage: a.BackgroundRemoved }); this.props.sendToEditor({ orignalImage: a.Original, removedImage: a.BackgroundRemoved, link: this.props.location.pathname }); this.props.history.push('/editor')
            }}>
                <EditOutlined />
            </div>
        } ,
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
        const { visible, source } = this.state;
        return (
            <div>

                {/* <Editor original={this.state.originalImage} removed={this.state.removedImage} /> */}
                <TableComp columns={this.columns} dataSource={this.props.dataSource} />
               
                   
                


            </div>
        )
    }
}

export default withRouter(connect(null, { sendToEditor })(TableColumn))
