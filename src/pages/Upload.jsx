import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { upload, updateImg } from "../API/user.api";

function Upload() {
    const { user, profilePhoto, setProfilePhoto } = useContext(AuthContext);
    const [image, setImage] = useState();
    const navigate = useNavigate();

    const handleImage = ({ target }) => {
        setImage(target.files[0]);
    };

    // Upload image to Cloudinary
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (image) {
                // create a form type (multipart-formdata) that can handle images
                const uploadData = new FormData();
                // Attach image to this new form
                uploadData.append('file', image);
                // Request to endpoint
                const response = await upload(uploadData);
                updateUserImg(response.data.imgUrl);
                console.log('Photo is updated successfully');
            }
            navigate('/profile');
        } catch (error) {
            console.log("Error uploading the image", error);
        }
    };

    // Update user's image
    const updateUserImg = async () => {
        if (profilePhoto) {
            try {
                const reqBody = { user_id: user._id, imgUrl: profilePhoto };
                await updateImg(reqBody);
            } catch (error) {
                console.log('Error updating the image', error);
            }
        }
    };


    return (
        <div className="flex flex-col h-screen items-center justify-center">
            <div className="flex flex-col items-center justify-center text-xl px-8 py-10 rounded-md shadow-2xl">

                <h3 className="text-2xl h-16">Upload your profile photo</h3>
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <div className="flex justify-center p-6">
                        <label htmlFor="image"></label>
                        <input type="file" onChange={handleImage} className="" />
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="min-w-44 p-2 m-2 border rounded-sm border-black dark:border-slate-300 hover:bg-neutral-700 hover:text-white
                        dark:hover:bg-white dark:hover:text-black  hover:border-transparent cursor-pointer">Save</button>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default Upload;
