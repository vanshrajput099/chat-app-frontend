import React, { useEffect, useState } from 'react'
import { getAllSideBarUsers } from '../api/messages'
import { useDispatch, useSelector } from 'react-redux';
import { changeCheckingSideUsers, setSideUsers } from '../redux/features/message';
import HomeSideBarUsers from './HomeSideBarUsers';
import { accentColor, border, buttonTextColor, primaryText, secBackgroundColor, secText } from '../constants';
import { Rings } from 'react-loader-spinner';

const HomeSideBar = () => {

    const dispatch = useDispatch();
    const store = useSelector(store => store.message);
    const [checkOnline, setCheckOnline] = useState(false);
    const [showOnlineUsers, setShowOnlineUsers] = useState(false);

    useEffect(() => {
        const getSideUsers = async () => {
            dispatch(changeCheckingSideUsers(true));
            const res = await getAllSideBarUsers();
            dispatch(setSideUsers(res.data.data));
            dispatch(changeCheckingSideUsers(false));
        }
        getSideUsers();
    }, [])

    if (store.isCheckingSideUsers) {
        return (
            <div className='w-1/5 h-full text-white' style={{ border: `1px solid ${border}` }}>
                <div style={{ backgroundColor: accentColor }}>
                    <h1 style={{ color: buttonTextColor }} className='py-2 ml-3 text-2xl font-bold'>Users</h1>
                    <div className='flex px-3 py-3' style={{ borderBottom: `2px solid ${border}` }}>
                        <input className='w-5' onChange={() => { setCheckOnline((oldValue) => !oldValue); setShowOnlineUsers((oldValue) => !oldValue) }} value={checkOnline} type="checkbox" name="" id="" />
                        <p className='ml-3 text-base' style={{ color: buttonTextColor }}>Online Users</p>
                    </div>
                </div>
                <div className='flex justify-between w-full'>
                    <Rings
                        visible={true}
                        height="100"
                        width="100"
                        color="#4fa94d"
                        ariaLabel="rings-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            </div>
        )
    }

    return (
        <div className='w-1/5 h-full text-white' style={{ border: `1px solid ${border}` }}>
            <div style={{ backgroundColor: secBackgroundColor }}>
                <h1 style={{ color: secText }} className='py-2 ml-3 text-2xl font-bold'>Users</h1>
                <div className='flex px-3 py-3' style={{ borderBottom: `2px solid ${border}` }}>
                    <input className='w-5' onChange={() => { setCheckOnline((oldValue) => !oldValue); setShowOnlineUsers((oldValue) => !oldValue) }} value={checkOnline} type="checkbox" name="" id="" />
                    <p className='ml-3 text-base' style={{ color: secText }}>Online Users</p>
                </div>
            </div>
            <div className='overflow-y-scroll custom-scrollbar'>
                {
                    store.sideUsers.map((ele, index) => {
                        return <HomeSideBarUsers data={ele} key={index} idx={index} showOnlineUsers={showOnlineUsers} />
                    })
                }
            </div>
        </div >
    )
}

export default HomeSideBar