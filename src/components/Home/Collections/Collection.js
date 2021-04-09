/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import Bounce from 'react-reveal/Bounce';
import './Collection.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';


const Collection = () => {
    // const [databaseData, setDatabaseData] = useState([]);
    
    // useEffect(() => {
    //     fetch('http://localhost:1812/products')
    //         .then(res => res.json())
    //         .then(data => {
    //             sessionStorage.setItem('databaseProduct', JSON.parse(data))
    //             setDatabaseData(data)
    //         })
    // }, [])

    // if (sessionStorage.getItem('databaseProduct') !== null) {
    //     setDatabaseData(JSON.parse(sessionStorage.getItem('databaseProduct')))
    // }

    const [, , , , , , , , , , databaseData ] = useContext(UserContext);

    console.log(databaseData)

    return (
        <main className='container pt-5 mb-5'>
            <h2 className='text-center mb-2 pb-4'>Trending Now</h2>
            <div className="row align-items-center justify-content-center">
                {
                    databaseData.map(collection =>
                        <Bounce key={collection.name} left duration={2500}>
                            <div className="col-lg-3 col-md-4 col-6 mb-4 collection-card">
                                <Link to={`/productDetail/${collection?._id}`}>
                                    <div className="card">
                                        <div className="card-body">
                                            <img className="card-img-top w-100" src={`data:image/png;base64,${collection?.image.img}`} alt="" />
                                        </div>
                                        <div className="card-footer">
                                            <h6 className='text-center card-title'>{collection?.name}</h6>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </Bounce>
                    )
                }
            </div>

        </main>
    );
};

export default Collection;