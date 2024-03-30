import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { ThemeContext } from "../context/theme.context";
import HashLoader from "react-spinners/HashLoader";
import Ad from "./Ad";

const IsHybrid = props => {
    const { isLoggedIn, isLoading } = useContext(AuthContext);
    const { spinnerColor } = useContext(ThemeContext);

    // if the authentication is still loading 
    if (isLoading) {
        return (
            <div className="h-screen w-screen flex justify-center items-center">
                <HashLoader color={spinnerColor} size={60} />
            </div>
        );
    }

    if (!isLoggedIn) {
        console.log("Not logged in");
        return (<Ad />);
    } else {
        return props.children;
    }
};

export default IsHybrid;