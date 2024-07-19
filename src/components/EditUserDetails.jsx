import { useState, useRef, useContext, useEffect } from "react";
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { updateUserDetails } from "@/API/auth.api";
import { AuthContext } from "@/context/auth.context";
import { motion as m, AnimatePresence } from 'framer-motion';

function EditUserDetails({ onClose, onUpdate }) {
    const userDetailsEdit = useRef();
    const { user } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    // If user clicks somewhere other than the Modal, close it
    const closeModal = (e) => {
        if (userDetailsEdit.current === e.target) {
            onClose();
        }
    };

    // Check if the new password matches the confirmation
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user) {
            const reqBody = { user_id: user._id, name, email };
            if (!name && !email) {
                setError('At least one of the fields must be filled!');
            } else {
                try {
                    await updateUserDetails(reqBody);
                    toast.success('User details updated successfully!');
                    onUpdate(name);
                    setError('');
                    onClose();
                } catch (error) {
                    console.log('Error updating user details!', error);
                    // Error message comes from the backend when we do the "res.json({message:'adsgasg'})"
                    toast.error(error.response?.data?.message);
                    setError(error.response?.data?.message);
                }
            }
        }
    };

    // When opened block scrolling
    useEffect(() => {
        // Add the no-scroll class to body when the modal is opened
        document.body.classList.add('no-scroll');

        // Remove the no-scroll class from body when the modal is closed
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, []);


    return (
        <AnimatePresence>
            <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
                ref={userDetailsEdit}
                onClick={closeModal}
                className="fixed inset-0 mt-[68px] bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
                <div className="bg-slate-400 dark:bg-blue-800 rounded-xl w-3/4 h-3/4 flex flex-col items-center gap-4">
                    <button onClick={onClose} className="place-self-end hover:cursor-pointer p-4"><X size={30} /></button>
                    <form onSubmit={handleSubmit} className="h-full flex flex-col justify-center items-center">
                        {/* Name */}
                        <label htmlFor="name" className="py-2">Name</label>
                        <input type="text" id="name" value={name} placeholder={user.name} onChange={({ target }) => setName(target.value)}
                            className="p-1 mb-1 rounded-sm text-black dark:text-white bg-white bg-opacity-10" />
                        {/* Email */}
                        <label htmlFor="email" className="py-2">Email</label>
                        <input type="text" id="email" value={email} placeholder={user.email} onChange={({ target }) => setEmail(target.value)}
                            className="p-1 mb-1 rounded-sm text-black dark:text-white bg-white bg-opacity-10" />

                        {/* Submit changes */}
                        <button type="submit" className="py-[3px] px-2 my-10 mx-1 border rounded-md border-black dark:border-slate-300 hover:bg-neutral-700 hover:text-white
                        dark:hover:bg-white dark:hover:text-black  hover:border-transparent cursor-pointer">
                            Save
                        </button>

                        {/* Error message in case of an error */}
                        {error && (<p className="opacity-60 text-center py-2">{error}</p>)}
                    </form>
                </div>
            </m.div>
        </AnimatePresence>
    );
}

export default EditUserDetails;
