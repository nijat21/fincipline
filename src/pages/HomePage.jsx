import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
// import { Link as ScrollLink } from 'react-scroll';
import { AuthContext } from '../context/auth.context';
import { FilterContext } from '../context/filter.context';
import { v4 as uuidv4 } from 'uuid';
import Balance from '../components/Balance';
import Transactions from '../components/Transactions';
import HomeBarChart from '../components/charts/HomeBarChart';
import HomeAreaChart from '@/components/charts/HomeAreaChart';


function HomePage() {
    const { setSelectedBank } = useContext(FilterContext);
    const { currBank, setCurrBank } = useContext(FilterContext);
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


    // Retrieving current bank
    useEffect(() => {
        const savedBank = localStorage.getItem('currBank');
        if (savedBank) {
            setCurrBank(JSON.parse(savedBank));
            setSelectedBank(JSON.parse(savedBank));
        }
    }, []);


    return (
        <div className='w-screen special-overflow-hidden'>
            <div className='max-h-2screen md:h-4screen w-screen flex flex-col items-center'>
                {/* <GradientBackground /> */}
                <div className='md:h-screen w-screen flex flex-col justify-center items-center border-box shadow-md border-b border-zinc-200 dark:border-slate-900'>
                    {/* <div className='h-3/4 flex flex-col justify-center items-center border-box'> */}
                    {/* Balance section */}
                    <Balance />
                    {/* </div> */}
                </div>
                <div className='bg-black bg-opacity-40 md:bg-transparent md:h-screen w-screen flex flex-col justify-center items-center border-box py-4'>
                    {/* Last 30 days analytics */}
                    <HomeAreaChart currBank={currBank} isMobile={isMobile} />
                </div>
                <div className='bg-black bg-opacity-40 md:bg-transparent md:h-screen w-screen flex flex-col justify-center items-center border-box pb-4'>
                    {/* Showing recent transactions */}
                    <Transactions isMobile={isMobile} />
                </div>
                <div className='bg-black bg-opacity-40 md:bg-transparent md:h-screen w-screen flex flex-col justify-center items-center border-box pb-10'>
                    {/* Last 30 days analytics */}
                    <HomeBarChart currBank={currBank} isMobile={isMobile} />
                </div>
            </div>
        </div>
    );
}

export default HomePage;
