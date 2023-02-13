import './App.css';
import { useState, useEffect } from 'react'
import { Table, Space, Button } from 'antd'
import type { ColumnsType } from 'antd/es/table'


function App() {
  const deleteItem = async (id) => {
    console.log(id)

    const esto = await fetch(`http://localhost:5000/items/${id}`, {
      method: 'DELETE',
    }).then(response => response.json())
    console.log('esto', esto)
  }
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
        <Button onClick={() => deleteItem(record._id)}>
          {"Delete"}
        </Button>
      ),
    },
  ];
  const [items, setItems] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:5000/items')
      setItems(await response.json())
    }
    fetchData()
      .catch(console.error)
  }, []);
  return (
    <div className="App">
      <Table dataSource={items} columns={columns} />;
    </div>
  );
}

export default App;
