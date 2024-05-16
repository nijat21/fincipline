import { createContext, useEffect, useState } from "react";
import { exportPDF, printPDF } from '../components/PDF';


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
    const [rangeSubmitClear, setRangeSubmitClear] = useState(0);
    // Data
    const [transactionsLTD, setTransactionsLTD] = useState(null);
    const [allTransactions, setAllTransactions] = useState(null);

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
            selectedMonth, setSelectedMonth, selectedBank, setSelectedBank, startDate, setStartDate,
            endDate, setEndDate, dateRangeMenu, setDateRangeMenu, rangeSelected, setRangeSelected,
            rangeSubmitClear, setRangeSubmitClear, transactionsLTD, setTransactionsLTD,
            bankMenu, setBankMenu, allTransactions, setAllTransactions,

            handleOutsideClick, formatDate, handleExport, handlePrint
        }}>
            {props.children}
        </FilterContext.Provider>
    );
};

export { FilterContext, FilterProvider };