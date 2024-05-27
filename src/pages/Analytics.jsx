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
    const { data, selectedBank, selectedMonth, rangeSubmitClear
        ,
        // Functions
        handleOutsideClick, retrieveTransactions, filter
    } = useContext(FilterContext);
    const { user } = useContext(AuthContext);



    // Once user is available, load all transactions
    useEffect(() => {
        // console.log(user);
        retrieveTransactions(user._id);
    }, []);


    // If bank or month selected, filter the transactions
    // Filter is called 4 times, maybe optimize
    useEffect(() => {
        filter(data);
    }, [selectedBank, selectedMonth, rangeSubmitClear]);


    return (
        <div className="h-screen w-screen flex flex-col justify-start items-center box-border pb-10"
            ref={analyticsRef} onClick={(e) => handleOutsideClick(e, analyticsRef)}>
            <h1 className="text-3xl pt-10 pb-4 text-center">Analytics</h1>
            <div className='w-full h-full flex flex-col items-center' ref={analyticsRef2} onClick={(e) => handleOutsideClick(e, analyticsRef2)}>
                <Filters />
                <div className='w-4/5 h-1/2 flex mt-4'>
                    <AreaChartAnalytics />
                </div>
                <div className='w-4/5 h-1/2 flex mt-2'>
                    <BarChartAnalytics />
                    <LineChartAnalytics />
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