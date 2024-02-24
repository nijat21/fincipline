import { useState } from "react";

function Navbar() {
    let links = [
        { name: 'Home', link: '/' },
        { name: 'Services', link: '/services' },
        { name: 'About', link: '/about' },
        { name: 'Contact', link: '/contact' },
    ];

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="shadow-md w-full border-box fixed top-0 left-0 bg-neutral-100">
            <div className="md:px-10 py-4 px-7 bg-white md:flex justify-between items-center">
                {/* Logo and brand */}
                <div className="flex items-center text-2xl cursor-pointer gap-2">
                    {/* if logo, it goes here */}
                    <span className="font-bold">Fincipline</span>
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
                <ul className={`md:flex md:items-center md:pl-0 pl-9 md:pb-0 pb-12 absolute md:static bg-white 
                md:z-auto z-[-1] left-0 w-full md:w-auto transition-all duration-500 ease-out ${isOpen ? 'top-12' : 'top-[-490px]'}`}>
                    {
                        links.map(link => (
                            <li className="font-semibold my-7 md:my-0 md:ml-8">
                                <a href={link.link} className="hover:text-blue-500">{link.name}</a>
                            </li>
                        ))
                    }
                    <button className="btn bg-neutral-700 text-white py-1 px-3 md:ml-8 rounded md:static">Get Started</button>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
