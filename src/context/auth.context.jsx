import { createContext, useState, useEffect, useContext } from "react";
import { verify } from "../API/auth.api";
import { getBanks } from "../API/account.api";


const AuthContext = createContext();

const AuthProvider = props => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [profilePhoto, setProfilePhoto] = useState('');
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
            setProfilePhoto(null);
            setBanks(null);
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

    // Authenticate user every time reloaded
    useEffect(() => {
        authenticateUser();
    }, []);



    // Plaid parts
    // User details
    const [banks, setBanks] = useState([]);

    // Show banks
    const renderBanks = async () => {
        if (user) {
            try {
                const response = await getBanks({ user_id: user._id });
                setBanks(response.data);
                // console.log(response.data[0]);
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        // showAccounts();
        renderBanks();
    }, [user]);



    return (
        <AuthContext.Provider value={{
            isLoading, setIsLoading, isLoggedIn, user, storeToken, authenticateUser, logoutUser,
            profilePhoto, setProfilePhoto, banks, setBanks
        }}>
            {props.children}
        </AuthContext.Provider>
    );

};

export { AuthContext, AuthProvider };