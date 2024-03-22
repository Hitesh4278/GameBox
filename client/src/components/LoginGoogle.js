import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export const LoginGoogle = () => {
    const navigate = useNavigate()
    const handleSuccess = async (credentialResponse) => {
        const credential = jwtDecode(credentialResponse.credential);
        const email = credential.email;
        const password = credential.name;
        try {
            const config = {
                method: "post",
                url: "http://localhost:8000/login",
                data: {
                    email: email,
                    password: password,
                },
            }
            axios(config)
                .then((result) => {
                    alert("Login Successfull")
                    localStorage.setItem('authenticated', true);
                    localStorage.setItem('email', email);
                    navigate('/')

                })
                .catch((error) => {
                    alert("Login Failed")
                    error = new Error();
                });
        } catch (error) {
            console.log(error)
        }

    }
    const handleError = () => {
        console.log('Login Failed');
        alert("Login  Failed");
    };

    return (
        <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
        />
    );
};
