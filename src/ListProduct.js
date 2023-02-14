import './App.css';
import { useState, useEffect } from 'react'
import { Table, Modal, Button, Space } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import FormItem from './FormItem';


function ListProduct() {
    const deleteProduct = async (id) => {
        setIsLoading(true)
        try {
            const response = await fetch(`http://localhost:5000/products/${id}`, {
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
        const product = await fetch(`http://localhost:5000/products/${id}`, {
            method: 'GET',
        }).then(response => response.json())
        setProduct(product)
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
            title: 'Item',
            dataIndex: 'itemName',
            key: 'itemName',
        },
        {
            title: 'Actions',
            key: 'action',
            render: (_, record) => (
                <div>
                    <Space>
                        <Button onClick={() => deleteProduct(record._id)}>
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

    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    async function fetchData() {
        const response = await fetch('http://localhost:5000/products')
        const prods = await response.json()
        prods.map(pr => pr.itemName = pr.item.name)
        setProducts(prods)
    }

    useEffect(() => {
        fetchData()
            .catch(console.error)
    }, [])

    return (
        <div className="Menu">
            {isLoading ? 'loading' : <Table dataSource={products} columns={columns} />}

            <Modal title="Modify" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <FormItem data={product} fetchData={fetchData}></FormItem>
            </Modal>
        </div>
    );
}

export default ListProduct;
