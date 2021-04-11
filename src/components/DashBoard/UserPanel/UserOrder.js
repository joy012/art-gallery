import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';
import './UserOrder.css';


const UserOrder = () => {
    const [myOrder, setMyOrder] = useState([]);
    const [serverError, setServerError] = useState('')
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    useEffect(() => {
        fetch('https://tonus-creation.herokuapp.com/userOrder?email=' + loggedInUser.email, {
            method: "GET",
            headers: {
                authorization: `Bearer ${sessionStorage.getItem('token')}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                setMyOrder(data)
            });
    }, [loggedInUser.email])

    return (
        <div className="container">
            <div className="row mb-4 justify-content-center">
                {
                    !myOrder?.length &&
                    <div className="text-center mt-5 pt-5">
                    <h2>Loading Data...</h2>
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                }
                {
                    myOrder.map((order) =>
                        order?.cart.map(singleOrder =>
                            <div className="col-md-6 pr-0 mt-3 card-container">
                                <div className="serviceList-card card h-100 w-100">
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className='col-lg-7 px-3'>
                                                <img className="w-100 my-2" src={`data:image/png;base64,${singleOrder?.image?.img}`} alt="" />
                                            </div>
                                            <div className="col-lg-5 px-0 text-right">
                                                {
                                                    order?.status === 'PENDING' ?
                                                    <button className="w-75 btn btn-secondary d-block mx-auto text-center  text-white font-weight-bold my-4">Status: {order?.status}</button>
                                                    : order?.status === 'APPROVED' ?
                                                    <button className="w-75 btn btn-primary d-block mx-auto text-center  text-white font-weight-bold my-4">Status: {order?.status}</button> 
                                                    : order?.status === 'IN PROGRESS' ?
                                                    <button className="w-75 btn progress d-block mx-auto text-center  text-white font-weight-bold my-4">Status: {order?.status}</button> 
                                                    : order?.status === 'SHIPPED' ?
                                                    <button className="w-75 btn shipped d-block mx-auto text-center  text-white font-weight-bold my-4">Status: {order?.status}</button> 
                                                    : order?.status === 'DONE' ? 
                                                    <button className="w-75 btn btn-success d-block mx-auto text-center  text-white font-weight-bold my-4">Status: {order?.status}</button> 
                                                    :
                                                    <button className="w-75 btn btn-danger d-block mx-auto text-center  text-white font-weight-bold my-4">Status: {order?.status}</button> 
                                                }
                                            </div>
                                        </div>
                                        <h4 className="card-title my-3 text-danger">{singleOrder?.name}</h4>

                                        <div className="w-75 form-inline d-flex flex-row justify-content-between align-items-center my-1">
                                            <label className='h6 font-weight-bold'>ArtWork Type:</label>
                                            <h6>{singleOrder?.artType}</h6>
                                        </div>

                                        <div className="w-75 form-inline d-flex flex-row justify-content-between align-items-center my-1">
                                            <label className='h6 font-weight-bold'>Paper:</label>
                                            <h6>{singleOrder?.paper}</h6>
                                        </div>

                                        <div className="w-75 form-inline d-flex flex-row justify-content-between align-items-center my-1">
                                            <label className='h6 font-weight-bold'>Size:</label>
                                            <h6>{singleOrder?.size}</h6>
                                        </div>

                                        <div className='my-2'>
                                            <h5 className='mb-1'>Inside Border:</h5>
                                            <div className="w-75 form-inline d-flex flex-row justify-content-between align-items-center">
                                                <label className='h6 font-weight-bold'>Color: </label>
                                                <h6>{singleOrder?.borderSize}</h6>
                                            </div>

                                            <div className="w-75 form-inline d-flex flex-row justify-content-between align-items-center">
                                                <label className='h6 font-weight-bold'>Size: </label>
                                                <h6>{singleOrder?.borderColor}</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <p className="text-success h5 font-weight-bold">Price: <span className='h3 font-weight-bold text-success'>৳</span>{singleOrder?.price}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    );
};

export default UserOrder;