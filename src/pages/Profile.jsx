import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { deleteUser } from "../API/auth.api";
import { Pencil } from 'lucide-react';
import EditPassword from "@/components/EditPassword";

function Profile() {
    const navigate = useNavigate();
    const { user, profilePhoto, logoutUser } = useContext(AuthContext);
    const [imgUrl, setImgUrl] = useState(user.imgUrl);
    const [name, setName] = useState(user.name);
    const [showPasswordEdit, setShowPasswordEdit] = useState(false);


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

    useEffect(() => {
        if (profilePhoto) {
            setImgUrl(profilePhoto);
        }
    }, [profilePhoto]);


    return (
        <div className="flex flex-col h-screen items-center justify-center">
            <div className="flex items-center justify-center w-1/4 px-8 py-10  rounded-md shadow-2xl">
                <div className="flex flex-col items-center justify-center text-xl w-full">
                    <div className="w-full flex flex-col items-center justify-center border rounded-sm hover:bg-slate-600 cursor-pointer"
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

                    <h1 className="font-medium text-xl h-16 flex items-center ">{user.name.toUpperCase()}</h1>
                    {/* <div className="relative group flex justify-center items-center w-full p-2 m-2 group border rounded-sm border-black dark:border-slate-300 cursor-pointer">
                        <input type="text" value={name.toUpperCase()} className="text-center bg-transparent" onChange={(e) => setName(e.target.value)} />
                        <div className="relative w-full flex justify-end">
                            <Pencil className="absolute h-8 w-14 mb-2 group-hover:bg-black group-hover:bg-opacity-80" />
                        </div>
                    </div> */}
                    <button className="w-full p-2 m-2 border rounded-sm border-black dark:border-slate-300 hover:bg-neutral-700 hover:text-white
                    dark:hover:bg-white dark:hover:text-black  hover:border-transparent cursor-pointer">
                        Change name</button>
                    <button className="w-full p-2 m-2 border border-black dark:border-slate-300 hover:bg-neutral-700 hover:text-white
                    dark:hover:bg-white dark:hover:text-black  hover:border-transparent cursor-pointer"
                        onClick={() => setShowPasswordEdit(true)}>
                        Change password</button>
                    <button className="w-full p-2 m-2 border border-black bg-neutral-500 text-white dark:border-slate-300 hover:bg-neutral-700 hover:text-white
                    dark:hover:bg-white dark:hover:text-black  hover:border-transparent cursor-pointer"
                        onClick={handleDelete}>Delete account</button>
                </div>
                {showPasswordEdit &&
                    <EditPassword onClose={() => setShowPasswordEdit(false)} />
                }
            </div>
        </div>
    );
}

export default Profile;
