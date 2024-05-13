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
import Ad from '../components/Ad';
import PlaidLink from './PlaidLink';
import { v4 as uuidv4 } from 'uuid';
import Balance from '../components/Balance';
import Transactions from '../components/Transactions';
import Analytics from '../components/Analytics';


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

                    {banks.length > 0 &&
                        <Select onValueChange={(value) => handleSelect(value)} className='w-[180px]'>
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
                    }

                    <PlaidLink />
                </div>
                <div className='h-screen w-screen flex flex-col justify-center items-center border-box pb-10 bg-black bg-opacity-5'>

                    <Transactions currBank={currBank} />

                    <div className='flex justify-center items-center mt-4'>
                        <Link to={'/transactions'}
                            className="p-2 py-[10px] my-4 mx-2 px-4 text-lg border rounded-md border-black dark:border-slate-300 hover:bg-neutral-700 hover:text-white
                            dark:hover:bg-white dark:hover:text-black  hover:border-transparent cursor-pointer">
                            See More
                        </Link>
                    </div>
                </div>
                <div className='h-screen w-screen flex flex-col justify-center items-center border-box shadow-sm'>
                    <Analytics currBank={currBank} />
                </div>
            </div>
        </div>
    );
}

export default HomePage;
