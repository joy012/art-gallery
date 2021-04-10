import React, { useEffect, useState } from 'react';

const AllProducts = () => {
    const [allProduct, setAllProduct] = useState([]);
    useEffect(() => {
        fetch('http://localhost:1812/products')
            .then(res => res.json())
            .then(data => {
                setAllProduct(data);
            })
    }, [])

    const removeItem = id => {
        fetch(`http://localhost:1812/delete/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    alert('One Product removed')
                }
            })
            const updatedList = allProduct.filter(product => product._id !== id)
            setAllProduct(updatedList);
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
                                            <td className='img-td '><img src={`data:image/png;base64,${pd?.image.img}`} draggable="false" className='w-100' alt="" /></td>
                                            <td className='w-50 text-center'>
                                                <h4 className='productName'>{pd?.name}</h4>
                                                <p>{pd?.paper}</p>
                                                <p>{pd?.frameSize}</p>
                                            </td>
                                            <td className='h5 text-center text-danger'>BDT {pd?.price}</td>
                                            <td >
                                                <button onClick={() => removeItem(`${pd._id}`)} className="btn btn-sm btn-danger d-block mx-auto">Remove</button>
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