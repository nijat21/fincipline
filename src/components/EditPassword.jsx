import { useState, useRef, useContext } from "react";
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { updatePassword } from "@/API/auth.api";
import { AuthContext } from "@/context/auth.context";

function EditPassword({ onClose }) {
    const passwordEdit = useRef();
    const { user } = useContext(AuthContext);
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [error, setError] = useState('');

    // If user clicks somewhere other than the Modal, close it
    const closeModal = (e) => {
        if (passwordEdit.current === e.target) {
            onClose();
        }
    };

    // Check if the new password matches the confirmation
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user) {
            const reqBody = { user_id: user._id, oldPassword, password };
            if (!oldPassword || !password || !confirmation) {
                setError('All fields must be filled!');
            } else if (password !== confirmation) {
                setError(`New passwords don't match!`);
                toast.error(`New passwords don't match!`);
            } else if (oldPassword === password) {
                setError('New password cannot be the same as the old one!');
                toast.error('New password cannot be the same as the old one!');
            } else {
                try {
                    await updatePassword(reqBody);
                    toast.success('Password updated successfully!');
                    setError('');
                    onClose();
                } catch (error) {
                    console.log('Error singing up', error);
                    // Error message comes from the backend when we do the "res.json({message:'adsgasg'})"
                    toast.error(error.response?.data?.message);
                    setError(error.response?.data?.message);
                }
            }
        }
    };


    return (
        <div ref={passwordEdit} onClick={closeModal} className="fixed inset-0 mt-[68px] bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-blue-800 rounded-xl w-3/4 h-3/4 flex flex-col items-center gap-4">
                <button onClick={onClose} className="place-self-end hover:cursor-pointer p-4"><X size={30} /></button>
                <form onSubmit={handleSubmit} className="h-full flex flex-col justify-center items-center">
                    {/* Old Password */}
                    <label htmlFor="oldPassword" className="py-2">Old Password</label>
                    <input type="password" id="oldPassword" value={oldPassword} onChange={({ target }) => setOldPassword(target.value)}
                        className="p-1 mb-1 rounded-sm text-black bg-black bg-opacity-10 dark:bg-white" />
                    {/* New Password */}
                    <label htmlFor="password" className="py-2">New Password</label>
                    <input type="password" id="password" value={password} onChange={({ target }) => setPassword(target.value)}
                        className="p-1 mb-1 rounded-sm text-black bg-black bg-opacity-10 dark:bg-white" />
                    {/* Confirmation */}
                    <label htmlFor="confirmation" className="py-2">Confirm Password</label>
                    <input type="password" id="confirmation" value={confirmation} onChange={({ target }) => setConfirmation(target.value)}
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

export default EditPassword;
