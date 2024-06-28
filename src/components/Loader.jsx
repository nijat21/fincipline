import HashLoader from "react-spinners/HashLoader";

function Loader() {
    return (
        <div className="h-1/3 w-screen flex justify-center items-center">
            <HashLoader size={60} />
        </div>
    );
}

export default Loader;
