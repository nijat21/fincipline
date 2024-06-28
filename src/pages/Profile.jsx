import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { deleteUser } from "../API/auth.api";
import { Pencil } from 'lucide-react';
import EditPassword from "@/components/EditPassword";
import EditUserDetails from "@/components/EditUserDetails";

function Profile() {
    const navigate = useNavigate();
    const { user, profilePhoto, logoutUser } = useContext(AuthContext);
    const [imgUrl, setImgUrl] = useState(user.imgUrl);
    const [name, setName] = useState(user.name);
    const [showPasswordEdit, setShowPasswordEdit] = useState(false);
    const [showDetailsEdit, setShowDetailsEdit] = useState(false);


    // Handle delete
    const handleDelete = async () => {
        try {
            const user_id = user._id;
            await deleteUser(user_id);
            logoutUser();
            navigate('/');
            console.log("User successfully deleted");
        } catch (error) {
            console.log('Error deleting the user', error);
        }
    };

    // Display new name in Profile
    const handleUserDetailsUpdate = (updatedName) => {
        setName(updatedName);
    };


    useEffect(() => {
        if (profilePhoto) {
            setImgUrl(profilePhoto);
        }
    }, [profilePhoto]);


    return (
        <div className="flex flex-col h-screen items-center justify-center">
            <div className="flex items-center justify-center w-80 md:w-1/2 px-8 py-10 rounded-md shadow-2xl bg-blue-800
            border border-zinc-300 dark:border-slate-800">
                <div className="flex flex-col items-center justify-center text-lg w-full">
                    <div className="max-w-40  flex flex-col items-center justify-center border rounded-sm hover:bg-slate-600 cursor-pointer"
                        onClick={() => { navigate('/profile/upload'); }}>
                        {imgUrl ?
                            <div className="relative flex justify-center items-end group">
                                <img src={imgUrl} alt="" className='' />
                                <p className="absolute w-full text-lg text-center place-content-center py-2 bg-black bg-opacity-80 hidden group-hover:inline-block">
                                    Upload a new photo
                                </p>
                            </div>
                            :
                            <div className="p-4">
                                <i className="fa-regular fa-user fa-2xl p-10"></i>
                                <p className="text-md">Upload a photo</p>
                            </div>
                        }
                    </div>

                    <h1 className="font-medium text-xl h-16 flex items-center ">{`${name[0].toUpperCase()}${user && name.slice(1)}`}</h1>
                    <button className="w-full p-2 m-2 border rounded-sm border-black dark:border-slate-300 hover:bg-neutral-700 hover:text-white
                    dark:hover:bg-white dark:hover:text-black  hover:border-transparent cursor-pointer"
                        onClick={() => setShowDetailsEdit(true)}>
                        Name & email</button>
                    {/* Add some edit icon to make obvious */}
                    <button className="w-full p-2 m-2 border border-black dark:border-slate-300 hover:bg-neutral-700 hover:text-white
                    dark:hover:bg-white dark:hover:text-black  hover:border-transparent cursor-pointer"
                        onClick={() => setShowPasswordEdit(true)}>
                        Update password</button>
                    <button className="w-full p-2 m-2 border border-black bg-neutral-500 text-white dark:border-slate-300 hover:bg-neutral-700 hover:text-white
                    dark:hover:bg-white dark:hover:text-black  hover:border-transparent cursor-pointer"
                        onClick={handleDelete}>Delete account</button>
                </div>
                {showPasswordEdit &&
                    <EditPassword onClose={() => setShowPasswordEdit(false)} />
                }
                {showDetailsEdit &&
                    <EditUserDetails onClose={() => setShowDetailsEdit(false)} onUpdate={handleUserDetailsUpdate} />
                }
            </div>
        </div>
    );
}

export default Profile;
