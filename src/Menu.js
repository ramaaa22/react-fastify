import { Menu as MenuAnt } from 'antd';
import { useState } from 'react';
import './App.css';
const items = [
    {
        label: (
            <a href={'items/list'} rel="noopener noreferrer">
                View Items
            </a>
        ),
        key: 'alipay',
    },
    {
        label: (
            <a href={`items/create`} rel="noopener noreferrer">
                Create Item
            </a>
        ),
        key: 'alipay',
    },
    {
        label: (
            <a href={`products/create`} rel="noopener noreferrer">
                Create Product
            </a>
        ),
        key: 'alipay',
    },
    {
        label: (
            <a href={`products/list`} rel="noopener noreferrer">
                List Products
            </a>
        ),
        key: 'alipay',
    },
];
const Menu = () => {
    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return <MenuAnt onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default Menu;