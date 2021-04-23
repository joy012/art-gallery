/* eslint-disable import/no-cycle */
import React from 'react';
import Footer from '../Home/Footer/Footer';
import LogInForm from './LogInForm';

const LogIn = () => (
    <>
        <LogInForm />
        <Footer />
    </>
);

export default LogIn;
