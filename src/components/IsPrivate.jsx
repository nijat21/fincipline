import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { ThemeContext } from "../context/theme.context";
import { Navigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";

const IsPrivate = props => {
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
        return <Navigate to={'/login'} />;
    } else {
        return props.children;
    }
};

export default IsPrivate;