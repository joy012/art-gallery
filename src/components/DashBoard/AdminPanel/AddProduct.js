/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const AddProduct = () => {
    const [newProduct, setNewProduct] = useState({});
    const [image, setImage] = useState(null);
    const history = useHistory();

    const handleSubmit = (e) => {
        const imageData = new FormData();
        imageData.set('key', '87015992ba8ff4ec487f63e035eb5e6c');
        imageData.append('image', image);
        axios
            .post('https://api.imgbb.com/1/upload', imageData)
            .then((result) => {
                if (result?.data?.data?.display_url) {
                    const productDetail = {
                        img: result?.data?.data?.display_url,
                        name: newProduct.name,
                        price: newProduct.price,
                        size: newProduct.size,
                        paper: newProduct.paper,
                        borderSize: newProduct.borderSize,
                        borderColor: newProduct.borderColor,
                        artType: newProduct.artType,
                    };

                    fetch('https://tonuscreation.herokuapp.com/addArtWork', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(productDetail),
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            if (data) {
                                alert('One product has added successfully!');
                                history.push('/admin/allProduct');
                            }
                        });
                }
            })
            .catch((err) => console.log(err));
        e.preventDefault();
    };
    const handleChange = (e) => {
        const newInfo = { ...newProduct };
        newInfo[e.target.name] = e.target.value;
        setNewProduct(newInfo);
    };

    const handleImageUpload = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <form className="p-5" onSubmit={handleSubmit}>
            <div className="row align-items-center">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="name">Product Name</label>
                        <input
                            onChange={handleChange}
                            type="text"
                            name="name"
                            className="form-control"
                            id="name"
                            placeholder="Enter Product Name"
                            required
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input
                            onChange={handleChange}
                            type="number"
                            name="price"
                            className="form-control"
                            id="price"
                            placeholder="Price in BDT"
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="row align-items-center">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="size">Size</label>
                        <input
                            onChange={handleChange}
                            type="text"
                            name="size"
                            className="form-control"
                            id="size"
                            placeholder="Example: 12 x 16 inch"
                            required
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="paper">Paper Type</label>
                        <input
                            onChange={handleChange}
                            type="text"
                            name="paper"
                            className="form-control"
                            id="paper"
                            placeholder="Enter Paper Type"
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="row align-items-center">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="borderSize">Border Size</label>
                        <input
                            onChange={handleChange}
                            type="text"
                            name="borderSize"
                            className="form-control"
                            id="borderSize"
                            placeholder="Example: 1 x 1 inch"
                            required
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="borderColor">Border Color</label>
                        <input
                            onChange={handleChange}
                            type="text"
                            name="borderColor"
                            className="form-control"
                            id="borderColor"
                            placeholder="Enter Paper Type"
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="row align-items-center">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="artType">Artwork Type</label>
                        <select
                            onChange={handleChange}
                            name="artType"
                            defaultValue="Artwork Type"
                            className="form-control"
                            id="artType"
                            required
                        >
                            <option value="Artwork Type" disabled>
                                ArtWork Type
                            </option>
                            <option value="Illustration">Illustration</option>
                            <option value="Arabic Calligraphy">Arabic Calligraphy</option>
                            <option value="Portrait">Portrait</option>
                            <option value="Accessories">Accessories</option>
                        </select>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="img">Image</label>
                        <input
                            onChange={handleImageUpload}
                            type="file"
                            name="file"
                            className="form-control-file"
                            id="img"
                        />
                    </div>
                </div>
            </div>

            <input className="btn btn-success px-5" type="submit" value="Submit" />
        </form>
    );
};

export default AddProduct;
