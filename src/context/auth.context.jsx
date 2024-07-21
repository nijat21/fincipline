import { createContext, useState, useEffect, useContext } from "react";
import { verify } from "../API/auth.api";
import { getBanks } from "../API/account.api";


const AuthContext = createContext();

const AuthProvider = props => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isBankLoading, setIsBankLoading] = useState(false);

    const [user, setUser] = useState(null);
    const [banks, setBanks] = useState([]);
    const [bankReturned, setBankReturned] = useState(null);

    const [profilePhoto, setProfilePhoto] = useState(null);
    const [analyticsInput, setAnalyticsInput] = useState(null); // Moved from FilterContext so that old data can be deleted when user logs out or unauthenticated
    const [allTransactions, setAllTransactions] = useState(null);
    const [transactionsLTD, setTransactionsLTD] = useState(null);
    const [tranCurrMonth, setTranCurrMonth] = useState(null);
    const [data, setData] = useState([]);
    const [finalData, setFinalData] = useState(null);


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
            }
        } else {
            // if token isn't available 
            setUser(null);
            setIsLoggedIn(false);
            setBanks(null);
            removeLSItems();
        }

        setIsLoading(false);
    };

    const removeToken = () => {
        localStorage.removeItem('authToken');
    };

    const removeLSItems = () => {
        localStorage.removeItem('currBank');
        localStorage.removeItem('selectedMonth');
        localStorage.removeItem('startDate');
        localStorage.removeItem('endDate');
        localStorage.removeItem('theme');
        // clear all data for analytics
        setAnalyticsInput(null);
        setAllTransactions(null);
        setTranCurrMonth(null);
        setTransactionsLTD(null);
        setData([]);
        setFinalData(null);
    };

    const logoutUser = () => {
        removeToken();
        removeLSItems();
        authenticateUser();
        // clear all data for analytics
        setAnalyticsInput(null);
        setAllTransactions(null);
        setTranCurrMonth(null);
        setTransactionsLTD(null);
        setData([]);
        setFinalData(null);
    };

    // Authenticate user every time reloaded
    useEffect(() => {
        // setIsLoading(true);
        authenticateUser();
        renderBanks();
    }, []);


    // Show banks
    const renderBanks = async () => {
        console.log('Render Banks run');
        if (user) {
            setIsBankLoading(true);
            try {
                const response = await getBanks({ user_id: user._id });
                setBanks(response.data);
                // console.log(response.data[0]);
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
            analyticsInput, setAnalyticsInput, allTransactions, setAllTransactions, tranCurrMonth, setTranCurrMonth,
            transactionsLTD, setTransactionsLTD, finalData, setFinalData, data, setData
        }}>
            {props.children}
        </AuthContext.Provider>
    );

};

export { AuthContext, AuthProvider };