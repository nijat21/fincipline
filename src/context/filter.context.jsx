import { createContext, useState, useEffect } from "react";


const FilterContext = createContext();

const FilterProvider = props => {
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [savedMonth, setSavedMonth] = useState(null);
    const [selectedBank, setSelectedBank] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dateRangeMenu, setDateRangeMenu] = useState(false);

    // Retrieving current bank from local storage
    useEffect(() => {
        const savedBank = localStorage.getItem('currBank');
        if (savedBank) {
            setSelectedBank(JSON.parse(savedBank));
        }
        const savedM = localStorage.getItem('selectedMonth');
        if (savedM) {
            setSavedMonth(JSON.parse(savedM));
        }
    }, []);

    // Retrieving current bank from local storage
    useEffect(() => {
        localStorage.setItem('selectedMonth', JSON.stringify(selectedMonth));
        const savedM = localStorage.getItem('selectedMonth');
        setSavedMonth(JSON.parse(savedM));
    }, [selectedMonth]);

    return (
        <FilterContext.Provider value={{
            selectedMonth, setSelectedMonth, selectedBank, setSelectedBank, startDate, setStartDate,
            endDate, setEndDate, dateRangeMenu, setDateRangeMenu, savedMonth, setSavedMonth
        }}>
            {props.children}
        </FilterContext.Provider>
    );
};

export { FilterContext, FilterProvider };