import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { ThemeContext } from "../context/theme.context";
import { Navigate } from "react-router-dom";
import { Spinner } from '@chakra-ui/react';

const IsPrivate = props => {
    const { isLoggedIn, isLoading } = useContext(AuthContext);
    const { spinnerColor } = useContext(ThemeContext);

    // if the authentication is still loading 
    if (isLoading) {
        <Spinner className="h-screen w-full"
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color={spinnerColor}
            size='xl'
        />;
    }

    if (!isLoggedIn) {
        console.log("Not logged in");
        return <Navigate to={'/login'} />;
    } else {
        return props.children;
    }
};

export default IsPrivate;