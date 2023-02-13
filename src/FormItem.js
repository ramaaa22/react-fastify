import { Button, Form, Input, InputNumber } from 'antd';
import { useEffect, useState } from 'react';


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
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


function FormItem({ fetchData, data }) {
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue(data)
    }, [form, data])
    const onFinish = async (values) => {
        let method = 'POST'
        let url = 'http://localhost:5000/items'
        const { item } = values

        if (data) {
            method = 'PUT'
            url = url + `/${data._id}`
        }
        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)

        }).then(response => response.json())
        fetchData()

    };
    return (<div>
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
                name={['item', 'name']}
                label="Name"
                rules={[
                    {
                        required: true,
                    },
                ]}
                initialValue={data ? data.name : ""}

            >
                <Input />
            </Form.Item>
            <Form.Item
                name={['item', 'price']}
                label="Price"
                rules={[
                    {
                        required: true
                    },
                ]}
                initialValue={data ? data.price : ""}

            >
                <InputNumber />
            </Form.Item>



            <Form.Item
                wrapperCol={{
                    ...layout.wrapperCol,
                    offset: 8,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </div>
    );
}
export default FormItem;