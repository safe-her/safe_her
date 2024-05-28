import React, { useState, useEffect } from 'react';
import '../Styles/login.css';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
// import { googleLogout, useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios';


export const Login = () => {
    const [ user, setUser ] = useState(null);
    const [ profile, setProfile ] = useState(null);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        console.log(res.data);
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));

                // TODO: post user object if new login
            }
        }, [ user ]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    return (
        <div className='parent'>
            <div className='height'>
                <h3>Click here to login with Google!</h3>
                <br />
                <br />
                {profile ? (
                    <div>
                        {/* <img src={profile.picture} alt="user image" /> */}
                        {/* <h3>User Logged in</h3> */}
                        <p>Name: {profile.name}</p>
                        <p>Email Address: {profile.email}</p>
                        <br />
                        <br />
                        <button onClick={logOut}>Log out</button>
                    </div>
                ) : (
                    <button className = 'rect-button' onClick={() => login()}>Log In</button>
                )}
            </div>
        </div>
    );
   
}

 // const responseMessage = (response) => {
    //     console.log(response);
    // };
    // const errorMessage = (error) => {
    //     console.log(error);
    // };
    // return (
    //     <div className='height'>
    //         <h2>React Google Login</h2>
    //         <br />
    //         <br />
    //         <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
    //     </div>
    // )
