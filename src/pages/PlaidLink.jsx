import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'sonner';
import { AuthContext } from '../context/auth.context.jsx';
import { createLinkToken, setAccessToken } from '../API/plaid.api';
import { usePlaidLink } from 'react-plaid-link';


function PlaidLink() {
    const { banks, setBankReturned, user, } = useContext(AuthContext);
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
    const onSuccess = React.useCallback(async (public_token, metadata) => {
        try {
            const response = await setAccessToken({ public_token: public_token, user_id: user._id, metadata });
            console.log('Post request is made to the server sending public_token', response);
            setBankReturned(response.data.bank);
            if (response.status == 200) {
                toast.success('Account successfully added!');
            } else {
                toast.warning("Something wend wrong");
            }
        } catch (error) {
            console.log(`Cannot get access token`, error);
        }
    });

    const config = {
        token: linkToken,
        onSuccess
    };

    const { open, ready, error } = usePlaidLink(config);

    // open the Link menu when conditions are met
    useEffect(() => {
        if (ready && linkToken && banks && banks.length === 0) {
            open();
        }
    }, [ready, linkToken, open, banks]);


    return (
        <div>
            {error && <p>An error occurred: {error.message}</p>}
            <button onClick={() => open()} disabled={!ready}
                className="py-[3px] w-[188px] text-lg border rounded-md border-black dark:border-slate-300 hover:bg-neutral-700 hover:text-white
            dark:hover:bg-white dark:hover:text-black  hover:border-transparent cursor-pointer bg-neutral-300 dark:bg-blue-950 z-10">Add</button>
        </div>
    );
}

export default PlaidLink;
