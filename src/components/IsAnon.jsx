import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { ThemeContext } from "../context/theme.context";
import { Navigate } from "react-router-dom";
import { Spinner } from '@chakra-ui/react';

const IsAnon = props => {
    const { isLoggedIn, isLoading } = useContext(AuthContext);
    const { spinnerColor } = useContext(ThemeContext);

    // if the authentication is still loading 
    if (isLoading) {
        <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color={spinnerColor}
            size='xl'
        />;
    }

    if (isLoggedIn) {
        return <Navigate to={'/'} />;
    } else {
        return props.children;
    }
};

export default IsAnon;