/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => (
    <Route
        {...rest}
        render={({ location }) =>
            JSON.parse(sessionStorage.getItem('login'))?.email ||
            JSON.parse(sessionStorage.getItem('login'))?.name ? (
                children
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: location },
                    }}
                />
            )
        }
    />
);

export default PrivateRoute;
