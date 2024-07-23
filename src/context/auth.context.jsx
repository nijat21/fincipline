import { createContext, useState, useEffect } from "react";
import { verify } from "../API/auth.api";
import { getBanks } from "../API/account.api";
import { v4 as uuidv4 } from 'uuid';


const AuthContext = createContext();

const AuthProvider = props => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isBankLoading, setIsBankLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [banks, setBanks] = useState([]);
    const [bankReturned, setBankReturned] = useState(null);
    const [profilePhoto, setProfilePhoto] = useState(null);

    const [clearData, setClearData] = useState(null);


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
                removeLSItems();
                setClearData(uuidv4());
            }
        } else {
            // if token isn't available 
            setUser(null);
            setIsLoggedIn(false);
            setBanks(null);
            removeLSItems();
            setClearData(uuidv4());
        }
        // console.log('UUDV', clearData);
        setIsLoading(false);
    };


    const removeLSItems = () => {
        // Access token
        localStorage.removeItem('authToken');
        // Other items
        localStorage.removeItem('currBank');
        localStorage.removeItem('selectedMonth');
        localStorage.removeItem('startDate');
        localStorage.removeItem('endDate');
        localStorage.removeItem('theme');
    };

    const logoutUser = () => {
        removeLSItems();
        setClearData(uuidv4());
        authenticateUser();
        // console.log('User logged out, isLoggedOut set to:', true);
    };


    // Authenticate user every time reloaded
    useEffect(() => {
        authenticateUser();
        renderBanks();
    }, []);


    // Show banks
    const renderBanks = async () => {
        if (user) {
            setIsBankLoading(true);
            try {
                const response = await getBanks({ user_id: user._id });
                setBanks(response.data);
                console.log('Render Banks run', response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsBankLoading(false);
                // setIsLoading(false);
            }
        }
    };


    useEffect(() => {
        // showAccounts();
        renderBanks();
    }, [user, bankReturned]);



    return (
        <AuthContext.Provider value={{
            isLoading, setIsLoading, isLoggedIn, user, storeToken, authenticateUser, logoutUser,
            banks, setBanks, setBankReturned, isBankLoading, renderBanks, profilePhoto, setProfilePhoto,
            clearData, setClearData,
        }}>
            {props.children}
        </AuthContext.Provider>
    );

};

export { AuthContext, AuthProvider };