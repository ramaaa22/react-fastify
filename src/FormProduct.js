import { Button, Form, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import './App.css';


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const handleChange = (value) => {
    console.log(`selected ${value}`);
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
/* eslint-enable no-template-curly-in-string */


function FormProduct({ fetchData, data }) {
    const [form] = Form.useForm()
    const [items, setItems] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        form.setFieldsValue(data)
    }, [form, data])

    useEffect(() => {
        getItems()
    }, [])

    const getItems = async () => {
        try {
            const response = await fetch(`http://localhost:5000/items`, {
                method: 'GET'
            })
            const items = await response.json()
            const fields = []
            items.map(it => fields.push({ value: it._id, label: it.name }))
            setItems(fields)
        } catch (error) {
            throw new Error(error)
        }
    }

    const onFinish = async (values) => {
        let method = 'POST'
        let url = 'http://localhost:5000/products'
        const { product } = values
        console.log('product', product)

        if (data) {
            method = 'PUT'
            url = url + `/${data._id}`
        }
        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product)

            })
            console.log(response)
            if (!response.ok) {
                setError(response.statusText)
            }
        } catch (error) {
            console.error(error)
        }
    };
    return (<div className='FormItem'>
        <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            initialValues={data}
            style={{
                maxWidth: 600,
            }}
            validateMessages={validateMessages}
        >
            <Form.Item
                name={['product', 'name']}
                label="Name"
                rules={[
                    {
                        required: true,
                    },
                ]}
                initialValue={data ? data.name : ""}

            >
                <Input className='FormItemInput' />
            </Form.Item>

            <Form.Item
                name={['product', 'item']}
                label="Item"
                rules={[
                    {
                        required: true,
                    },
                ]}
                initialValue={data ? data.name : ""}
            >
                <Select
                    style={{
                        width: 120,
                    }}
                    placeholder="Select Item"
                    onChange={handleChange}
                    options={items}
                />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    ...layout.wrapperCol,
                    offset: 8,
                }}
            >
                <Button type="primary" htmlType="submit" className='FormItemButton'>
                    Submit
                </Button>
            </Form.Item>
        </Form>
        <p>{error ? error : 'jaja'}</p>
    </div>
    );
}
export default FormProduct;