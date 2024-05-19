import { useState, useRef, useContext } from "react";
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { updateUserDetails } from "@/API/auth.api";
import { AuthContext } from "@/context/auth.context";

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


    return (
        <div ref={userDetailsEdit} onClick={closeModal} className="fixed inset-0 mt-[68px] bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-blue-800 rounded-xl w-3/4 h-3/4 flex flex-col items-center gap-4">
                <button onClick={onClose} className="place-self-end hover:cursor-pointer p-4"><X size={30} /></button>
                <form onSubmit={handleSubmit} className="h-full flex flex-col justify-center items-center">
                    {/* Name */}
                    <label htmlFor="name" className="py-2">Name</label>
                    <input type="text" id="name" value={name} placeholder={user.name} onChange={({ target }) => setName(target.value)}
                        className="p-1 mb-1 rounded-sm text-black bg-black bg-opacity-10 dark:bg-white" />
                    {/* Email */}
                    <label htmlFor="email" className="py-2">Email</label>
                    <input type="text" id="email" value={email} placeholder={user.email} onChange={({ target }) => setEmail(target.value)}
                        className="p-1 mb-1 rounded-sm text-black bg-black bg-opacity-10 dark:bg-white" />

                    {/* Submit changes */}
                    <button type="submit" className="py-2 px-4 m-2 border border-black bg-neutral-500 text-white dark:border-slate-300 hover:bg-neutral-700 hover:text-white
                    dark:hover:bg-white dark:hover:text-black  hover:border-transparent cursor-pointer">
                        Save
                    </button>

                    {/* Error message in case of an error */}
                    {error && (<p className="opacity-60 text-center py-2">{error}</p>)}
                </form>
            </div>
        </div>
    );
}

export default EditUserDetails;
