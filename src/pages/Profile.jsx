import React, { useState } from 'react'
import { border, lightText, primaryText, secText } from '../constants'
import { RxAvatar } from "react-icons/rx";
import { useSelector } from 'react-redux';
import { FaRegEdit } from "react-icons/fa";
import EditProfile from '../components/EditProfile';
import { IoMdArrowRoundBack } from "react-icons/io";

const Profile = () => {

  const store = useSelector(store => store.user);
  const [editProfile, setEditProfile] = useState(false);

  return (
    <div className='w-full p-4 flex justify-center'>
      <div className='p-7 w-1/2 rounded-lg' style={{ border: `1px solid ${border}` }}>
        <div className='flex w-full justify-between'>
          {
            editProfile ? <h1 className='flex gap-2 font-bold items-center text-2xl' style={{ color: primaryText }}><FaRegEdit className='text-white' /> Edit Your Profile</h1>
              :
              <h1 className='text-2xl font-bold flex items-center gap-2' style={{ color: primaryText }}><RxAvatar className='text-white text-3xl' /> Profile</h1>
          }
          {
            editProfile ?
              <h1 onClick={() => setEditProfile((oldValue) => !oldValue)} className='flex gap-2 items-center px-2 py-1 rounded-lg hover:cursor-pointer' style={{ color: primaryText, border: `1px solid ${border}` }}><IoMdArrowRoundBack className='text-white' /></h1>
              :
              <h1 onClick={() => setEditProfile((oldValue) => !oldValue)} className='flex gap-2 items-center px-2 py-1 rounded-lg hover:cursor-pointer' style={{ color: primaryText, border: `1px solid ${border}` }}><FaRegEdit className='text-white' /> Edit Profile</h1>
          }
        </div>
        <div className='mt-5'>
          {
            editProfile ? <EditProfile setEditProfile={setEditProfile} /> :
              <>
                <div className='p-3'>
                  <img className='w-20 h-20 rounded-full' src={store.authUser?.avatar.split("-")[0]} alt="" />
                </div>
                <h2 style={{ color: primaryText }}>Username : <span style={{ color: lightText }}>{store.authUser.username}</span></h2>
                <h2 style={{ color: primaryText }}>Email Address : <span style={{ color: lightText }}>{store.authUser.email}</span></h2>
              </>
          }
        </div>
      </div>
    </div>
  )
}

export default Profile