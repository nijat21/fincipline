import { useState, useEffect, useContext } from 'react';
import { FilterContext } from '../context/filter.context';
import Balance from '../components/Balance';
import Transactions from '../components/Transactions';
import HomeBarChart from '../components/charts/HomeBarChart';
import HomeAreaChart from '@/components/charts/HomeAreaChart';
import { motion as m, AnimatePresence } from 'framer-motion';
import Section from '@/components/Section';

function HomePage() {
    const { setSelectedBank, currBank, setCurrBank } = useContext(FilterContext);
    const { isMobile } = useContext(FilterContext);


    // Retrieving current bank
    useEffect(() => {
        const savedBank = localStorage.getItem('currBank');
        if (savedBank) {
            setCurrBank(JSON.parse(savedBank));
            setSelectedBank(JSON.parse(savedBank));
        }
    }, []);


    return (
        <AnimatePresence>
            <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
                className='w-screen special-overflow-hidden'>
                <div className='max-h-2screen md:h-4screen w-screen flex flex-col items-center'>
                    {/* <GradientBackground /> */}
                    <div className='md:h-screen w-screen flex flex-col justify-center items-center border-box shadow-md border-b border-zinc-200 dark:border-slate-900'>
                        {/* <div className='h-3/4 flex flex-col justify-center items-center border-box'> */}
                        {/* Balance section */}
                        <Balance />
                        {/* </div> */}
                    </div>
                    <Section>
                        <div className='bg-black bg-opacity-40 md:bg-transparent md:h-screen w-screen flex flex-col justify-center items-center border-box py-4'>
                            {/* Last 30 days analytics */}
                            <HomeAreaChart currBank={currBank} isMobile={isMobile} />
                        </div>
                    </Section>
                    <Section>
                        <div className='bg-black bg-opacity-40 md:bg-transparent md:h-screen w-screen flex flex-col justify-center items-center border-box pb-4'>
                            {/* Showing recent transactions */}
                            <Transactions isMobile={isMobile} />
                        </div>
                    </Section>
                    <Section>
                        <div className='bg-black bg-opacity-40 md:bg-transparent md:h-screen w-screen flex flex-col justify-center items-center border-box pb-10'>
                            {/* Last 30 days analytics */}
                            <HomeBarChart currBank={currBank} isMobile={isMobile} />
                        </div>
                    </Section>
                </div>
            </m.div>
        </AnimatePresence>
    );
}

export default HomePage;
