import React, { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const AllOrder = () => {
    const [allOrder, setAllOrder] = useState([]);
    const options = [
        { value: 'Pending', label: 'Pending' },
        { value: 'In Progress', label: 'In Progress' },
        { value: 'Shipped', label: 'Shipped' },
    ];

    useEffect(() => {
        fetch('https://creative-agency-spa.herokuapp.com/orders')
            .then(res => res.json())
            .then(data => {
                sessionStorage.setItem('allOrder', JSON.stringify(data));
                setAllOrder(JSON.parse(sessionStorage.getItem('allOrder')));

            })
    }, [])

    const removeItem = key => {
        console.log(key, typeof(key))
        const savedOrder = JSON.parse(sessionStorage.getItem('allOrder'));
        const updateStore = savedOrder.filter(order => order.key !== key);
        sessionStorage.setItem('allOrder', JSON.stringify(updateStore));
        setAllOrder(updateStore);
    }

    const handleStatusChange = (e,txId) => {
        console.log(e.value)
        fetch(`https://tonus-creation.herokuapp.com/allOrder`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: e.value })
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    alert('Status has updated successfully!')
                }
            })
    }

    return (
        <div className="table-container table-responsive  mt-3 mb-5 mr-4 p-3">
            <table className="table">
                <thead id='thead' className="bg-light">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email ID</th>
                        <th scope="col">Product</th>
                        <th scope="col">Transaction ID</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !allOrder?.length &&
                        <div className="d-flex align-items-center">
                            <strong>Loading...</strong>
                            <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                        </div>
                    }
                    {
                        allOrder?.map(user =>
                            <tr>
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td>{user?.product?.name}</td>
                                <td>{user?.txId}</td>
                                <td >
                                    <Dropdown options={options} onChange={(e) => { handleStatusChange(e,`${user.txId}`) }} value={{value: user?.status, label: user?.status}} placeholder="Select an option" />
                                </td>
                                <td>
                                    <button onClick={() => removeItem(user?.product?.key)} className="btn btn-sm btn-danger d-block mx-auto">Remove</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllOrder;