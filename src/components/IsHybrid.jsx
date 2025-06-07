import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { ThemeContext } from "../context/theme.context";
import HashLoader from "react-spinners/HashLoader";
import ScrollToTop from "./ScrollToTop";
import LandingPage from "./LandingPage";``

const IsHybrid = props => {
    const { isLoggedIn, isLoading, isBankLoading } = useContext(AuthContext);
    const { spinnerColor } = useContext(ThemeContext);

    // if the authentication is still loading 
    if (isLoading || isBankLoading) {
        return (
            <div className="h-screen w-screen flex justify-center items-center">
                <HashLoader color={spinnerColor} size={60} />
            </div>
        );
    }

    if (!isLoggedIn) {
        console.log("Not logged in");
        return (
            <>
                <ScrollToTop />
                <LandingPage />
            </>
        );
    } else {
        return props.children;
    }
};

export default IsHybrid;