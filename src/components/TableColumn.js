import React from 'react'
import TableComp from './TableComp'
import { Input, Button, Space, Image } from 'antd'
import { withRouter } from 'react-router-dom'
import Highlighter from 'react-highlight-words';
import { SearchOutlined, EditOutlined } from '@ant-design/icons';
import { sendToEditor } from './../Actions/index';
import { connect } from 'react-redux'
import { Spin } from 'antd';
import axios from 'axios'
class TableColumn extends React.Component {
    state = {
        searchText: '',
        searchedColumn: '',
        isModalVisible: false,
        visible: false,
        index: 0,
        source: '',
        orgImage: '',
        remImage: '',
        loading: false

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
            dataIndex: 'original_image',
            key: 'original_image',
            render: img => <Image
                width={80}
                src={img}
            />
        },
        {
            title: 'Removed Image',
            dataIndex: 'editted_image',
            key: 'editted_image',
            render: img => <Image
                width={80}
                src={img}
            />
        },
        {
            title: 'Dealer ID',
            dataIndex: 'owner',
            key: 'owner',
            ...this.getColumnSearchProps('owner'),

            render: text => this.props.user && this.props.user.user.is_admin ? <div style={{ cursor: 'pointer', color: 'blue' }} onClick={() => this.openSingle(text)}>{text}</div> : text
        },
        {
            title: 'Dealer Name',
            dataIndex: 'dealer_name',
            key: 'dealer_name',
            ...this.getColumnSearchProps('dealer_name'),
            sorter: (a, b) => a.DealerName - b.DealerName
        },
        {
            title: 'VIN',
            dataIndex: 'vin',
            key: 'vin',
            ...this.getColumnSearchProps('vin'),
            sorter: (a, b) => a.VIN - b.VIN
        },
        {
            title: 'Stock Number',
            dataIndex: 'stock_number',
            key: 'stock_number',
            ...this.getColumnSearchProps('stock_number'),
            sorter: (a, b) => a.stock_number - b.stock_number
        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
            ...this.getColumnSearchProps('year'),
            sorter: (a, b) => a.year - b.year
        },
        {
            title: 'Make',
            dataIndex: 'make',
            key: 'make',
        },
        {
            title: 'Model',
            dataIndex: 'model',
            key: 'model',
            ...this.getColumnSearchProps('model'),
        },
        {
            title: 'Trim',
            dataIndex: 'trim',
            key: 'trim',
        },
        {
            title: 'Vehicle Type',
            dataIndex: 'vehicle_type',
            key: 'vehicle_type',
            ...this.getColumnSearchProps('vehicle_type'),
        },
        {
            title: 'Certified',
            dataIndex: 'certified',
            key: 'certified',
            render: (a) => <div > {a === true ? 'true' : 'false'} </div>
        },
        {
            title: 'Vehicle Age',
            dataIndex: 'vehicle_age',
            key: 'vehicle_age',
            ...this.getColumnSearchProps('vehicle_age'),
            sorter: (a, b) => a.vehicle_age - b.vehicle_age
        },
        {
            title: 'Image Modified',
            dataIndex: 'image_modified',
            key: 'image_modified',
        },
        {
            title: 'Lot Location',
            dataIndex: 'lot_location',
            key: 'lot_location',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {

            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: (a) => <div style={{ cursor: 'pointer' }} onClick={() => {
                console.log('a', a)
                this.setState({ isModalVisible: true, originalImage: a.original_image, removedImage: a.processed_image, loading: true });
                this.openEditor(a)

            }}>
                <EditOutlined />
            </div>
        },
    ];
    handleCancel = () => {
        this.setState({ isModalVisible: true })
    };
    showModal = () => {
        this.setState({ isModalVisible: true })
    };
    handleTriggle = () => {
        console.log('c')
        this.setState(prevState => ({ visible: !prevState.visible }))
    }
    openEditor = async (a) => {
        let image = await axios.get(`${a.original_image}`, { responseType: 'arraybuffer' });
        let orignal = Buffer.from(image.data).toString('base64');
        image = await axios.get(`${a.processed_image}`, { responseType: 'arraybuffer' })
        let processed = Buffer.from(image.data).toString('base64')

        this.props.sendToEditor({ orignalImage: `data:image/png;base64,${orignal}`, removedImage: `data:image/png;base64,${processed}`, link: this.props.location.pathname, imgName: a.processed_image.split("/")[8], dealerId: a.owner }); this.props.history.push('/editor')


    }

    render() {
        return (
            <div>
                {this.state.loading ? <div className="container">
                    <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
                        <Spin />
                        <h3 className="ml-3">Opening Editor please wait...</h3>
                    </div>

                </div> :
                    <TableComp columns={this.columns} dataSource={this.props.dataSource} loading={this.props.loading} />
                }
            </div>
        )
    }
}

export default withRouter(connect(null, { sendToEditor })(TableColumn))
