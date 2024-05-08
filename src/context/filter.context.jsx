import { createContext, useState } from "react";


const FilterContext = createContext();

const FilterProvider = props => {
    const [selectedMonth, setSelectedMonth] = useState(() => null);
    const [selectedBank, setSelectedBank] = useState(() => null);
    const [startDate, setStartDate] = useState(() => null);
    const [endDate, setEndDate] = useState(() => null);
    const [dateRangeMenu, setDateRangeMenu] = useState(() => false);
    const [rangeSelected, setRangeSelected] = useState(() => false);


    return (
        <FilterContext.Provider value={{
            selectedMonth, setSelectedMonth, selectedBank, setSelectedBank, startDate, setStartDate,
            endDate, setEndDate, dateRangeMenu, setDateRangeMenu, rangeSelected, setRangeSelected
        }}>
            {props.children}
        </FilterContext.Provider>
    );
};

export { FilterContext, FilterProvider };