import HashLoader from "react-spinners/HashLoader";
import { useContext } from "react";
import { ThemeContext } from "@/context/theme.context";

function Loader() {
    const { spinnerColor } = useContext(ThemeContext);
    return (
        <div className="h-1/3 w-screen flex justify-center items-center">
            <HashLoader color={spinnerColor} size={60} />
        </div>
    );
}

export default Loader;
