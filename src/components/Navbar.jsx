import { useState, useContext, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { easeOut, motion as m } from 'framer-motion';
import { ThemeContext } from "../context/theme.context";
import { AuthContext } from "../context/auth.context";
import UserMenu from "./UserMenu";
import LinkLayout from "./LinkLayout";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { isLoggedIn, logoutUser } = useContext(AuthContext);
    const ref = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);

    return (
        <div className="shadow-sm w-full border-box fixed top-0 left-0 z-[1000] text-black  bg-white dark:text-slate-300 dark:bg-slate-900">
            <div ref={ref} className="px-10 p-4 md:flex justify-between items-center">
                {/* Logo and brand */}
                <div className="flex items-center text-2xl cursor-pointer gap-2">
                    <Link to={'/'} className="font-bold">Fincipline</Link>
                </div>

                {/* Menu icon */}
                <div onClick={() => setIsOpen(!isOpen)} className="absolute right-8 top-4 cursor-pointer md:hidden">
                    {
                        isOpen ?
                            <i className="fa-solid fa-x fa-2x"></i>
                            :
                            <i className="fa-solid fa-bars-staggered fa-2x"></i>
                    }
                </div>

                {/* Nav links */}
                <ul ref={ref} className={`text-lg mt-4 md:mt-0 md:flex md:items-center md:pl-0 md:pb-0 pb-12 absolute md:static cursor-pointer 
                md:z-auto z-[-1] left-0 w-full md:w-auto transition-all duration-500 ease-out bg-white dark:bg-slate-900 ${isOpen ? 'top-12' : 'top-[-490px]'} `}>
                    {
                        <>
                            <li className="font-semibold my-7 md:my-0 md:ml-8 flex justify-center" onClick={() => setIsOpen(false)}>
                                {/* <Link to={'/'}>Home</Link> */}
                                <LinkLayout href={"/"}>Home</LinkLayout>
                            </li>
                            {isLoggedIn &&
                                <>
                                    <li className="font-semibold my-7 md:my-0 md:ml-8 flex justify-center" onClick={() => setIsOpen(false)}>
                                        {/* <Link to={'/accounts'}>Accounts</Link> */}
                                        <LinkLayout href={'/accounts'}>Accounts</LinkLayout>
                                    </li>
                                    <li className="font-semibold my-7 md:my-0 md:ml-8 flex justify-center" onClick={() => setIsOpen(false)}>
                                        {/* <Link to={'/transactions'}>Transactions</Link> */}
                                        <LinkLayout href={'/transactions'}>Transactions</LinkLayout>
                                    </li>
                                    <li className="font-semibold my-7 md:my-0 md:ml-8 flex justify-center" onClick={() => setIsOpen(false)}>
                                        {/* <Link to={'/accounts'}>Accounts</Link> */}
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
                                    <li className="mt-7 md:my-0 md:ml-8 flex justify-center py-1 w-[30px] rounded md:static">
                                        <UserMenu />
                                    </li>

                                </>

                                :
                                <>
                                    <li className="mt-7 md:my-0 md:ml-8 flex justify-center" onClick={() => setIsOpen(false)}>
                                        <button className="btn border border-black text-black dark:border-white dark:text-white py-1  w-28 md:ml-8 rounded md:static">
                                            <Link to={'/login'}>Log In</Link>
                                        </button>
                                        <button className="btn border border-black bg-black dark:border-white dark:bg-white dark:text-black text-white w-28  py-1 md:ml-3 rounded md:static">
                                            <Link to={'/signup'}>Sign Up</Link>
                                        </button>
                                    </li>

                                </>
                            }
                            <li className="my-7 md:my-0 md:ml-6 flex justify-center" onClick={() => setIsOpen(false)}>
                                <button onClick={toggleTheme}>
                                    {theme === "light" ?
                                        <i className="w-6 fa-solid fa-circle-half-stroke fa-xl" style={{ color: "#232323" }}></i>
                                        :
                                        <i className="w-6 fa-solid fa-lightbulb fa-xl" style={{ color: "#FFf995" }}></i>
                                    }
                                </button>
                            </li>
                        </>

                    }
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
