import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';
import './UserOrder.css';


const UserOrder = () => {
    const [myOrder, setMyOrder] = useState([]);
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
            .then(data => setMyOrder(data[0].cart));
    }, [loggedInUser.email])

    return (
        <div className="container">
            <div className="row mb-4">
                {
                    !myOrder?.length &&
                    <div className="text-center mt-5 pt-5">
                        <div class="spinner-border text-primary" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                }
                {
                    myOrder.map((order) =>
                        <div className="col-sm-6 pr-0 mt-3 card-container">
                            <div className="serviceList-card card h-100 w-100">
                                <div className="card-body">
                                    <div className="row align-items-center">
                                        <div className='col-md-7 px-3'>
                                            <img className="w-100 my-4" src={`data:image/png;base64,${order?.image?.img}`} alt="" />
                                        </div>
                                        <div className="col-md-5 px-0 text-right">
                                            <button className="w-75 btn btn-warning d-block mx-auto text-center text-dark my-4" disabled>{order?.status || 'PENDING'}</button>
                                        </div>
                                    </div>
                                    <h4 className="card-title my-3 text-danger">{order?.name}</h4>

                                    <div className="w-75 form-inline d-flex flex-row justify-content-between align-items-center my-2">
                                        <label className='h6 font-weight-bold'>ArtWork Type:</label>
                                        <h6>{order?.artType}</h6>
                                    </div>

                                    <div className="w-75 form-inline d-flex flex-row justify-content-between align-items-center my-2">
                                        <label className='h6 font-weight-bold'>Paper:</label>
                                        <h6>{order?.paper}</h6>
                                    </div>

                                    <div className="w-75 form-inline d-flex flex-row justify-content-between align-items-center my-2">
                                        <label className='h6 font-weight-bold'>Size:</label>
                                        <h6>{order?.size}</h6>
                                    </div>

                                    <div className='my-4'>
                                        <h5 className='mb-1'>Inside Border:</h5>
                                        <div className="w-75 form-inline d-flex flex-row justify-content-between align-items-center">
                                            <label className='h6 font-weight-bold'>Color: </label>
                                            <h6>{order?.borderSize}</h6>
                                        </div>

                                        <div className="w-75 form-inline d-flex flex-row justify-content-between align-items-center">
                                            <label className='h6 font-weight-bold'>Size: </label>
                                            <h6>{order?.borderColor}</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <p className="text-success h5 font-weight-bold">Price: <span className='h3 font-weight-bold text-success'>৳</span>{order?.price}</p>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default UserOrder;