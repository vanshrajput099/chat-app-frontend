import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveMessageUser, setMessageUser } from '../redux/features/message';
import { border, primaryText, secBackgroundColor, secText } from '../constants';
import { GoDotFill } from "react-icons/go";

const HomeSideBarUsers = ({ data, showOnlineUsers, idx }) => {

    const dispatch = useDispatch();
    const store = useSelector((store) => store.message);
    const onlineStatus = (store.onlineUsers.includes(data._id))
    const [isActiveMessageBox, setIsActiveMessageBox] = useState(store.messageUser ? parseInt(store.messageUser._id) == parseInt(data._id) : false);

    const changeChatUser = () => {
        dispatch(setMessageUser(data));
        setIsActiveMessageBox(true);
    }

    useEffect(() => {
        if (!store.messageUser) {
            setIsActiveMessageBox(false);
        } else {
            if (store.messageUser._id !== data._id) {
                setIsActiveMessageBox(false);
            }
        }
    }, [store.messageUser])

    if (showOnlineUsers && !onlineStatus) {
        return null
    };

    return (
        <div onClick={changeChatUser} style={{ borderBottom: `1px solid ${border}`, backgroundColor: isActiveMessageBox ? secBackgroundColor : '' }} className='hover:cursor-pointer p-3 flex gap-4 items-center'>
            <div className='flex items-center'>
                <img src={data.avatar.split("-")[0]} className='w-11 h-11 rounded-full' alt="" />
                {onlineStatus ? <GoDotFill className='text-green-600 text-3xl' /> : null}
            </div>
            <div className='' style={{ overflow: 'hidden' }}>
                <h1 style={{ color: primaryText, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} className='font-bold text-lg'>{data.username}</h1>
                <h2 style={{ color: secText, fontWeight: '200' }} className='text-sm'>{onlineStatus ? "Online" : "Offline"}</h2>
            </div>
        </div>
    )
}

export default HomeSideBarUsers