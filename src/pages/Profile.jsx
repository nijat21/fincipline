import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { deleteUser } from "../API/auth.api";
import { Trash2 } from 'lucide-react';
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
            <div className="flex items-center justify-center w-80 md:w-1/2 px-8 py-10 rounded-lg shadow-2xl 
            bg-gradient-to-r from-slate-400 to-slate-300
            dark:from-indigo-700 dark:to-indigo-500">
                <div className="flex flex-col items-center justify-center text-lg w-full">
                    <div className={`max-w-40 md:max-w-52 flex flex-col items-center justify-center border cursor-pointer
                    ${imgUrl ? "border-transparent" : "border-black dark:border-slate-300 hover:border-transparent"} `}
                        onClick={() => { navigate('/profile/upload'); }}>
                        {imgUrl ?
                            <div className="relative text-slate-300 flex justify-center items-end group shadow-md rounded-md">
                                <img src={imgUrl} alt="" className='rounded-md' />
                                <p className="absolute w-full text-lg text-center place-content-center py-2 bg-black bg-opacity-80 hidden group-hover:inline-block">
                                    Upload a new photo
                                </p>
                            </div>
                            :
                            <div className="p-4 flex flex-col justify-center items-center hover:bg-slate-700 hover:text-slate-300  shadow-md rounded-md">
                                <i className="fa-regular fa-user fa-2xl p-10"></i>
                                <p className="text-sm">Upload a photo</p>
                            </div>
                        }
                    </div>

                    <h3 className="font-medium h-16 flex items-center ">{`${name[0].toUpperCase()}${user && name.slice(1)}`}</h3>
                    <div className="w-40 md:w-52  box-border flex flex-col items-center">
                        <p className="text-lg px-2 border-b border-black dark:border-slate-300">Update:</p>

                        <button className="w-full mt-2 rounded-sm hover:bg-slate-700 hover:text-white
                        font-semibold dark:hover:bg-white dark:hover:text-black cursor-pointer
                        border border-black dark:border-slate-300 hover:border-transparent"
                            onClick={() => setShowDetailsEdit(true)}>
                            Name & Email</button>
                        {/* Add some edit icon to make obvious */}
                        <button className="w-full mb-2 m-1 rounded-sm  hover:bg-slate-700 hover:text-white
                        font-semibold dark:hover:bg-white dark:hover:text-black cursor-pointer
                        border border-black dark:border-slate-300 hover:border-transparent"
                            onClick={() => setShowPasswordEdit(true)}>
                            Password</button>
                        <button className="w-full mt-4 dark:hover:text-slate-900 opacity-50 hover:opacity-100 flex justify-center text-lg"
                            onClick={handleDelete}>
                            <Trash2 className="pr-1" />
                            Delete account
                        </button>
                    </div>
                </div>
                {showPasswordEdit &&
                    <EditPassword onClose={() => setShowPasswordEdit(false)} />
                }
                {showDetailsEdit &&
                    <EditUserDetails onClose={() => setShowDetailsEdit(false)} onUpdate={handleUserDetailsUpdate} />
                }
            </div>
        </div >
    );
}

export default Profile;
