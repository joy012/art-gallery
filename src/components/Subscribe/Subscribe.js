import React from 'react';

const Subscribe = () => {
    return (
        <div className='container px-5 mb-5' style={{backgroundColor: '#eee', borderRadius:'20px'}}>
            <div className="row align-items-center justify-content-center">
                <div className="col-md-6 py-md-4 pt-4 pt-md-0">
                    <h2>Let's Stay in touch</h2>
                    <p>Subscribe to receive updates on new products, discounts and more.</p>
                </div>
                <div className="col-md-6 py-md-4 pb-4 pb-md-0" >
                    <form className="p-md-5">
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Your Email" />
                            <button className='btn btn-success px-4 mt-2'>Subscribe</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Subscribe;