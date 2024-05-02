import { v4 as uuidv4 } from 'uuid';
import { motion as m } from 'framer-motion';
import { useState, useEffect, useContext } from 'react';
import { FilterContext } from '../context/filter.context';
import { AuthContext } from '../context/auth.context';
import DateRangeForm from './DateRange';

function Filters() {
    const { selectedMonth, setSelectedMonth, selectedBank, setSelectedBank, dateRangeMenu, setDateRangeMenu } = useContext(FilterContext);
    const { banks } = useContext(AuthContext);
    const [bankMenu, setBankMenu] = useState(false);

    // Handle month selection 
    const handleMonthSelection = (date) => {
        if (date === selectedMonth) {
            setSelectedMonth(null);
        } else {
            setSelectedMonth(date);
        }
    };

    // Date range menu toggle
    const toggleRangeMenu = () => {
        setDateRangeMenu(!dateRangeMenu);
        if (bankMenu) {
            setBankMenu(!bankMenu);
        }
    };

    // Handle range selection 
    const handleRangeClick = (e) => {
        e.preventDefault();
        toggleRangeMenu();
        setSelectedMonth('custom');
    };

    // Toggle bank menu
    const toggleBankMenu = () => {
        setBankMenu(!bankMenu);
        if (dateRangeMenu) {
            setDateRangeMenu(!dateRangeMenu);
        }
    };

    // Handle bank selection 
    const handleBankSelect = (bank) => {
        toggleBankMenu();
        setSelectedBank(bank);
    };

    // Handle clear selection
    const clearBankSelection = () => {
        setSelectedBank(null);
        toggleBankMenu();
    };

    // Format the current date to "Mar'24" format
    const currentDate = new Date();
    const formattedDates = [];

    // Loop to generate 6 months of formatted dates
    for (let i = 5; i >= 0; i--) {
        // Calculate the month and year for the current iteration
        const month = currentDate.getMonth() - i;
        const year = currentDate.getFullYear();
        const date = new Date(year, month + 1, 0);

        // Format the date to "Mar'24" format
        const formattedDate = date.toLocaleDateString('en-US', {
            month: 'short',
            year: '2-digit',
        });
        formattedDates.push(formattedDate);
    }

    return (
        <div>
            <ul className="list-none flex justify-center">
                <li className={`px-2 py-1 mx-1 my-4 border rounded-md border-black dark:border-slate-300 hover:bg-neutral-700 hover:text-white
            dark:hover:bg-white dark:hover:text-black  hover:border-transparent cursor-pointer  ${bankMenu && "bg-neutral-700 text-white border-black dark:bg-white dark:text-black dark:border-transparent"} `}>
                    <button onClick={toggleBankMenu}>
                        {selectedBank ? selectedBank.institution_name : 'Banks'}
                        {bankMenu ?
                            <i className="fa-solid fa-chevron-up  p-1"></i>
                            :
                            <i className="fa-solid fa-chevron-down p-1"></i>
                        }
                    </button>
                </li>
                {formattedDates.map(date => {
                    return (
                        <li className={`${date === selectedMonth && !dateRangeMenu && "bg-neutral-700 text-white border-black dark:bg-white dark:text-black dark:border-transparent"} 
                    px-2 py-1 mx-1 my-4 border rounded-md border-black dark:border-slate-300 hover:bg-neutral-700 hover:text-white
                    dark:hover:bg-white dark:hover:text-black  hover:border-transparent cursor-pointer`}
                            key={uuidv4()}>
                            <button onClick={() => handleMonthSelection(date)}>{date}</button>
                        </li>);
                })}
                <li className={`px-2 py-1 mx-1 my-4 border rounded-md border-black dark:border-slate-300 hover:bg-neutral-700 hover:text-white
            dark:hover:bg-white dark:hover:text-black  hover:border-transparent cursor-pointer  ${dateRangeMenu && "bg-neutral-700 text-white border-black dark:bg-white dark:text-black dark:border-transparent"} `}>
                    <button onClick={(e) => handleRangeClick(e)}>
                        Custom
                        {dateRangeMenu ?
                            <i className="fa-solid fa-chevron-up  p-1"></i>
                            :
                            <i className="fa-solid fa-chevron-down p-1"></i>
                        }
                    </button>
                </li>
            </ul>
            {dateRangeMenu &&
                <div className='h-48 z-50 mb-4 text-lg rounded-md bg-black bg-opacity-30 flex justify-center'>
                    <DateRangeForm />
                </div>
            }
            {bankMenu &&
                <m.div
                    className='z-50 mb-4 h-28 w-40 text-lg pl-4 border-black dark:border-slate-300 rounded-md bg-black bg-opacity-30 flex items-center'>
                    <ul className='list-none'>
                        {banks.length > 0 && banks.map(bank => {
                            return <li key={uuidv4()} className='hover:border-b'>
                                <button onClick={() => handleBankSelect(bank)}>{bank.institution_name}</button>
                            </li>;
                        })}
                        <li className=''>
                            <button className='hover:border-b' onClick={() => clearBankSelection()}>All</button>
                        </li>
                    </ul>
                </m.div>
            }
        </div>
    );
}

export default Filters;
