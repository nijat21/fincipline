import { Link } from "react-router-dom";
import { useState } from "react";

function LinkLayout({ children, href }) {
    const [open, setOpen] = useState(false);

    return (
        <div onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            className="relative h-fit w-fit">
            <Link to={href} className="relative">
                {children}
                <span className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left rounded-full  bg-indigo-300 dark:bg-green-200 transition-transform duration-200 ease-out"
                    style={{
                        transform: open ? "scaleX(1)" : "scaleX(0)"
                    }}
                />
            </Link>
        </div>
    );
};

export default LinkLayout;
