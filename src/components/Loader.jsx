import HashLoader from "react-spinners/HashLoader";
import { useContext } from "react";
import { ThemeContext } from "@/context/theme.context";

function Loader() {
    const { spinnerColor } = useContext(ThemeContext);
    return (
        <div className="h-[100%] md:h-1/4 w-screen flex justify-center items-center">
            <HashLoader color={spinnerColor} size={60} />
        </div>
    );
}

export default Loader;
