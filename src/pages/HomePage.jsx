import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
// import { Link as ScrollLink } from 'react-scroll';
import { AuthContext } from '../context/auth.context';
import { FilterContext } from '../context/filter.context';
import { v4 as uuidv4 } from 'uuid';
import Balance from '../components/Balance';
import Transactions from '../components/Transactions';
import HomeBarChart from '../components/charts/HomeBarChart';


function HomePage() {
    const { setSelectedBank } = useContext(FilterContext);
    const [currBank, setCurrBank] = useState(null);


    // Retrieving current bank
    useEffect(() => {
        const savedBank = localStorage.getItem('currBank');
        if (savedBank) {
            setCurrBank(JSON.parse(savedBank));
            setSelectedBank(JSON.parse(savedBank));
        }
    }, []);


    return (
        <div className=' w-screen special-overflow-hidden'>
            <div className='h-3screen w-screen flex flex-col items-center'>
                {/* <GradientBackground /> */}
                <div className='h-screen w-screen flex flex-col justify-center items-center border-box shadow-sm'>
                    {/* Balance section */}
                    <Balance currBank={currBank} setCurrBank={setCurrBank}  />
                </div>
                <div className='h-screen w-screen flex flex-col justify-center items-center border-box pb-10 bg-black bg-opacity-5'>
                    {/* Showing recent transactions */}
                    <Transactions currBank={currBank} />
                </div>
                <div className='h-screen w-screen flex flex-col justify-center items-center border-box shadow-sm'>
                    {/* Last 30 days analytics */}
                    <HomeBarChart currBank={currBank} />
                </div>
            </div>
        </div>
    );
}

export default HomePage;
