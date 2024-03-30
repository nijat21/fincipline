import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { ThemeContext } from "../context/theme.context";
import { Navigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";

const IsAnon = props => {
    const { isLoggedIn, isLoading } = useContext(AuthContext);
    const { spinnerColor } = useContext(ThemeContext);

    // if the authentication is still loading 
    if (isLoading) {
        return (
            <div className="h-screen w-screen flex justify-center items-center">
                <HashLoader color="#FFF" size={60} />
            </div>
        );
    }

    if (isLoggedIn) {
        return <Navigate to={'/'} />;
    } else {
        return props.children;
    }
};

export default IsAnon;