import { useState, useEffect, useContext } from 'react';
// import { Link as ScrollLink } from 'react-scroll';
import { AuthContext } from '../context/auth.context';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
} from '@chakra-ui/react';
import Ad from '../components/Ad';
import PlaidLink from './PlaidLink';


function HomePage() {
    const { isLoggedIn, isLoading, user, setError, banks } = useContext(AuthContext);
    const [currBank, setCurrBank] = useState('');


    return (
        <div className='h-screen w-screen '>
            {isLoading ?
                <p>Loading...</p>
                :
                (!isLoggedIn ?
                    <Ad />
                    :
                    <div className='h-screen w-screen flex flex-col items-center'>
                        <div className='h-1/2 w-2/7 flex flex-col justify-end align-center border-box'>
                            <div className='h-1/3 flex flex-col justify-start'>
                                <h1 className='text-5xl text-center'>Accounts</h1>
                            </div>
                            <div className='h-1/5 text-2xl'>
                                Balance:
                            </div>
                            <Menu>
                                <MenuButton
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
                                    {currBank ?
                                        currBank
                                        :
                                        <>
                                            Select your bank <i class="fa-solid fa-chevron-down"></i>
                                        </>
                                    }
                                </MenuButton>
                                <MenuList color="#0f172a" bg="gray.400" minW='188px'>
                                    {banks.map(bank => {
                                        return <MenuItem bg="gray.400" _hover={{ bg: 'gray.500' }} onClick={() => setCurrBank(bank.institution_name)}>{bank.institution_name}</MenuItem>;
                                    })}
                                </MenuList>
                            </Menu>
                        </div>
                        <div className='h-1/2 flex flex-col justify-end border-box pb-10'>
                            <PlaidLink />
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default HomePage;
