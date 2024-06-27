import { useState, useContext, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion as m } from 'framer-motion';
import { AuthContext } from "../context/auth.context";
import LinkLayout from "./LinkLayout";
import { Sun, Moon, Menu, X } from 'lucide-react';
import ProfileMenu from "./ProfileMenu";


function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
    const { isLoggedIn } = useContext(AuthContext);
    const ref = useRef();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 900);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, isOpen]);

    // Toggle Navbar
    const toggleNav = () => {
        setIsOpen(!isOpen);
    };



    return (
        <div className="shadow-sm w-full border-box fixed top-0 left-0 z-[1000] text-black  bg-white dark:text-slate-300 dark:bg-slate-900">
            <div ref={ref} className="px-10 p-4 md:flex justify-between items-center">
                {/* Logo and brand */}
                <div className="flex items-center text-2xl cursor-pointer gap-2">
                    <Link to={'/'} className="font-bold">Fincipline</Link>
                </div>

                {/* Menu icon */}
                <div onClick={toggleNav} className="absolute right-8 top-4 cursor-pointer md:hidden">
                    {
                        isOpen ?
                            <X size='35' />
                            :
                            <Menu size='35' />
                    }
                </div>

                {/* Nav links */}
                <m.ul ref={ref}
                    initial={{ top: '-490px' }}
                    animate={{ top: isOpen ? '25px' : '-490px' }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className={`text-lg mt-4 md:mt-0 md:flex md:items-center md:pl-0 md:pb-0 pb-12 absolute md:static cursor-pointer 
                    md:z-auto z-[-1] left-0 w-full md:w-auto bg-white dark:bg-slate-900`}>
                    {
                        <>
                            <li className="font-semibold my-7 md:my-0 md:ml-8 flex justify-center" onClick={() => setIsOpen(false)}>
                                {/* <Link to={'/'}>Home</Link> */}
                                <LinkLayout href={"/"}>Home</LinkLayout>
                            </li>
                            {isLoggedIn &&
                                <>
                                    <li className="font-semibold my-7 md:my-0 md:ml-8 flex justify-center" onClick={() => setIsOpen(false)}>
                                        {/* <Link to={'/transactions'}>Transactions</Link> */}
                                        <LinkLayout href={'/transactions'}>Transactions</LinkLayout>
                                    </li>
                                    <li className="font-semibold my-7 md:my-0 md:ml-8 flex justify-center" onClick={() => setIsOpen(false)}>
                                        <LinkLayout href={'/analytics'}>Analytics</LinkLayout>
                                    </li>
                                </>
                            }
                            <li className="font-semibold my-7 md:my-0 md:ml-8 flex justify-center" onClick={() => setIsOpen(false)}>
                                {/* <Link to={'/about'}>About</Link> */}
                                <LinkLayout href={'/about'}>About</LinkLayout>
                            </li>
                            {isLoggedIn ?
                                <>
                                    <li className="mt-7 md:my-0 md:ml-8 py-1 rounded md:static w-full flex justify-center">
                                        {/* <UserMenu /> */}
                                        <ProfileMenu isMobile={isMobile} toggleNav={toggleNav} />
                                    </li>

                                </>

                                :
                                <>
                                    <li className="mt-7 md:my-0 md:ml-8 flex flex-col md:flex-row items-center md:justify-center" onClick={() => setIsOpen(false)}>
                                        <button className="btn py-1 my-1 border border-black text-black dark:border-white dark:text-white w-28 md:ml-8 rounded md:static">
                                            <Link to={'/login'}>Log In</Link>
                                        </button>
                                        <button className="btn py-1 my-1 border border-black bg-black dark:border-white dark:bg-white dark:text-black text-white w-28 md:ml-3 rounded md:static">
                                            <Link to={'/signup'}>Sign Up</Link>
                                        </button>
                                    </li>

                                </>
                            }
                        </>
                    }
                </m.ul>
            </div>
        </div>
    );
}

export default Navbar;
