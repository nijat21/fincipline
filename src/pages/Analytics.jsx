import { useNavigate } from 'react-router-dom';
import Filters from '../components/Filters';
import AreaChartAnalytics from '@/components/charts/AreaChartAnalytics';
import BarChartAnalytics from '@/components/charts/BarChartAnalytics';
import LineChartAnalytics from '@/components/charts/LineChartAnalytics';
import { useContext, useRef } from 'react';
import { FilterContext } from '@/context/filter.context';


function Analytics() {
    const navigate = useNavigate();
    const analyticsRef = useRef();
    const analyticsRef2 = useRef();
    const { handleOutsideClick } = useContext(FilterContext);

    return (
        <div className="h-screen w-screen flex flex-col justify-start items-center box-border pb-10"
            ref={analyticsRef} onClick={(e) => handleOutsideClick(e, analyticsRef)}>
            <h1 className="text-3xl pt-10 pb-4 text-center">Analytics</h1>
            <div className='w-full h-full flex flex-col items-center' ref={analyticsRef2} onClick={(e) => handleOutsideClick(e, analyticsRef2)}>
                <Filters />
                <div className='w-4/5 h-1/2 flex mt-10'>
                    <AreaChartAnalytics />
                </div>
                <div className='w-4/5 h-1/2 flex mt-10'>
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
