import {  Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import dayjs from 'dayjs'
import './order.css'
const Order = () => {
    const [order, setOrder] = useState([]);

    const columns = [
        {
            title: "Customer Id",
            dataIndex: "customerId",
            key: "customerId",
            filters: [
                {
                    text: 'Splir',
                    value: 'SPLIR',
                },
                {
                    text: 'Warth',
                    value: 'WARTH',
                },
                {
                    text: 'Lehms',
                    value: 'LEHMS',
                },
                {
                    text: 'Tradh',
                    value: 'TRADH',
                },
            ],
            onFilter: (value, record) => record.customerId.indexOf(value) === 0,

        },
        {
            title: "Freight",
            dataIndex: "freight",
            key: "freight",
            sorter: (a, b) => a.freight - b.freight,

        },
        {
            title: "City",
            dataIndex: "shipAddress",
            key: "city",
            render: (text, record) => <span>{record.shipAddress ? record.shipAddress.city : "-"}</span>
        },
        {
            title: "Country",
            dataIndex: "shipAddress",
            key: "country",
            render: (text, record) => <span>{record.shipAddress ? record.shipAddress.country : "-"}</span>
        },
        {
            title: "Order Date",
            dataIndex: "orderDate",
            key: "orderDate",
            sorter: (a, b) => new Date(a.orderDate) - new Date(b.orderDate),
            render: ((record) => dayjs(record).format('MMM D, YYYY'))
        },
        {
            title: "Required Date",
            dataIndex: "requiredDate",
            key: "requiredDate",
            render: ((record) => dayjs(record).format('MMM D, YYYY'))
        },
        {
            title: "Shipped Date",
            dataIndex: "shippedDate",
            key: "shippedDate",
            render: ((record) => dayjs(record).format('MMM D, YYYY'))
        },

    ];

    const loadData = () => {
        axios.get("https://northwind.vercel.app/api/orders").then((res) => {
            setOrder(res.data);
        });
    };
    useEffect(() => {
        loadData();
    }, []);


    const rowClassName = (record) => {
        if (new Date(record.shippedDate)>new Date(record.requiredDate)) {
            return "tomato"
        }
    };
    return (
        <div style={{padding:50,backgroundColor:"lightgray"}}>
            <Table
                dataSource={order}
                columns={columns}
                rowClassName={rowClassName}
                pagination={{
                    pageSize: 10,
                }}
            />
        </div>
    )
}

export default Order






