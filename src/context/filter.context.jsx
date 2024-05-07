import { createContext, useState, useEffect } from "react";


const FilterContext = createContext();

const FilterProvider = props => {
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedBank, setSelectedBank] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dateRangeMenu, setDateRangeMenu] = useState(false);


    // // If there's a bank and/or month selected
    // useEffect(() => {
    //     // retrieve the saved Bank
    //     const savedBank = localStorage.getItem('currBank');
    //     if (savedBank) {
    //         setSelectedBank(JSON.parse(savedBank));
    //     }
    //     // retrieve the saved Month
    //     const savedMonth = localStorage.getItem('selectedMonth');
    //     if (savedMonth) {
    //         setSelectedMonth((savedMonth));
    //     }
    // }, []);

    return (
        <FilterContext.Provider value={{
            selectedMonth, setSelectedMonth, selectedBank, setSelectedBank, startDate, setStartDate,
            endDate, setEndDate, dateRangeMenu, setDateRangeMenu
        }}>
            {props.children}
        </FilterContext.Provider>
    );
};

export { FilterContext, FilterProvider };