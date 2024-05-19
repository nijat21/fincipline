import { useState, useContext, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { login } from "../API/auth.api";
import { AuthContext } from "../context/auth.context";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { storeToken, authenticateUser } = useContext(AuthContext);
    const uRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { email, password };

        try {
            const response = await login(user);
            storeToken(response.data.authToken);
            authenticateUser();
        } catch (error) {
            console.log('Error logging in', error);
            setError(error.response.data.message);
        }
    };

    useEffect(() => {
        uRef.current.focus();
    }, []);

    return (
        <div className=" h-screen flex justify-center items-center">
            <div className="flex flex-col items-center justify-center text-xl px-8 py-10 rounded-md shadow-2xl max-w-1/3 dark:bg-gradient-to-r dark:from-indigo-500 dark:via-purple-500 dark:to-pink-500 ">
                <h1 className="font-medium text-3xl h-16">Log in</h1>
                <form onSubmit={handleSubmit} className="min-w-1/5">
                    <div className=" flex flex-col">
                        <label htmlFor="" className="py-2">Email</label>
                        <input type="email" name="email" value={email} onChange={({ target }) => setEmail(target.value)}
                            className="p-1 mb-1 rounded-sm text-black bg-black bg-opacity-10 dark:bg-white" ref={uRef}
                        />

                        <label htmlFor="" className="py-2">Password</label>
                        <input type="password" name="password" value={password} onChange={({ target }) => setPassword(target.value)}
                            className="p-1 mb-1 rounded-sm text-black bg-black bg-opacity-10 dark:bg-white"
                        />
                    </div>
                    <div className="h-20 mt-2 flex justify-center items-center">
                        <button type="submit" className="min-w-20 p-2 border border-black dark:border-slate-300 hover:bg-neutral-700 hover:text-white
                         dark:hover:bg-white dark:hover:text-black  hover:border-transparent">Log in</button>
                    </div>
                </form>

                {error && (<p className="opacity-60 text-center py-2">{error}</p>)}

                <Link to={'/signup'}>Don't have an account? <p className='text-blue-400 hover:text-blue-600 inline'>Sign up</p></Link>
            </div>
        </div>

    );
}

export default Login;
