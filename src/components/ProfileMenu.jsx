import { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion as m } from 'framer-motion';
import { AuthContext } from "../context/auth.context";
import { UserRound } from 'lucide-react';


function ProfileMenu() {
    const { user, logoutUser } = useContext(AuthContext);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [open, setOpen] = useState(false);
    const firstName = user.name.split(' ')[0];
    const menuRef = useRef(null);

    // Toggle menu
    const toggleMenu = () => {
        setOpen(!open);
    };

    // Profile photo
    useEffect(() => {
        if (user) {
            setProfilePhoto(user.imgUrl);
        } else setProfilePhoto(null);
    }, [user]);

    // Close menu in outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    return (
        <div className="relative" ref={menuRef}>
            <div onClick={() => toggleMenu()}
                className="relative h-fit w-fit">
                <Link className="relative">
                    {profilePhoto ?
                        <div className="h-10 max-w-10">
                            <img src={profilePhoto} alt="" className="rounded-lg h-full w-full" />
                        </div>
                        :
                        <UserRound size={'32'} />
                    }

                    <span className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left rounded-full  bg-indigo-300 dark:bg-green-200 transition-transform duration-300 ease-out"
                        style={{
                            transform: open ? "scaleX(1)" : "scaleX(0)"
                        }}
                    />
                </Link>
                <AnimatePresence>
                    {open &&
                        <m.div className="relative md:absolute md:left-1/2 mt-5"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 15 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            style={{ translateX: '-50%' }}>

                            {/* invisible component to not to loose mouse in the space between content and profile link */}
                            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
                            {/* triangle thingy */}
                            <div className="md:absolute md:border md:border-b-0 md:border-r-0 md:border-zinc-300 md:dark:border-slate-800 md:left-1/2 
                            md:top-0 md:h-4 md:w-4 md:-translate-x-1/2 md:-translate-y-1/2 md:rotate-45 md:bg-white md:dark:bg-slate-900" />
                            {/* Content =>*/}
                            <div className="min-h-28 min-w-40 p-4 text-lg bg-white border border-zinc-300 dark:border-slate-800 dark:bg-slate-900 shadow-xl rounded-md
                            flex flex-col items-center justify-center">
                                <h5 className="font-semibold mb-2">{`${user && firstName[0].toUpperCase()}${user && firstName.slice(1)}`}</h5>
                                <Link to={'/profile'} className="hover:border-b hover:text-xl">Profile</Link>
                                <Link onClick={logoutUser} className="hover:border-b hover:text-xl">Log out</Link>
                            </div>
                        </m.div>
                    }
                </AnimatePresence>
            </div>
        </div>
    );
}

export default ProfileMenu;
