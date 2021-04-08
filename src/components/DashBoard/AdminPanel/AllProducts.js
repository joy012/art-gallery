import React, { useEffect, useState } from 'react';

const AllProducts = () => {
    const [allProduct, setAllProduct] = useState([]);
    useEffect(() => {
        fetch('https://creative-agency-spa.herokuapp.com/orders')
            .then(res => res.json())
            .then(data => {
                sessionStorage.setItem('allProduct', JSON.stringify(data));
                setAllProduct(data);
            })
    }, [])

    const removeItem = key => {
        const savedCart = JSON.parse(sessionStorage.getItem('allProduct'));
        const updateStore = savedCart.filter(product => product.key !== key);
        sessionStorage.setItem('allProduct', JSON.stringify(updateStore));
        setAllProduct(updateStore);
    }
    return (
        <>
            {
                allProduct?.length ?
                    <div className="table-container table-responsive mt-3 mb-5 mr-4 p-3">
                        <table className="table">
                            <tbody>
                                {
                                    allProduct?.map(pd =>
                                        <tr>
                                            <td className='img-td '><img src={pd?.image} draggable="false" className='w-100' alt="" /></td>
                                            <td className='w-50 text-center'>
                                                <h4 className='productName'>{pd?.name}</h4>
                                                <p>{pd?.paper}</p>
                                                <p>{pd?.frameSize}</p>
                                            </td>
                                            <td className='h5 text-center text-danger'>BDT {pd?.price}</td>
                                            <td >
                                                <button onClick={() => removeItem(pd?.key)} className="btn btn-sm btn-danger d-block mx-auto">Remove</button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    :
                    ''
            }
        </>
    );
};

export default AllProducts;