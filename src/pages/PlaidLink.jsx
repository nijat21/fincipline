import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { getAccounts } from '../API/account.api.js';
import { createLinkToken, setAccessToken } from '../API/plaid.api';
import { usePlaidLink } from 'react-plaid-link';

function PlaidLink() {
    const { isLoggedIn, isLoading, user, setError } = useContext(AuthContext);
    const [linkToken, setLinkToken] = useState('');
    const [accounts, setAccounts] = useState('');

    // See if there is any bank account already connected
    const checkAccounts = async () => {
        try {
            const response1 = await getAccounts(user._id);
            setAccounts(response1.data);
            console.log(accounts);
        } catch (error) {
            console.log('Error accessing bank accounts');
        }
    };

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
        checkAccounts();
        handleConnect();
    }, []);

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

    useEffect(() => {
        if (ready && linkToken) {
            open();
        }
    }, [ready, linkToken, open]);

    return (
        <div>
            {error && <p>An error occurred: {error.message}</p>}
            <button onClick={() => open()} disabled={!ready}>Connect a bank account</button>;
        </div>
    );
}

export default PlaidLink;
