import { useState, useContext } from 'react';
import { FilterContext } from '../context/filter.context';

function DateRangeForm() {
    const { startDate, setStartDate, endDate, setEndDate, dateRangeMenu, setDateRangeMenu, setSelectedMonth, setRangeSelected } = useContext(FilterContext);
    const [errorMessage, setErrorMessage] = useState('');


    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!startDate && !endDate) {
            setErrorMessage('Please select at least one of the dates');
        } else if (!startDate) {
            const earliestDate = new Date(0); // January 1, 1970
            setStartDate(earliestDate);
            setRangeSelected(true);
        } else if (!endDate) {
            const currentDate = new Date();
            setEndDate(currentDate);
            setRangeSelected(true);
        }
        else {
            setRangeSelected(true);
            setDateRangeMenu(false);
            setSelectedMonth(null);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center text-lg">
            <div className='flex'>
                <div className='flex flex-col items-center mx-2'>
                    <label htmlFor="startDate" className="mt-4 mb-2 font-semibold">Start date</label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={handleStartDateChange}
                        className="border rounded-md p-1 text-black"
                    />
                </div>
                <div className='flex flex-col items-center mx-2  font-semibold'>
                    <label htmlFor="endDate" className="mt-4 mb-2">End date</label>
                    <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        onChange={handleEndDateChange}
                        className="border rounded-md p-1 text-black"
                    />
                </div>
            </div>
            <button type="submit" className="px-2 py-1 mx-1 mt-4 mb-2 border rounded-md border-black dark:border-slate-300 hover:bg-neutral-700 hover:text-white
            dark:hover:bg-white dark:hover:text-black  hover:border-transparent cursor-pointer">
                Submit
            </button>
            <p className=''>{errorMessage}</p>
        </form>
    );
}

export default DateRangeForm;;
