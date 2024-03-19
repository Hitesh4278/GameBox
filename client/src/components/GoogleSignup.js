import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export const GoogleSignup = () => {
    const navigate = useNavigate()
    const handleSuccess = async (credentialResponse) => {
        const credential = jwtDecode(credentialResponse.credential);
        const email = credential.email;
        const password = credential.name;
        console.log(credential)

        try {
            const config = {
                method: "post",
                url: "http://localhost:8000/signup",
                data: {
                    email: email,
                    password: password,
                },
            }
            axios(config)
                .then((result) => {
                    alert("Signed Up Successfull")
                    localStorage.setItem('authenticated', true);
                    localStorage.setItem('email', email);
                    navigate('/')

                })
                .catch((error) => {
                    alert("Signed Up Failed")
                    error = new Error();
                });
        } catch (error) {
            console.log(error)
        }

    }
    const handleError = () => {
        console.log('Signup Failed');
        alert("Signup Failed");
    };

    return (
        <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
        />
    );
};
