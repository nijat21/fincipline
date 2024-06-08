import { useNavigate } from 'react-router-dom';
import Filters from '../components/Filters';
import AreaChartAnalytics from '@/components/charts/AreaChartAnalytics';
import BarChartAnalytics from '@/components/charts/BarChartAnalytics';
import LineChartAnalytics from '@/components/charts/LineChartAnalytics';
import { useContext, useRef, useEffect } from 'react';
import { FilterContext } from '@/context/filter.context';
import { AuthContext } from '@/context/auth.context';


function Analytics() {
    const navigate = useNavigate();
    const analyticsRef = useRef();
    const analyticsRef2 = useRef();
    const { data, selectedBank, selectedMonth, rangeSubmitClear, setAnalyticsInput
        ,
        // Functions
        handleOutsideClick, retrieveTransactions, filter, filterByBank,
    } = useContext(FilterContext);
    const { user } = useContext(AuthContext);



    // Once user is available, load all transactions
    useEffect(() => {
        retrieveTransactions(user._id);
        // console.log('Retrieve transactions run');
    }, []);

    // Format date
    const formatDate = ((input) => input.toLocaleDateString('en-US', { month: 'short', year: "2-digit" }));

    // Function to parse monthSelectedInFilter in "MMM 'YY" format
    const parseMonthSelected = (dateStr) => {
        const [month, year] = dateStr.split(' ');
        const monthIndex = new Date(Date.parse(month + " 1, 2020")).getMonth();
        const fullYear = `20${year}`;
        return new Date(fullYear, monthIndex);
    };


    // Filter by bank when loaded and bank changes
    useEffect(() => {
        if (data) {
            // console.log('Filter by bank');
            if (selectedBank) {
                const result = filterByBank(data);
                setAnalyticsInput(result);
            } else {
                setAnalyticsInput(data);
            }
        }
    }, [selectedBank, data]);


    return (
        <div className="h-screen w-screen flex flex-col justify-start items-center box-border pb-10"
            ref={analyticsRef} onClick={(e) => handleOutsideClick(e, analyticsRef)}>
            <h1 className="text-3xl pt-10 pb-4 text-center">Analytics</h1>
            <div className='w-full h-full flex flex-col items-center' ref={analyticsRef2} onClick={(e) => handleOutsideClick(e, analyticsRef2)}>
                <Filters />
                <div className='w-4/5 h-1/2 flex mt-4'>
                    <AreaChartAnalytics formatDate={formatDate} parseMonthSelected={parseMonthSelected} />
                </div>
                <div className='w-4/5 h-1/2 flex mt-2'>
                    <BarChartAnalytics formatDate={formatDate} parseMonthSelected={parseMonthSelected} />
                    <LineChartAnalytics formatDate={formatDate} parseMonthSelected={parseMonthSelected} />
                </div>
            </div>
            <div className="flex justify-end">
                <button onClick={() => navigate(-1)}
                    className="p-2 px-4 m-10 border rounded-md border-black dark:border-slate-300 hover:bg-neutral-700 hover:text-white
                    dark:hover:bg-white dark:hover:text-black  hover:border-transparent cursor-pointer">
                    Back
                </button>
            </div>
        </div>
    );
}

export default Analytics;
