import { createContext, useState, useEffect } from "react";
import { verify } from "../API/auth.api";

const AuthContext = createContext();

const AuthProvider = props => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);

    const storeToken = token => {
        localStorage.setItem('authToken', token);
    };

    const authenticateUser = async () => {
        // Obtain token from localStorage
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            try {
                const response = await verify(storedToken);
                const user = response.data;
                setUser(user);
                setIsLoggedIn(true);
            } catch (error) {
                console.log('Not able to authenticate the user', error);
                setUser(null);
                setIsLoggedIn(false);
            }
        } else {
            // if token isn't available 
            setUser(null);
            setIsLoggedIn(false);
        }

        setIsLoading(false);
    };

    const removeToken = () => {
        localStorage.removeItem('authToken');
    };

    const logoutUser = () => {
        removeToken();
        authenticateUser();
    };

    useEffect(() => {
        authenticateUser();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoading, isLoggedIn, user, storeToken, authenticateUser, logoutUser }}>
            {props.children}
        </AuthContext.Provider>
    );

};

export { AuthContext, AuthProvider };