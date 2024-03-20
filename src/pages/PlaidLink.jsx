import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth.context.jsx';
import { getAccounts } from '../API/account.api.js';
import { createLinkToken, setAccessToken } from '../API/plaid.api';
import { usePlaidLink } from 'react-plaid-link';

function PlaidLink() {
    const { banks, isLoggedIn, isLoading, user, setError } = useContext(AuthContext);
    const [linkToken, setLinkToken] = useState('');

    // Create a link token
    const handleConnect = async () => {
        const reqBody = { user_id: user._id, client_name: user.name };

        try {
            const response = await createLinkToken(reqBody);
            setLinkToken(response.data.link_token);
        } catch (error) {
            console.log('Error creating link token', error);
        }
    };

    useEffect(() => {
        handleConnect();
    }, []);

    // If successfully connected, create a public token and send it to backend
    const onSuccess = React.useCallback((public_token, metadata) => {
        try {
            setAccessToken({ public_token: public_token, user_id: user._id, metadata });
            console.log('Post request is made to the server sending public_token');
        } catch (error) {
            console.log(`Cannot get access token`, error);
        }
        // console.log('Plaid Link success', public_token, metadata);
    });

    const config = {
        token: linkToken,
        onSuccess
    };

    const { open, ready, error } = usePlaidLink(config);

    // open the Link menu when conditions are met
    useEffect(() => {
        if (ready && linkToken && !banks) {
            open();
        }
    }, [ready, linkToken, open]);


    // Getting /auth info for each bank



    return (
        <div className='w-full flex justify-center'>
            {error && <p>An error occurred: {error.message}</p>}
            <button onClick={() => open()} disabled={!ready}
                className="p-2 m-2 border rounded-sm border-black dark:border-slate-300 hover:bg-neutral-700 hover:text-white
            dark:hover:bg-white dark:hover:text-black  hover:border-transparent cursor-pointer">Connect a bank account</button>
        </div>
    );
}

export default PlaidLink;
