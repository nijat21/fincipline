import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { uploadImg, updateImg } from "../API/auth.api";
import { motion as m, AnimatePresence } from 'framer-motion';


function Upload() {
    const { user, setProfilePhoto } = useContext(AuthContext);
    const [image, setImage] = useState();
    const navigate = useNavigate();

    const handleImage = ({ target }) => {
        setImage(target.files[0]);
    };

    // Update user's image
    const updateUserImg = async (input) => {
        if (input) {
            try {
                const reqBody = { user_id: user._id, imgUrl: input };
                await updateImg(reqBody);
            } catch (error) {
                console.log('Error updating the image', error);
            }
        }
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
                const response = await uploadImg(uploadData);
                updateUserImg(response.data.imgUrl);
                setProfilePhoto(response.data.imgUrl);
                console.log('Photo is updated successfully');
            }
            navigate('/profile');
        } catch (error) {
            console.log("Error uploading the image", error);
        }
    };




    return (
        <AnimatePresence>
            <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
                className="flex flex-col h-screen items-center justify-center">
                <div className="flex flex-col items-center justify-center text-xl px-8 py-10 rounded-lg shadow-2xl box-border
            bg-slate-400 dark:bg-blue-800 max-w-80 md:max-w-full">

                    <h3 className="py-2 text-center">Upload your profile photo</h3>
                    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full">
                        <div className="flex justify-center items-center py-10 w-full">
                            <label htmlFor="image"></label>
                            <input type="file" onChange={handleImage} id="image" className="max-w-xs md:max-w-full" />
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" className="py-[3px] px-2 my-2 border rounded-md border-black dark:border-slate-300 hover:bg-neutral-700 hover:text-white
                            dark:hover:bg-white dark:hover:text-black  hover:border-transparent cursor-pointer">
                                Save
                            </button>
                        </div>
                    </form>

                </div>
            </m.div>
        </AnimatePresence>
    );
}

export default Upload;
