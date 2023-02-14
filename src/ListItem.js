import './App.css';
import { useState, useEffect } from 'react'
import { Table, Modal, Button, Space } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import FormItem from './FormItem';


function ListItem() {
    const deleteItem = async (id) => {
        setIsLoading(true)
        try {
            const response = await fetch(`http://localhost:5000/items/${id}`, {
                method: 'DELETE'
            })
            await response.json()
            fetchData()
        } catch (error) {
            throw new Error(error)
        }
        setIsLoading(false)
    }

    const showModal = async (id) => {
        console.log('show', id)
        const esto = await fetch(`http://localhost:5000/items/${id}`, {
            method: 'GET',
        }).then(response => response.json())
        console.log(esto)
        setItem(esto)
        setIsModalOpen(true);

    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columns: ColumnsType<DataType> = [
        {
            title: 'Id',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Actions',
            key: 'action',
            render: (_, record) => (
                <div>
                    <Space>
                        <Button onClick={() => deleteItem(record._id)}>
                            {"Delete"}
                        </Button>
                        <Button onClick={() => showModal(record._id)}>
                            {"Modify"}
                        </Button>
                    </Space>
                </div>
            ),
        },
    ]

    const [items, setItems] = useState([]);
    const [item, setItem] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    async function fetchData() {
        const response = await fetch('http://localhost:5000/items')
        setItems(await response.json())
    }

    useEffect(() => {
        fetchData()
            .catch(console.error)
    }, [])

    return (
        <div className="Menu">
            {isLoading ? 'loading' : <Table dataSource={items} columns={columns} />}

            <Modal title="Modify" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <FormItem data={item} fetchData={fetchData}></FormItem>
            </Modal>
        </div>
    );
}

export default ListItem;
