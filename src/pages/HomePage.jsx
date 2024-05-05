import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
// import { Link as ScrollLink } from 'react-scroll';
import { AuthContext } from '../context/auth.context';
import { FilterContext } from '../context/filter.context';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import PlaidLink from './PlaidLink';
import { v4 as uuidv4 } from 'uuid';
import Balance from '../components/Balance';
import Transactions from '../components/Transactions';


function HomePage() {
    const { isLoggedIn, user, setError, banks, bankReturned } = useContext(AuthContext);
    const { selectedBank } = useContext(FilterContext);
    const [open, setOpen] = useState(false);


    // Handle bank select
    const handleSelect = (bank) => {
        localStorage.setItem('currBank', JSON.stringify(bank));
    };


    return (
        <div className=' w-screen z-50 special-overflow-hidden'>
            <div className='h-2screen w-screen flex flex-col items-center'>
                {/* <GradientBackground /> */}
                <div className='h-screen w-screen flex flex-col justify-center items-center border-box z-50
                bg-gradient-to-r from-indigo-500 via-purple-500 to-white shadow-sm'>

                    <Balance currBank={selectedBank} />

                    {banks.length > 0 &&
                        <Menu style={{ zIndex: 50 }}>
                            <MenuButton onClick={() => setOpen(!open)}
                                className='text-lg'
                                px={4}
                                py={2}
                                m={4}
                                minW={'188px'}
                                transition='all 0.2s'
                                borderRadius='md'
                                borderWidth='1px'
                                _hover={{ bg: 'gray.400', color: '#0f172a' }}
                                _expanded={{ bg: 'gray.400', color: '#0f172a' }}
                                _focus={{ boxShadow: 'outline' }}
                            >
                                {selectedBank ?
                                    selectedBank.institution_name
                                    :
                                    <>
                                        Select your bank
                                    </>
                                }
                                {open ?
                                    <i className="fa-solid fa-x pl-2"></i>
                                    :
                                    <i className="fa-solid fa-chevron-down pl-2"></i>
                                }
                            </MenuButton>
                            <MenuList color="#0f172a" bg="gray.400" minW='188px'>
                                {banks.length > 0 && banks.map(bank => {
                                    return <MenuItem key={uuidv4()} bg="gray.400" _hover={{ bg: 'gray.500' }} onClick={() => handleSelect(bank)}>{bank.institution_name}</MenuItem>;
                                })}
                            </MenuList>
                        </Menu>
                    }

                    <PlaidLink />
                </div>
                <div className='h-screen w-screen flex flex-col justify-center items-center border-box pb-10 bg-black bg-opacity-5'>

                    <Transactions currBank={selectedBank} />

                    <div className='flex justify-center items-center mt-4'>
                        <Link to={'/transactions'}
                            className="p-2 py-[10px] my-4 mx-2 px-4 text-lg border rounded-md border-black dark:border-slate-300 hover:bg-neutral-700 hover:text-white
                            dark:hover:bg-white dark:hover:text-black  hover:border-transparent cursor-pointer">
                            See More
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
