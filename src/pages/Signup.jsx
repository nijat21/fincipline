import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import { signup } from '../API/auth.api.js';


function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const uRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { email, password, name };
        if (!email || !password || !name) {
            setError('All fields must be filled!');
        } else {
            try {
                await signup(user);
                toast.success('You have successfully created your profile!');
                navigate('/login');
            } catch (error) {
                console.log('Error singing up', error);
                // Error message comes from the backend when we do the "res.json({message:'adsgasg'})"
                setError(error.response.data.message);
            }
        }
    };

    useEffect(() => {
        uRef.current.focus();
    }, []);

    return (
        <div className="flex flex-col h-screen items-center justify-center">
            <div className="flex flex-col items-center justify-center text-xl px-8 py-10 max-w-1/3 rounded-md shadow-2xl">
                <h1 className="font-medium text-3xl h-16">Sign up</h1>
                <form onSubmit={handleSubmit} className="min-w-1/5">
                    <div className=" flex flex-col">
                        <label htmlFor="" className="py-2">Name</label>
                        <input type="text" name="name" value={name} onChange={({ target }) => setName(target.value)}
                            className="p-1 mb-1 rounded-sm text-black bg-black bg-opacity-10 dark:bg-white" ref={uRef}
                        />

                        <label htmlFor="" className="py-2">Email</label>
                        <input type="email" name="email" value={email} onChange={({ target }) => setEmail(target.value)}
                            className="p-1 mb-1 rounded-sm text-black bg-black bg-opacity-10 dark:bg-white"
                        />

                        <label htmlFor="" className="py-2">Password</label>
                        <input type="password" name="password" value={password} onChange={({ target }) => setPassword(target.value)}
                            className="p-1 mb-1 rounded-sm text-black bg-black bg-opacity-10 dark:bg-white"
                        />
                    </div>
                    <div className="h-20 mt-2 flex justify-center items-center">
                        <button type="submit" className="min-w-20 p-2 border border-black dark:border-slate-300 hover:bg-neutral-700 hover:text-white
                         dark:hover:bg-white dark:hover:text-black  hover:border-transparent">Sign up</button>
                    </div>
                </form>
                {error && (<p className="opacity-60 text-center py-2">{error}</p>)}

                <Link to={'/login'} >Already have an account? <p className='text-blue-400 hover:text-blue-600 inline'>Log in</p></Link>
            </div>
        </div>
    );
}

export default Signup;
