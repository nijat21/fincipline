import { createContext, useState, useEffect, useMemo, useCallback } from "react";
import { exportPDF, printPDF } from '../components/PDF';
import { getAllTransactions } from "../API/plaid.api";
import { v4 as uuidv4 } from 'uuid';

const FilterContext = createContext();

const FilterProvider = props => {
    // User input from filter
    const [selectedMonth, setSelectedMonth] = useState(() => null);
    const [selectedBank, setSelectedBank] = useState(() => null);
    const [startDate, setStartDate] = useState(() => null);
    const [endDate, setEndDate] = useState(() => null);
    // Menu / boolean
    const [dateRangeMenu, setDateRangeMenu] = useState(() => false);
    const [rangeSelected, setRangeSelected] = useState(() => false);
    const [bankMenu, setBankMenu] = useState(false);
    const [rangeSubmitClear, setRangeSubmitClear] = useState(null);
    // Data
    const [transactionsLTD, setTransactionsLTD] = useState(null);
    const [allTransactions, setAllTransactions] = useState(null);
    const [data, setData] = useState(null);
    const [analyticsInput, setAnalyticsInput] = useState(null);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    // User
    // const { user } = useContext(AuthContext);

    // Retrieve all transactions
    const retrieveTransactions = async (id) => {
        if (!id) {
            console.log('User ID is not present');
        }
        try {
            const params = { user_id: id };
            const transactions = await getAllTransactions(params);
            const result = transactions.data.sorted_transactions;
            setData(result);
            // console.log('Data retrieved');
            // If bank or month is selected
            if (selectedBank || selectedMonth || rangeSelected) {
                filter(result);
            } else {
                setAllTransactions(result);
            }
            return result;
        } catch (error) {
            console.log('Error retrieving transactions', error);
        }
    };


    // Filter by bank
    const filterByBank = useCallback((input) => {
        // If Bank is selected
        if (input && input.length > 0) {
            const bankTran = input.filter(tran => {
                return tran.account_details.institution_id === selectedBank.institution_id;
            });
            return bankTran;
        }
    }, [selectedBank]);

    // Filter by Month
    const filterByMonth = (input) => {
        // Mapping month format to numbers
        const monthMap = {
            Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
            Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12
        };

        // If month is selected 
        if (selectedMonth) {
            if (input && input.length > 0) {
                const month = selectedMonth.slice(0, 3);
                const year = selectedMonth.slice(4, 6);
                // console.log(monthMap[month], "Year", year);
                // console.log(input);

                const monthTran = input.filter(tran => {
                    const tranMonth = tran.authorized_date.slice(5, 7);
                    if (tranMonth < 10) tranMonth.slice(1,);
                    const tranYear = tran.authorized_date.slice(2, 4);
                    return tranMonth == monthMap[month] && tranYear === year;
                });

                // console.log(monthTran);
                return monthTran;
            }
        } else {
            return input;
        }
    };

    // Filter by range
    const filterByRange = (input) => {
        if (input && startDate && endDate) {
            const rangeFiltered = input.filter(tran => {
                // Convert transaction date string to Date objects
                const tranDate = new Date(tran.authorized_date);
                const startDateObj = new Date(startDate);
                const endDateObj = new Date(endDate);

                // Check if transaction date is within the date range
                return tranDate >= startDateObj && tranDate <= endDateObj;
            });
            return rangeFiltered;
        }
    };

    // Filter all
    const filter = (input) => {
        try {
            if (input && input.length > 0) {
                // Ignore running steps if there's no input for a certain step
                // Either month is selected or a custom range. They can't be selected together
                const rawData = JSON.parse(JSON.stringify(input));
                let filtered;

                if (selectedBank && selectedMonth && !rangeSelected) {
                    filtered = filterByMonth(filterByBank(rawData));
                } else if (selectedBank && !selectedMonth && rangeSelected) {
                    filtered = filterByRange(filterByBank(rawData));
                } else if (!selectedBank && !selectedMonth && rangeSelected) {
                    filtered = filterByRange(rawData);
                } else if (!selectedBank && selectedMonth && !rangeSelected) {
                    filtered = filterByMonth(rawData);
                } else if (selectedBank && !selectedMonth && !rangeSelected) {
                    filtered = filterByBank(rawData);
                } else if (!selectedBank && !selectedMonth && !rangeSelected) {
                    filtered = rawData;
                }
                return filtered;
                // console.log("Filter ran", filtered);
            }
        } catch (error) {
            console.log("Error occured filtering the transactions", error);
            // setFilterComplete(false);
        }
    };


    // If bank or month selected, filter the transactions
    // Filter is called 4 times, maybe optimize
    useEffect(() => {
        if (data) {
            // console.log('Filter data run');
            const filteredData = filter(data);
            setAllTransactions(filteredData);
        }
    }, [selectedBank, selectedMonth, rangeSubmitClear]);


    // Clear date range selection
    const handleClear = () => {
        localStorage.removeItem('startDate');
        localStorage.removeItem('endDate');
        setStartDate(null);
        setEndDate(null);
        setDateRangeMenu(false);
        setRangeSelected(false);
        setRangeSubmitClear(uuidv4());
    };


    // Close DateRange menu when mouse clicked somewhere else
    const handleOutsideClick = (e, filterRef) => {
        // console.log('Outside click');
        if (filterRef.current === (e.target)) {
            setDateRangeMenu(false);
            setBankMenu(false);
        }
    };


    // Calculate the month and year for the current iteration
    const formatDate = (input) => {
        const date = new Date(input);

        // Format the date to "Mar'24" format
        const formattedDate = date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: '2-digit',
        });

        return formattedDate;
    };

    // Create PDF's title
    const bank = selectedBank ? selectedBank.institution_name : '';
    const sMonth = selectedMonth ? selectedMonth : '';
    const dRange = rangeSelected ? formatDate(startDate) + " - " + formatDate(endDate) : '';
    const title = bank + " Transactions " + sMonth + dRange;

    // Export the pdf
    const handleExport = () => {
        // only if the data exists
        allTransactions && allTransactions.length > 0 && exportPDF(allTransactions, title);
        // console.log("Export run");
    };

    // Print the pdf
    const handlePrint = () => {
        // only if the data exists
        allTransactions && allTransactions.length > 0 && printPDF(allTransactions, title);
        // console.log("Print run");
    };


    return (
        <FilterContext.Provider value={{
            // States
            selectedMonth, setSelectedMonth, selectedBank, setSelectedBank, startDate, setStartDate,
            endDate, setEndDate, dateRangeMenu, setDateRangeMenu, rangeSelected, setRangeSelected,
            rangeSubmitClear, setRangeSubmitClear, transactionsLTD, setTransactionsLTD,
            bankMenu, setBankMenu, allTransactions, setAllTransactions, data, selectedTransaction, setSelectedTransaction,
            analyticsInput, setAnalyticsInput

            ,
            // Functions
            handleOutsideClick, formatDate, handleExport, handlePrint, retrieveTransactions, filter, handleClear, filterByBank
        }}>
            {props.children}
        </FilterContext.Provider>
    );
};

export { FilterContext, FilterProvider };