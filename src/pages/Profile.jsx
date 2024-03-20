import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { deleteUser } from "../API/user.api";

function Profile() {
    const navigate = useNavigate();
    const { user, profilePhoto, logoutUser } = useContext(AuthContext);

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


    return (
        <div className="flex flex-col h-screen items-center justify-center">
            <div className="flex flex-col items-center justify-center text-xl px-8 py-10 rounded-md shadow-2xl">
                <div className="p-4 min-w-44 flex flex-col items-center justify-center border rounded-sm hover:bg-slate-600 cursor-pointer"
                    onClick={() => { navigate('/profile/upload'); }}>
                    {profilePhoto ?
                        <img src={profilePhoto} alt="" className="grayscale w-40" />
                        :
                        <>
                            <i className="fa-regular fa-user fa-2xl p-10"></i>
                            <p className="text-md">Upload a photo</p>
                        </>
                    }
                </div>

                <h1 className="font-medium text-3xl h-16 flex items-center ">{user.name.toUpperCase()}</h1>
                <button type="submit" className="min-w-44 p-2 m-2 border rounded-sm border-black dark:border-slate-300 hover:bg-neutral-700 hover:text-white
                dark:hover:bg-white dark:hover:text-black  hover:border-transparent cursor-pointer">Change name</button>
                <button type="submit" className="min-w-44 p-2 m-2 border border-black dark:border-slate-300 hover:bg-neutral-700 hover:text-white
                dark:hover:bg-white dark:hover:text-black  hover:border-transparent cursor-pointer">Change password</button>
                <button type="submit" className="min-w-44 p-2 m-2 border border-black bg-neutral-500 text-white dark:border-slate-300 hover:bg-neutral-700 hover:text-white
                dark:hover:bg-white dark:hover:text-black  hover:border-transparent cursor-pointer"
                    onClick={handleDelete}>Delete account</button>
            </div>
        </div>
    );
}

export default Profile;
