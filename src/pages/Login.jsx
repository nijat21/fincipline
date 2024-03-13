import { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../API/auth.api";
import { AuthContext } from "../context/auth.context";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { storeToken, authenticateUser } = useContext(AuthContext);
    const uRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { email, password };

        try {
            const response = await login(user);
            storeToken(response.data.authToken);
            authenticateUser();
            navigate('/');
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
            <div className="flex flex-col h-3/5 items-center justify-center text-xl text-white rounded-md bg-black opacity-50 p-6">
                <h1 className="font-medium text-3xl h-16">Log in</h1>

                <form onSubmit={handleSubmit} className="min-w-1/5">
                    <div className=" flex flex-col">

                        <label htmlFor="" className="py-2">Email</label>
                        <input type="email" name="email" value={email} onChange={({ target }) => setEmail(target.value)}
                            className="p-1 mb-1 rounded-sm" ref={uRef}
                        />

                        <label htmlFor="" className="py-2">Password</label>
                        <input type="password" name="password" value={password} onChange={({ target }) => setPassword(target.value)}
                            className="p-1 mb-1"
                        />
                    </div>
                    <div className="h-20 mt-2 flex justify-center items-center">
                        <button type="submit" className="min-w-20 p-2 border border-black bg-neutral-200 text-black hover:bg-neutral-700 hover:text-white hover:border-transparent">Log in</button>
                    </div>
                </form>

                {error && (<p>{error}</p>)}

                <Link to={'/signup'} >You don't have an account? <p className='text-blue-400 hover:text-blue-600 inline'>Sign up</p></Link>
            </div>
        </div>

    );
}

export default Login;
