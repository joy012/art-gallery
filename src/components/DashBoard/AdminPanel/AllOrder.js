/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import '../DashBoard.css';

const AllOrder = () => {
    const [allOrder, setAllOrder] = useState([]);
    const options = [
        { value: 'PENDING', label: 'PENDING' },
        { value: 'APPROVED', label: 'APPROVE' },
        { value: 'CANCELED', label: 'CANCELED' },
        { value: 'ON GOING', label: 'ON GOING' },
        { value: 'SHIPPED', label: 'SHIPPED' },
        { value: 'DONE', label: 'DONE' },
    ];

    useEffect(() => {
        fetch('https://tonuscreation.herokuapp.com/allOrder')
            .then((res) => res.json())
            .then((data) => {
                setAllOrder(data);
            });

        return () => {
            setAllOrder([]);
        };
    }, []);

    const removeItem = (id) => {
        fetch(`https://tonuscreation.herokuapp.com/deleteOrder?id=${id}`, {
            method: 'DELETE',
        }).then((result) => {
            alert('Order has been removed successfully!');
        });
        const updatedList = allOrder.filter((product) => product._id !== id);
        setAllOrder(updatedList);
    };

    const handleStatusChange = (e, id) => {
        fetch(`https://tonuscreation.herokuapp.com/updateOrder?id=${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: e.value }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    alert('Status has updated successfully!');
                }
            });
    };

    return (
        <>
            {!allOrder?.length ? (
                <h2 className="text-center text-danger">You Don't have any order yet</h2>
            ) : (
                <div className="full-height table-container table-responsive  mt-3 mb-5 mr-4 p-3">
                    <table className="table">
                        <thead id="thead" className="bg-light">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email ID</th>
                                <th scope="col">No of Product</th>
                                <th scope="col">TX ID</th>
                                <th scope="col">Status</th>
                                <th scope="col">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allOrder?.map((user) => (
                                <tr key={user._id}>
                                    <td>{user?.name}</td>
                                    <td>{user?.email}</td>
                                    <td>{user?.cart.length}</td>
                                    <td>{`${user.txId !== ' ' ? user.txId : 'Cash On'}`}</td>
                                    <td>
                                        <Dropdown
                                            placeholderClassName="Select Status"
                                            options={options}
                                            onChange={(e) => {
                                                handleStatusChange(e, `${user._id}`);
                                            }}
                                            value={{ value: user?.status, label: user?.status }}
                                            placeholder="Select an option"
                                        />
                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            onClick={() => removeItem(`${user._id}`)}
                                            className="btn btn-sm btn-danger d-block mx-auto"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default AllOrder;
