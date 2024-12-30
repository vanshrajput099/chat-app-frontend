import React, { useState } from 'react'
import { accentColor, border, inputBG, primaryText, secText } from '../constants';
import { ToastContainer, toast } from 'react-toastify';
import { changeAvatar, changeUsername } from '../api/user';
import { useDispatch, useSelector } from "react-redux";
import { changeIsUpdatingProfile, setAvatar, setUsername } from '../redux/features/user';
import { Rings } from 'react-loader-spinner';

const EditProfile = ({ setEditProfile }) => {

    const [avatarInput, setAvatarInput] = useState(null);
    const [usernameInput, setUsernameInput] = useState("");
    const store = useSelector(store => store.user);
    const dispatch = useDispatch();

    const handleSaveChanges = async () => {
        try {
            if (!avatarInput && usernameInput.length === 0) {
                toast.error("Atleast Avatar Or Username Is Required");
                return;
            }

            toast.info("Updating Profile..");
            dispatch(changeIsUpdatingProfile(true));

            if (usernameInput.length > 0) {
                const res = await changeUsername(usernameInput);
                if (res.status < 400) {
                    toast.success(res.data.message);
                    dispatch(setUsername(res.data.data));
                } else {
                    toast.error(res.response.data.message);
                }
            }

            if (avatarInput) {
                const data = new FormData();
                data.append("avatar", avatarInput);
                const res = await changeAvatar(data);
                if (res.status < 400) {
                    toast.success(res.data.message);
                    dispatch(setAvatar(res.data.data));
                } else {
                    toast.error(res.response.data.message);
                }
            }

            dispatch(changeIsUpdatingProfile(false));
            setEditProfile(false);

        } catch (error) {
            console.error("Error in handleSaveChanges:", error);
        }
    }


    const handleFileChange = (e) => {
        const file = (e.target.files[0])
        if (file) {
            setAvatarInput(file);
        }
    }

    if (store.isUpdatingProfile) {
        return (
            <div className='w-full items-center justify-center flex'>
                <Rings
                    visible={true}
                    height="100"
                    width="100"
                    color="#4fa94d"
                    ariaLabel="rings-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
                <h1 style={{ color: secText }}>Updating Profile..</h1>
                <ToastContainer />
            </div>
        )
    }

    return (
        <div className='mt-5 w-2/5 flex flex-col gap-3'>
            <div className='flex flex-col gap-1'>
                <label style={{ color: primaryText }} htmlFor="">Username</label>
                <input className='px-2 py-1' placeholder='Enter your new username..' onChange={(e) => setUsernameInput(e.target.value)} type="text" style={{ color: primaryText, backgroundColor: inputBG, border: `1px solid ${border}` }} />
            </div>
            <div className='flex flex-col gap-1'>
                <label style={{ color: primaryText }} htmlFor="">Avatar</label>
                <input onChange={handleFileChange} type="file" />
            </div>
            <button onClick={handleSaveChanges} className='px-2 py-1 rounded-md' style={{ backgroundColor: accentColor }}>Save Changes</button>
            <ToastContainer />
        </div>
    )
}

export default EditProfile