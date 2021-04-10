import React, { useState } from 'react';

const AddProduct = () => {
    const [newProduct, setNewProduct] = useState({});
    const [image, setImage] = useState(null);
    console.log(newProduct)
    const handleSubmit = e => {
        const formData = new FormData();
        if (image !== null) {
            formData.append('productImg', image);
            formData.append('name', newProduct.name);
            formData.append('price', newProduct.price);
            formData.append('size', newProduct.size);
            formData.append('paper', newProduct.paper);
            formData.append('borderSize', newProduct.borderSize);
            formData.append('artType', newProduct.artType);
            formData.append('borderColor', newProduct.borderColor);
            console.log(formData)
            fetch('https://tonus-creation.herokuapp.com/addProduct', {
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
    }
    const handleChange = e => {
        const newInfo = { ...newProduct };
        newInfo[e.target.name] = e.target.value;
        setNewProduct(newInfo);
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
                        <label htmlFor="price">Price</label>
                        <input onChange={handleChange} type="number" name='price' className="form-control" id="price" placeholder="Price in BDT" required />
                    </div>
                </div>
            </div>

            <div className="row align-items-center">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="size">Size</label>
                        <input onChange={handleChange} type="text" name='size' className="form-control" id="size" placeholder="Example: 12 x 16 inch" required />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="paper">Paper Type</label>
                        <input onChange={handleChange} type="text" name='paper' className="form-control" id="paper" placeholder="Enter Paper Type" required />
                    </div>
                </div>
            </div>

            <div className="row align-items-center">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="borderSize">Border Size</label>
                        <input onChange={handleChange} type="text" name='borderSize' className="form-control" id="borderSize" placeholder="Example: 1 x 1 inch" required />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="borderColor">Border Color</label>
                        <input onChange={handleChange} type="text" name='borderColor' className="form-control" id="borderColor" placeholder="Enter Paper Type" required />
                    </div>
                </div>
            </div>

            <div className="row align-items-center">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="artType">Artwork Type</label>
                        <select onChange={handleChange} name='artType' className="form-control w-50" id="artType" required>
                            <option value='' disabled selected></option>
                            <option value='Illustration'>Illustration</option>
                            <option value='Arabic Calligraphy'>Arabic Calligraphy</option>
                            <option value='Portrait'>Portrait</option>
                            <option value='Lyric Card'>Lyric Card</option>
                            <option value='Quote Card'>Quote Card</option>
                        </select>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="img">Image</label>
                        <input onChange={e => setImage(e.target.files[0])} type="file" name="file" className="form-control-file" id="img" />
                    </div>
                </div>
            </div>



            <input className='btn btn-success px-5' type="submit" value="Submit" />
        </form>
    );
};

export default AddProduct;