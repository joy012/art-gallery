import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';
import './UserOrder.css';


const UserOrder = () => {
    const [myOrder, setMyOrder] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    useEffect(() => {
        fetch('https://creative-agency-spa.herokuapp.com/myOrder?email=' + loggedInUser.email, {
            method: "GET",
            headers: {
                authorization: `Bearer ${sessionStorage.getItem('token')}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => setMyOrder(data));
    },[loggedInUser.email])

    return (
        <div className="container">
            <div className="row">
                {
                    !myOrder?.length &&
                    <div class="text-center mt-5 pt-5">
                        <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                    </div>
                }
                {
                    myOrder.map((order) =>
                        <div className="col-sm-6 pr-0 mt-3 card-container">
                            <div className="serviceList-card card h-100 w-100">
                                <div className="card-body">
                                    <div className="row align-items-center">
                                        <div className='col-md-5 px-3'>
                                            <img className="w-100 my-4" src={`data:image/png;base64,${order.image.img}`} alt="" />
                                        </div>
                                        <div className="col-md-7 px-0 text-right">
                                            <button className="status-btn d-block mx-auto text-center my-4" disabled>{order.status}</button>
                                        </div>
                                    </div>
                                    <h5 className="card-title my-3">{order.service}</h5>
                                    <p className="card-text text-muted">{order.details}</p>
                                </div>
                                <div class="card-footer">
                                        <p className="card-text">Price: {order.price}TK</p>
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