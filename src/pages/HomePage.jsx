import { useState, useEffect, useContext } from 'react';
// import { Link as ScrollLink } from 'react-scroll';
import { AuthContext } from '../context/auth.context';
import Ad from '../components/Ad';
import PlaidLink from './PlaidLink';


function HomePage() {
    const { isLoggedIn, isLoading, user, setError } = useContext(AuthContext);

    return (
        <div className='min-h-screen w-screen '>
            {isLoading ?
                <p>Loading...</p>
                :
                (!isLoggedIn ?
                    <Ad />
                    :
                    <div className='h-screen'>
                        <PlaidLink />

                    </div>
                )
            }
        </div>
    );
}

export default HomePage;
