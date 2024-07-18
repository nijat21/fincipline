import { v4 as uuidv4 } from 'uuid';
import { motion as m } from 'framer-motion';
import { useState, useEffect, useContext } from 'react';
import { FilterContext } from '../context/filter.context';
import { AuthContext } from '../context/auth.context';
import DateRangeForm from './DateRange';

function Filters() {
    const { selectedMonth, setSelectedMonth, selectedBank, setSelectedBank, dateRangeMenu, setDateRangeMenu,
        startDate, endDate, bankMenu, setBankMenu
        ,
        formatDate, handleClear
    } = useContext(FilterContext);
    const { banks } = useContext(AuthContext);


    // If there's a bank and/or month selected
    useEffect(() => {
        // retrieve the saved Bank
        const savedBank = localStorage.getItem('currBank');
        if (savedBank) {
            setSelectedBank(JSON.parse(savedBank));
        }
        // retrieve the saved Month
        const savedMonth = localStorage.getItem('selectedMonth');
        if (savedMonth) {
            setSelectedMonth((savedMonth));
        }
    }, []);

    // Handle month selection 
    const handleMonthSelection = (date) => {
        if (date === selectedMonth) {
            setSelectedMonth(null);
            localStorage.removeItem('selectedMonth');
        } else {
            setSelectedMonth(date);
            localStorage.setItem('selectedMonth', (date));
            handleClear();
        }
    };

    // Date range menu toggle
    const toggleRangeMenu = (e) => {
        e.preventDefault();
        setDateRangeMenu(!dateRangeMenu);
        if (bankMenu) {
            setBankMenu(!bankMenu);
        }
    };

    // Handle range selection 
    const handleRangeClick = (e) => {
        e.preventDefault();
        toggleRangeMenu(e);
        // setSelectedMonth('custom');
        setSelectedMonth(null);
        localStorage.removeItem('selectedMonth');
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
        localStorage.setItem('currBank', JSON.stringify(bank));
        setSelectedBank(bank);
    };

    // Handle clear selection
    const clearBankSelection = () => {
        setSelectedBank(null);
        localStorage.removeItem('currBank');
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
        <>
            <div className='w-[90%] h-20 mb-2 md:w-9/12 overflow-x-auto whitespace-nowrap overflow-y-hidden md:overflow-hidden flex items-center justify-center relative'>
                <ul className="list-none flex justify-center">
                    {/* Bank */}
                    <li className={`w-40 h-8 flex justify-center items-center mx-1 my-4 border rounded-md border-black dark:border-slate-300 hover:bg-neutral-700 hover:text-white
                dark:hover:bg-white dark:hover:text-black  hover:border-transparent cursor-pointer  
                ${bankMenu && "bg-neutral-700 text-white border-black dark:bg-white dark:text-black dark:border-transparent"} `}
                    >
                        <button onClick={toggleBankMenu}>
                            {selectedBank ? selectedBank.institution_name : 'Banks'}
                            {bankMenu ?
                                <i className="fa-solid fa-chevron-up  p-1"></i>
                                :
                                <i className="fa-solid fa-chevron-down p-1"></i>
                            }
                        </button>
                    </li>

                    {/* Months */}
                    {formattedDates.map(date => {
                        return (
                            <li className={`${date === selectedMonth && !dateRangeMenu && "bg-neutral-700 text-white border-black dark:bg-white dark:text-black dark:border-transparent"} 
                        w-16 h-8 flex justify-center items-center mx-1 my-4 border rounded-md border-black dark:border-slate-300 hover:bg-neutral-700 hover:text-white
                        dark:hover:bg-white dark:hover:text-black  hover:border-transparent cursor-pointer`}
                                key={uuidv4()}>
                                <button onClick={() => handleMonthSelection(date)}>{date}</button>
                            </li>);
                    })}

                    {/* Date range */}
                    <li className={`w-36 h-8 flex justify-center items-center mx-1 my-4 border rounded-md border-black dark:border-white hover:bg-neutral-700 hover:text-white
                dark:hover:bg-white dark:hover:text-black  hover:border-transparent cursor-pointer  ${dateRangeMenu && "bg-neutral-700 text-white border-black dark:bg-white dark:text-black dark:border-transparent"} `}>
                        <button onClick={(e) => handleRangeClick(e)}>
                            {startDate && endDate ?
                                formatDate(startDate) + '  -  ' + formatDate(endDate)
                                :
                                <>
                                    Custom range
                                </>
                            }
                            {dateRangeMenu ?
                                <i className="fa-solid fa-chevron-up  p-1"></i>
                                :
                                <i className="fa-solid fa-chevron-down p-1"></i>
                            }
                        </button>
                    </li>
                </ul>

            </div>
            <div className='relative w-[90%] md:w-9/12'>
                {/* Logic for DateRangeMenu and BankMenu */}
                <m.div className='relative'>
                    {dateRangeMenu &&
                        <div className='h-48 z-[99] text-white rounded-md bg-neutral-700 dark:bg-blue-800 flex justify-center 
                    absolute w-auto top-[-20px] right-1 md:right-3 shadow-lg'>
                            <DateRangeForm />
                        </div>
                    }
                </m.div>
                {bankMenu &&
                    <m.div
                        className='z-50 mb-4 h-28 w-40 text-white pl-4 rounded-md flex items-center
                            bg-neutral-700 dark:bg-blue-800 absolute top-[-20px] left-1 md:left-3'>
                        <ul className='list-none'>
                            {banks.length > 0 && banks.map(bank => {
                                return <li key={uuidv4()} className='hover:border-b border-white'>
                                    <button onClick={() => handleBankSelect(bank)}>{bank.institution_name}</button>
                                </li>;
                            })}
                            <li className=''>
                                <button className='hover:border-b border-white' onClick={() => clearBankSelection()}>All</button>
                            </li>
                        </ul>
                    </m.div>
                }
            </div>
        </>
    );
}

export default Filters;
