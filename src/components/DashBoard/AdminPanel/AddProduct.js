import React, { useState } from 'react';

const AddProduct = () => {
    const [newProduct, setNewProduct] = useState({});
    const [file, setFile] = useState(null);
    const handleSubmit = e => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', newProduct.name);
        formData.append('price', newProduct.price);
        formData.append('size', newProduct.size);
        formData.append('paper', newProduct.paper);
        formData.append('borderSize', newProduct.borderSize);
        formData.append('borderColor', newProduct.borderColor);

        fetch('https://creative-agency-spa.herokuapp.com/addService', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    alert('one new service added successfully!');
                }
            })
    }
    const handleChange = e => {
        const newInfo = { ...newProduct };
        newInfo[e.target.name] = e.target.value;
        setNewProduct(newInfo);
    }
    const handleFileChange = e => {
        const newFile = e.target.files[0];
        setFile(newFile);
    }

    return (
        <form className="p-5" onSubmit={handleSubmit}>
            <div className="row align-items-center">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="name">Product Name</label>
                        <input onChange={handleChange} type="text" name='name' className="form-control" id="name" placeholder="Enter Product Name" required />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="price"></label>
                        <input onChange={handleChange} type="number" name='price' className="form-control" id="price" placeholder="Price in BDT" required />
                    </div>
                </div>
            </div>

            <div className="row align-items-center">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="size"></label>
                        <input onChange={handleChange} type="text" name='size' className="form-control" id="size" placeholder="Example: 12 x 16 inch" required />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="paper"></label>
                        <input onChange={handleChange} type="text" name='paper' className="form-control" id="paper" placeholder="Enter Paper Type" required />
                    </div>
                </div>
            </div>

            <div className="row align-items-center">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="borderSize"></label>
                        <input onChange={handleChange} type="text" name='borderSize' className="form-control" id="borderSize" placeholder="Example: 1 x 1 inch" required />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="borderColor"></label>
                        <input onChange={handleChange} type="text" name='borderColor' className="form-control" id="borderColor" placeholder="Enter Paper Type" required />
                    </div>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="img">Image</label>
                <input onChange={handleFileChange} type="file" name="file" className="form-control-file" id="img" />
            </div>

            <input className='btn btn-success px-5' type="submit" value="Submit" />
        </form>
    );
};

export default AddProduct;