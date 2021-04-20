import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';
import './UserOrder.css';


const UserOrder = () => {
    const [myOrder, setMyOrder] = useState([]);
    const [loggedInUser,] = useContext(UserContext);

    useEffect(() => {
        fetch('https://tonuscreation.herokuapp.com/userOrder?email=' + loggedInUser.email, {
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
            {
                !myOrder?.length &&
                <div className="text-center mt-5 pt-5">
                    <h2 className='text-danger'>You haven't placed any order yet!</h2>
                </div>
            }

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                {
                    myOrder.map((order) =>
                        order?.cart.map(singleOrder =>
                            <div className="col mb-4" key={order?._id}>
                                <div className="card h-100">
                                    <img className="w-100 my-2" src={singleOrder?.img} alt="" />
                                    {
                                        order?.status === 'PENDING' ?
                                            <button className="w-75 btn btn-secondary d-block mx-auto text-center  text-white font-weight-bold my-4">Status: {order?.status}</button>
                                            : order?.status === 'APPROVED' ?
                                                <button className="w-75 btn btn-primary d-block mx-auto text-center  text-white font-weight-bold my-4">Status: {order?.status}</button>
                                                : order?.status === 'ON GOING' ?
                                                    <button className="w-75 going btn d-block mx-auto text-center  text-white font-weight-bold my-4">Status: {order?.status}</button>
                                                    : order?.status === 'SHIPPED' ?
                                                        <button className="w-75 btn shipped d-block mx-auto text-center  text-white font-weight-bold my-4">Status: {order?.status}</button>
                                                        : order?.status === 'DONE' ?
                                                            <button className="w-75 btn btn-success d-block mx-auto text-center  text-white font-weight-bold my-4">Status: {order?.status}</button>
                                                            :
                                                            <button className="w-75 btn btn-danger d-block mx-auto text-center  text-white font-weight-bold my-4">Status: {order?.status}</button>
                                    }
                                    <div className="card-body">
                                        <h5 className="card-title text-center text-danger h4">{singleOrder?.name}</h5>
                                        <div className=" form-inline d-flex flex-row justify-content-between align-self-center my-1">
                                            <label className='h6 font-weight-bold'>ArtWork Type:</label>
                                            <h6 className='mb-0'>{singleOrder?.artType}</h6>
                                        </div>

                                        <div className=" form-inline d-flex flex-row justify-content-between align-items-center my-1">
                                            <label className='h6 font-weight-bold'>Paper:</label>
                                            <h6 className='mb-0'>{singleOrder?.paper}</h6>
                                        </div>

                                        <div className=" form-inline d-flex flex-row justify-content-between align-items-center my-1">
                                            <label className='h6 font-weight-bold'>Size:</label>
                                            <h6 className='mb-0'>{singleOrder?.size}</h6>
                                        </div>

                                        <div className='my-3'>
                                            <h5 className='mb-1'>Inside Border:</h5>
                                            <div className="form-inline d-flex flex-row justify-content-between align-items-center">
                                                <label className='h6 font-weight-bold'>Color: </label>
                                                <h6 className='mb-0'>{singleOrder?.borderSize}</h6>
                                            </div>

                                            <div className="form-inline d-flex flex-row justify-content-between align-items-center">
                                                <label className='h6 font-weight-bold'>Size: </label>
                                                <h6 className='mb-0'>{singleOrder?.borderColor}</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <p className="text-success h5 font-weight-bold text-center">Price: <span className='h3 font-weight-bold text-success'>৳</span>{singleOrder?.price}</p>
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