import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./auth.context";

const PlaidContext = createContext();

const PlaidProvider = props => {

    const { user } = useContext(AuthContext);

    // Requesting the Public Token
    const reqPublicToken = async () => {
        const reqBody = { user_id: user._id, client_name: user.name };

        try {
            const response = await createLinkToken(reqBody);
            localStorage.setItem('linkToken', response.data.link_token);
        } catch (error) {
            console.log('Error creating link token', error);
        }
    };

    // Converting Public token to Access token
    const convertToAccessToken = async () => {
        const publicToken = localStorage.getItem('linkToken');

    };

    // Remove Public token
    const removePublicToken = async () => {
        localStorage.removeItem('linkToken');
    };



};

return (
    <PlaidContext.Provider value={{}}>
        {props.children}
    </PlaidContext.Provider>
);

export { PlaidContext, PlaidProvider };