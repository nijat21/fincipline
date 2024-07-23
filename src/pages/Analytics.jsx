import { useNavigate } from 'react-router-dom';
import { useContext, useRef, useEffect, useState } from 'react';
import Filters from '../components/Filters';
import AreaChartAnalytics from '@/components/charts/AreaChartAnalytics';
import BarChartAnalytics from '@/components/charts/BarChartAnalytics';
import LineChartAnalytics from '@/components/charts/LineChartAnalytics';
import { FilterContext } from '@/context/filter.context';
import { AuthContext } from '@/context/auth.context';
import { motion as m, AnimatePresence } from 'framer-motion';


function Analytics() {
    const navigate = useNavigate();
    const analyticsRef = useRef();
    const analyticsRef2 = useRef();
    const { data, selectedBank,
        // Functions
        handleOutsideClick, retrieveTransactions, filterByBank, setAnalyticsInput } = useContext(FilterContext);
    const { user } = useContext(AuthContext);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

    // Check if the app is in mobile screen
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 900);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    // Once user is available, load all transactions
    useEffect(() => {
        if (user && user._id) {
            retrieveTransactions(user._id);
            // console.log('Retrieve in analytics');
        }
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
            const result = selectedBank ? filterByBank(data) : data;
            setAnalyticsInput(result);
        }
    }, [data, filterByBank, setAnalyticsInput, selectedBank]);


    return (
        <AnimatePresence>
            <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
                className="min-h-screen md:h-screen w-screen flex flex-col justify-start items-center"
                ref={analyticsRef} onClick={(e) => handleOutsideClick(e, analyticsRef)}>
                <h3 className="pt-10 pb-4 text-center">Analytics</h3>

                <Filters />

                <div className='w-full h-full flex flex-col items-center justify-center'
                    ref={analyticsRef2}
                    onClick={(e) => handleOutsideClick(e, analyticsRef2)}
                >
                    <div className='w-full h-full flex flex-col items-center pb-4 bg-black bg-opacity-40 md:bg-transparent'>
                        <div className='w-[90%] md:w-[80%] h-48 md:h-1/2 flex mt-4 md:mt-0'>
                            <AreaChartAnalytics formatDate={formatDate} parseMonthSelected={parseMonthSelected} isMobile={isMobile} />
                        </div>
                        <div className='w-[90%] md:w-[80%] h-[25.5rem] md:h-1/2  flex mt-6 md:mt-2 flex-col md:flex-row gap-6 md:gap-0'>
                            <BarChartAnalytics formatDate={formatDate} parseMonthSelected={parseMonthSelected} isMobile={isMobile} />
                            <LineChartAnalytics formatDate={formatDate} parseMonthSelected={parseMonthSelected} isMobile={isMobile} />
                        </div>
                        <button onClick={() => navigate(-1)}
                            className="py-[3px] px-2 my-4 md:my-10 border rounded-md border-black dark:border-slate-300 hover:bg-neutral-700 hover:text-white
                    dark:hover:bg-white dark:hover:text-black  hover:border-transparent cursor-pointer bg-white dark:bg-[#001152] md:bg-transparent">
                            Back
                        </button>
                    </div>
                </div>
            </m.div>
        </AnimatePresence>
    );
}

export default Analytics;
