import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion as m } from 'framer-motion';
import { AuthContext } from "../context/auth.context";

function UserMenu() {

    return (
        <div>
            <FlyoutLink href="#" FlyoutContent={userContent}>
                <i className="fa-regular fa-user fa-xl"></i>
            </FlyoutLink>
        </div>
    );
}

const FlyoutLink = ({ children, href, FlyoutContent }) => {
    const [open, setOpen] = useState(false);
    const showFlyout = open && FlyoutContent;

    return (
        <div onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            className="relative h-fit w-fit">
            <Link to={href} className="relative">
                {children}
                <span className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left rounded-full  bg-indigo-300 dark:bg-green-200 transition-transform duration-300 ease-out"
                    style={{
                        transform: showFlyout ? "scaleX(1)" : "scaleX(0)"
                    }}
                />
            </Link>
            <AnimatePresence>
                {showFlyout &&
                    <m.div className="absolute left-1/2  mt-5"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        style={{ translateX: '-50%' }}>
                        {/* invisible component to not to loose mouse in the space between content and profile link */}
                        <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
                        {/* triangle thingy */}
                        <div className="absolute border border-b-0 border-r-0 border-zinc-500 dark:border-gray-300 left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white dark:bg-slate-800" />
                        <FlyoutContent />
                    </m.div>
                }
            </AnimatePresence>
        </div>
    );
};

const userContent = () => {
    const { user } = useContext(AuthContext);

    const { logoutUser } = useContext(AuthContext);
    return (
        <div className="h-28 w-40 p-4 text-lg  bg-white border border-zinc-500 dark:border-gray-300 dark:text-slate-300 dark:bg-slate-800 shadow-xl rounded-md
        flex flex-col items-center justify-center">
            <h5 className="font-semibold border-b mb-2">{`${user.name[0].toUpperCase()}${user.name.slice(1)}`}</h5>
            <Link to={'/profile'} className="hover:border-b hover:text-xl">Profile</Link>
            <Link onClick={logoutUser} className="hover:border-b hover:text-xl">Log out</Link>
        </div>
    );
};

export default UserMenu;
