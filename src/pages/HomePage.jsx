import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
// import { Link as ScrollLink } from 'react-scroll';
import { AuthContext } from '../context/auth.context';
import { FilterContext } from '../context/filter.context';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import PlaidLink from './PlaidLink';
import { v4 as uuidv4 } from 'uuid';
import Balance from '../components/Balance';
import Transactions from '../components/Transactions';
import HomeBarChart from '../components/charts/HomeBarChart';


function HomePage() {
    const { banks } = useContext(AuthContext);
    const { setSelectedBank } = useContext(FilterContext);
    const [currBank, setCurrBank] = useState(null);


    // Handle bank select
    const handleSelect = (value) => {
        // Find the selected bank object based on the value
        const selectedBank = banks.find(bank => bank.institution_name === value);
        if (selectedBank) {
            localStorage.setItem('currBank', JSON.stringify(selectedBank));
            setCurrBank(selectedBank);
            setSelectedBank(selectedBank);
            console.log(selectedBank);
        }
    };

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
                    <Balance currBank={currBank} />
                    {/* Bank selection drop-down */}
                    {banks && banks.length > 0 &&
                        <div className='w-[188px] flex justify-center py-2'>
                            <Select onValueChange={(value) => handleSelect(value)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder={currBank ?
                                        currBank.institution_name
                                        :
                                        <>
                                            Select your bank
                                        </>
                                    } />
                                </SelectTrigger>
                                <SelectContent>
                                    {banks.length > 0 && banks.map(bank => {
                                        return (
                                            <SelectItem key={uuidv4()} value={bank.institution_name}>
                                                {bank.institution_name}
                                            </SelectItem>
                                        );
                                    })}

                                </SelectContent>
                            </Select>
                        </div>
                    }
                    {/* Adding new bank account */}
                    <PlaidLink />
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
