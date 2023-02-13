import './App.css';
import { useState, useEffect } from 'react'
import { Table, Modal, Button } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import FormItem from './FormItem';


function App() {
  const deleteItem = async (id) => {
    setIsLoading(true)
    const esto = await fetch(`http://localhost:5000/items/${id}`, {
      method: 'DELETE',
    }).then(response => response.json())
    await fetchData()
    setIsLoading(false)
  }

  const showModal = async (id) => {
    const esto = await fetch(`http://localhost:5000/items/${id}`, {
      method: 'GET',
    }).then(response => response.json())
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
          <Button onClick={() => deleteItem(record._id)}>
            {"Delete"}
          </Button>
          <Button onClick={() => showModal(record._id)}>
            {"More info"}
          </Button>
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
  }, []);
  return (
    <div className="App">
      {isLoading ? 'loading' : <Table dataSource={items} columns={columns} />}

      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>{item.name}</p>
      </Modal>
      <FormItem fetchData={fetchData}></FormItem>
    </div>
  );
}

export default App;
