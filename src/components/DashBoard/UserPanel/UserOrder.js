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
            .then(data => setMyOrder(data));
    }, [loggedInUser.email])

    console.log(myOrder)

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
                        order?.cart.map(singleOrder =>
                            <div className="col-sm-6 pr-0 mt-3 card-container">
                                <div className="serviceList-card card h-100 w-100">
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className='col-md-7 px-3'>
                                                <img className="w-100 my-4" src={`data:image/png;base64,${singleOrder?.image?.img}`} alt="" />
                                            </div>
                                            <div className="col-md-5 px-0 text-right">
                                                <button className="w-75 btn btn-warning d-block mx-auto text-center text-dark my-4 disabled">{order?.status}</button>
                                            </div>
                                        </div>
                                        <h4 className="card-title my-3 text-danger">{singleOrder?.name}</h4>

                                        <div className="w-75 form-inline d-flex flex-row justify-content-between align-items-center my-2">
                                            <label className='h6 font-weight-bold'>ArtWork Type:</label>
                                            <h6>{singleOrder?.artType}</h6>
                                        </div>

                                        <div className="w-75 form-inline d-flex flex-row justify-content-between align-items-center my-2">
                                            <label className='h6 font-weight-bold'>Paper:</label>
                                            <h6>{singleOrder?.paper}</h6>
                                        </div>

                                        <div className="w-75 form-inline d-flex flex-row justify-content-between align-items-center my-2">
                                            <label className='h6 font-weight-bold'>Size:</label>
                                            <h6>{singleOrder?.size}</h6>
                                        </div>

                                        <div className='my-4'>
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